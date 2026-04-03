package com.naamevent.api.dto.gallery;

import com.naamevent.api.model.GalleryCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GalleryItemRequest(
        @NotBlank(message = "Image URL is required")
        String imageUrl,
        @NotNull(message = "Category is required")
        GalleryCategory category
) {
}

