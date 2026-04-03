package com.naamevent.api.controller;

import com.naamevent.api.dto.ApiResponse;
import com.naamevent.api.dto.gallery.UploadResponse;
import com.naamevent.api.service.MinioStorageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class AdminUploadController {

    private final MinioStorageService minioStorageService;

    public AdminUploadController(MinioStorageService minioStorageService) {
        this.minioStorageService = minioStorageService;
    }

    @PostMapping("/api/admin/uploads")
    public ResponseEntity<ApiResponse<UploadResponse>> upload(
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request
    ) {
        String objectName = minioStorageService.upload(file);
        String imageUrl = ServletUriComponentsBuilder.fromRequestUri(request)
                .replacePath("/api/uploads/" + objectName)
                .replaceQuery(null)
                .build()
                .toUriString();

        return ResponseEntity.ok(ApiResponse.success("Image uploaded", new UploadResponse(imageUrl, objectName)));
    }

    @GetMapping("/api/uploads/{objectName:.+}")
    public ResponseEntity<?> getImage(@PathVariable String objectName) {
        return minioStorageService.getFile(objectName);
    }
}
