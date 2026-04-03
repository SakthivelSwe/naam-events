package com.naamevent.api.service;

import com.naamevent.api.dto.booking.BookingRequest;
import com.naamevent.api.dto.booking.BookingResponse;
import com.naamevent.api.model.BookingEntity;
import com.naamevent.api.repository.BookingRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public BookingResponse create(BookingRequest request) {
        BookingEntity entity = new BookingEntity();
        entity.setName(request.name());
        entity.setPhone(request.phone());
        entity.setEventType(request.eventType());
        entity.setDate(request.date());
        entity.setGuests(request.guests());
        entity.setMessage(request.message());
        return toResponse(bookingRepository.save(entity));
    }

    public List<BookingResponse> getAll() {
        return bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .map(this::toResponse)
                .toList();
    }

    private BookingResponse toResponse(BookingEntity entity) {
        return new BookingResponse(
                entity.getId(),
                entity.getName(),
                entity.getPhone(),
                entity.getEventType(),
                entity.getDate(),
                entity.getGuests(),
                entity.getMessage(),
                entity.getCreatedAt()
        );
    }
}

