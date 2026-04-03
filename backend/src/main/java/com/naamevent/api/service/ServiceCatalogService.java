package com.naamevent.api.service;

import com.naamevent.api.dto.service.ServiceRequest;
import com.naamevent.api.dto.service.ServiceResponse;
import com.naamevent.api.exception.ResourceNotFoundException;
import com.naamevent.api.model.ServiceEntity;
import com.naamevent.api.repository.ServiceRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ServiceCatalogService {

    private final ServiceRepository serviceRepository;

    public ServiceCatalogService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceResponse> getAll() {
        return serviceRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(this::toResponse)
                .toList();
    }

    public ServiceResponse create(ServiceRequest request) {
        ServiceEntity entity = new ServiceEntity();
        applyRequest(entity, request);
        return toResponse(serviceRepository.save(entity));
    }

    public ServiceResponse update(Long id, ServiceRequest request) {
        ServiceEntity entity = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
        applyRequest(entity, request);
        return toResponse(serviceRepository.save(entity));
    }

    public void delete(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Service not found");
        }
        serviceRepository.deleteById(id);
    }

    private void applyRequest(ServiceEntity entity, ServiceRequest request) {
        entity.setName(request.name());
        entity.setDescription(request.description());
        entity.setImageUrl(request.imageUrl());
    }

    private ServiceResponse toResponse(ServiceEntity entity) {
        return new ServiceResponse(entity.getId(), entity.getName(), entity.getDescription(), entity.getImageUrl());
    }
}

