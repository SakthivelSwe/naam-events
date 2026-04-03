package com.naamevent.api.controller;

import com.naamevent.api.dto.ApiResponse;
import com.naamevent.api.dto.contact.ContactResponse;
import com.naamevent.api.service.ContactService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/contacts")
public class AdminContactController {

    private final ContactService contactService;

    public AdminContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactResponse>>> getContacts() {
        return ResponseEntity.ok(ApiResponse.success(contactService.getAll()));
    }
}

