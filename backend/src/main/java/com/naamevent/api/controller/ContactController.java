package com.naamevent.api.controller;

import com.naamevent.api.dto.ApiResponse;
import com.naamevent.api.dto.contact.ContactRequest;
import com.naamevent.api.dto.contact.ContactResponse;
import com.naamevent.api.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContactResponse>> createContact(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Contact request received", contactService.create(request)));
    }
}

