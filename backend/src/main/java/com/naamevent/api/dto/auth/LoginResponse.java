package com.naamevent.api.dto.auth;

public record LoginResponse(
        String token,
        String username
) {
}

