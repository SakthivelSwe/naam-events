package com.naamevent.api.controller;

import com.naamevent.api.dto.ApiResponse;
import com.naamevent.api.dto.gallery.UploadResponse;
import com.naamevent.api.service.SupabaseStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class AdminUploadController {

    private final SupabaseStorageService supabaseStorageService;

    public AdminUploadController(SupabaseStorageService supabaseStorageService) {
        this.supabaseStorageService = supabaseStorageService;
    }

    @PostMapping("/api/admin/uploads")
    public ResponseEntity<ApiResponse<UploadResponse>> upload(@RequestParam("file") MultipartFile file) {
        UploadResponse uploadResponse = supabaseStorageService.upload(file);
        return ResponseEntity.ok(ApiResponse.success("Image uploaded", uploadResponse));
    }
}
