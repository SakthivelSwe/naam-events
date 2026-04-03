package com.naamevent.api.dto.contact;

import jakarta.validation.constraints.NotBlank;

public record ContactRequest(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Phone is required")
        String phone,
        @NotBlank(message = "Message is required")
        String message
) {
}

