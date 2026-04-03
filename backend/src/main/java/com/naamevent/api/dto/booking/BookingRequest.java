package com.naamevent.api.dto.booking;

import com.naamevent.api.model.EventType;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record BookingRequest(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Phone is required")
        String phone,
        @NotNull(message = "Event type is required")
        EventType eventType,
        @NotNull(message = "Date is required")
        @FutureOrPresent(message = "Event date must be today or later")
        LocalDate date,
        @NotNull(message = "Guest count is required")
        @Min(value = 1, message = "Guest count must be at least 1")
        Integer guests,
        @NotBlank(message = "Message is required")
        String message
) {
}

