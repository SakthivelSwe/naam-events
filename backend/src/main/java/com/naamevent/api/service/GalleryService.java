package com.naamevent.api.service;

import com.naamevent.api.dto.gallery.GalleryItemRequest;
import com.naamevent.api.dto.gallery.GalleryItemResponse;
import com.naamevent.api.exception.ResourceNotFoundException;
import com.naamevent.api.model.GalleryCategory;
import com.naamevent.api.model.GalleryImage;
import com.naamevent.api.repository.GalleryRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;

    public GalleryService(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    public List<GalleryItemResponse> getAll(String category) {
        List<GalleryImage> images;
        if (category == null || category.isBlank()) {
            images = galleryRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        } else {
            GalleryCategory galleryCategory = GalleryCategory.valueOf(category.trim().toUpperCase());
            images = galleryRepository.findByCategoryOrderByIdDesc(galleryCategory);
        }
        return images.stream().map(this::toResponse).toList();
    }

    public GalleryItemResponse create(GalleryItemRequest request) {
        GalleryImage image = new GalleryImage();
        applyRequest(image, request);
        return toResponse(galleryRepository.save(image));
    }

    public GalleryItemResponse update(Long id, GalleryItemRequest request) {
        GalleryImage image = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found"));
        applyRequest(image, request);
        return toResponse(galleryRepository.save(image));
    }

    public void delete(Long id) {
        if (!galleryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gallery item not found");
        }
        galleryRepository.deleteById(id);
    }

    private void applyRequest(GalleryImage image, GalleryItemRequest request) {
        image.setImageUrl(request.imageUrl());
        image.setCategory(request.category());
    }

    private GalleryItemResponse toResponse(GalleryImage image) {
        return new GalleryItemResponse(image.getId(), image.getImageUrl(), image.getCategory());
    }
}

