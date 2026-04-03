package com.naamevent.api.dto.service;

import jakarta.validation.constraints.NotBlank;

public record ServiceRequest(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Description is required")
        String description,
        @NotBlank(message = "Image URL is required")
        String imageUrl
) {
}

