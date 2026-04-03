package com.naamevent.api.dto.contact;

import java.time.LocalDateTime;

public record ContactResponse(
        Long id,
        String name,
        String phone,
        String message,
        LocalDateTime createdAt
) {
}

