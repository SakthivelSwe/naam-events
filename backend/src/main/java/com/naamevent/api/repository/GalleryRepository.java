package com.naamevent.api.repository;

import com.naamevent.api.model.GalleryCategory;
import com.naamevent.api.model.GalleryImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<GalleryImage, Long> {
    List<GalleryImage> findByCategoryOrderByIdDesc(GalleryCategory category);
}

