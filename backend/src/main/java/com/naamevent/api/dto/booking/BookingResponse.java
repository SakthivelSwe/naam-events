package com.naamevent.api.dto.booking;

import com.naamevent.api.model.EventType;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingResponse(
        Long id,
        String name,
        String phone,
        EventType eventType,
        LocalDate date,
        Integer guests,
        String message,
        LocalDateTime createdAt
) {
}

