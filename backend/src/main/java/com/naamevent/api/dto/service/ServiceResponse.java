package com.naamevent.api.dto.service;

public record ServiceResponse(
        Long id,
        String name,
        String description,
        String imageUrl
) {
}

