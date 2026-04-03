package com.naamevent.api.service;

import com.naamevent.api.dto.contact.ContactRequest;
import com.naamevent.api.dto.contact.ContactResponse;
import com.naamevent.api.model.ContactSubmission;
import com.naamevent.api.repository.ContactRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactResponse create(ContactRequest request) {
        ContactSubmission entity = new ContactSubmission();
        entity.setName(request.name());
        entity.setPhone(request.phone());
        entity.setMessage(request.message());
        return toResponse(contactRepository.save(entity));
    }

    public List<ContactResponse> getAll() {
        return contactRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .map(this::toResponse)
                .toList();
    }

    private ContactResponse toResponse(ContactSubmission entity) {
        return new ContactResponse(
                entity.getId(),
                entity.getName(),
                entity.getPhone(),
                entity.getMessage(),
                entity.getCreatedAt()
        );
    }
}

