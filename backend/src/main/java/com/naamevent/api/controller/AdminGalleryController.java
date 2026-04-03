package com.naamevent.api.controller;

import com.naamevent.api.dto.ApiResponse;
import com.naamevent.api.dto.gallery.GalleryItemRequest;
import com.naamevent.api.dto.gallery.GalleryItemResponse;
import com.naamevent.api.service.GalleryService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/gallery")
public class AdminGalleryController {

    private final GalleryService galleryService;

    public AdminGalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GalleryItemResponse>>> getGallery() {
        return ResponseEntity.ok(ApiResponse.success(galleryService.getAll(null)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<GalleryItemResponse>> createGalleryItem(@Valid @RequestBody GalleryItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Gallery item created", galleryService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GalleryItemResponse>> updateGalleryItem(@PathVariable Long id, @Valid @RequestBody GalleryItemRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Gallery item updated", galleryService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteGalleryItem(@PathVariable Long id) {
        galleryService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Gallery item deleted", null));
    }
}

