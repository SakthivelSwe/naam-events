package com.naamevent.api.service;

import io.minio.BucketExistsArgs;
import io.minio.GetObjectArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.StatObjectArgs;
import io.minio.StatObjectResponse;
import io.minio.errors.MinioException;
import io.minio.GetObjectResponse;
import java.io.InputStream;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MinioStorageService {

    private final MinioClient minioClient;
    private final String bucketName;

    public MinioStorageService(
            MinioClient minioClient,
            @Value("${minio.bucket-name}") String bucketName
    ) {
        this.minioClient = minioClient;
        this.bucketName = bucketName;
    }

    public String upload(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Please select an image to upload");
        }

        String objectName = buildObjectName(file.getOriginalFilename());
        String contentType = file.getContentType() != null ? file.getContentType() : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        try (InputStream stream = file.getInputStream()) {
            ensureBucketExists();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .stream(stream, file.getSize(), -1)
                            .contentType(contentType)
                            .build()
            );
            return objectName;
        } catch (Exception exception) {
            throw new RuntimeException("Unable to upload image to MinIO", exception);
        }
    }

    public ResponseEntity<InputStreamResource> getFile(String objectName) {
        try {
            StatObjectResponse stat = minioClient.statObject(
                    StatObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build()
            );

            GetObjectResponse object = minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build()
            );

            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
            if (stat.contentType() != null && !stat.contentType().isBlank()) {
                mediaType = MediaType.parseMediaType(stat.contentType());
            }

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .contentLength(stat.size())
                    .header("Cache-Control", "public, max-age=31536000")
                    .header("Content-Disposition", ContentDisposition.inline().filename(objectName).build().toString())
                    .body(new InputStreamResource(object));
        } catch (MinioException exception) {
            throw new RuntimeException("Unable to fetch image from MinIO", exception);
        } catch (Exception exception) {
            throw new RuntimeException("Unable to fetch image from storage", exception);
        }
    }

    private void ensureBucketExists() throws Exception {
        boolean exists = minioClient.bucketExists(
                BucketExistsArgs.builder()
                        .bucket(bucketName)
                        .build()
        );

        if (!exists) {
            minioClient.makeBucket(
                    MakeBucketArgs.builder()
                            .bucket(bucketName)
                            .build()
            );
        }
    }

    private String buildObjectName(String originalFilename) {
        String cleaned = StringUtils.hasText(originalFilename) ? StringUtils.cleanPath(originalFilename) : "image.jpg";
        String extension = "";
        int lastDot = cleaned.lastIndexOf('.');
        if (lastDot >= 0) {
            extension = cleaned.substring(lastDot);
        }
        return UUID.randomUUID() + extension;
    }
}
