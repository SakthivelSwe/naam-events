package com.naamevent.api.service;

import com.naamevent.api.dto.gallery.UploadResponse;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SupabaseStorageService {

    private final HttpClient httpClient;
    private final String supabaseUrl;
    private final String serviceRoleKey;
    private final String bucketName;

    public SupabaseStorageService(
            HttpClient httpClient,
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.service-role-key}") String serviceRoleKey,
            @Value("${supabase.storage-bucket}") String bucketName
    ) {
        this.httpClient = httpClient;
        this.supabaseUrl = stripTrailingSlash(supabaseUrl);
        this.serviceRoleKey = serviceRoleKey;
        this.bucketName = bucketName;
    }

    public UploadResponse upload(MultipartFile file) {
        validate(file);

        String objectName = buildObjectName(file.getOriginalFilename());
        String contentType = file.getContentType() != null ? file.getContentType() : MediaType.APPLICATION_OCTET_STREAM_VALUE;

        try {
            HttpRequest request = HttpRequest.newBuilder(buildUploadUri(objectName))
                    .header("Authorization", "Bearer " + serviceRoleKey)
                    .header("apikey", serviceRoleKey)
                    .header("Content-Type", contentType)
                    .header("x-upsert", "true")
                    .POST(HttpRequest.BodyPublishers.ofByteArray(file.getBytes()))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new RuntimeException("Supabase Storage upload failed: " + response.body());
            }

            return new UploadResponse(buildPublicUrl(objectName), objectName);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Unable to upload image to Supabase Storage", exception);
        } catch (IOException exception) {
            throw new RuntimeException("Unable to upload image to Supabase Storage", exception);
        }
    }

    private void validate(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Please select an image to upload");
        }

        String contentType = file.getContentType();
        if (!StringUtils.hasText(contentType) || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image uploads are supported");
        }
    }

    private URI buildUploadUri(String objectName) {
        return UriComponentsBuilder.fromUriString(supabaseUrl)
                .pathSegment("storage", "v1", "object", bucketName, objectName)
                .build(true)
                .toUri();
    }

    private String buildPublicUrl(String objectName) {
        return UriComponentsBuilder.fromUriString(supabaseUrl)
                .pathSegment("storage", "v1", "object", "public", bucketName, objectName)
                .build(true)
                .toUriString();
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

    private String stripTrailingSlash(String value) {
        return value.endsWith("/") ? value.substring(0, value.length() - 1) : value;
    }
}
