package com.naamevent.api.repository;

import com.naamevent.api.model.ContactSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactSubmission, Long> {
}

