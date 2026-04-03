package com.naamevent.api.dto.gallery;

import com.naamevent.api.model.GalleryCategory;

public record GalleryItemResponse(
        Long id,
        String imageUrl,
        GalleryCategory category
) {
}

