package com.naamevent.api.controller;

import com.naamevent.api.dto.ApiResponse;
import com.naamevent.api.dto.service.ServiceRequest;
import com.naamevent.api.dto.service.ServiceResponse;
import com.naamevent.api.service.ServiceCatalogService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/services")
public class AdminServiceController {

    private final ServiceCatalogService serviceCatalogService;

    public AdminServiceController(ServiceCatalogService serviceCatalogService) {
        this.serviceCatalogService = serviceCatalogService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getServices() {
        return ResponseEntity.ok(ApiResponse.success(serviceCatalogService.getAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceResponse>> createService(@Valid @RequestBody ServiceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Service created", serviceCatalogService.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceResponse>> updateService(@PathVariable Long id, @Valid @RequestBody ServiceRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Service updated", serviceCatalogService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteService(@PathVariable Long id) {
        serviceCatalogService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Service deleted", null));
    }
}

