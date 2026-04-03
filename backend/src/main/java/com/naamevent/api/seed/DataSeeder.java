package com.naamevent.api.seed;

import com.naamevent.api.model.GalleryCategory;
import com.naamevent.api.model.GalleryImage;
import com.naamevent.api.model.ServiceEntity;
import com.naamevent.api.repository.GalleryRepository;
import com.naamevent.api.repository.ServiceRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ServiceRepository serviceRepository;
    private final GalleryRepository galleryRepository;

    public DataSeeder(ServiceRepository serviceRepository, GalleryRepository galleryRepository) {
        this.serviceRepository = serviceRepository;
        this.galleryRepository = galleryRepository;
    }

    @Override
    public void run(String... args) {
        if (serviceRepository.count() == 0) {
            serviceRepository.saveAll(List.of(
                    service("Wedding Events", "Elegant wedding planning, decor coordination, guest management, and day-of execution for memorable celebrations.", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"),
                    service("Birthday Parties", "Thoughtful birthday event planning with themed styling, entertainment, catering coordination, and on-site support.", "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1200&q=80"),
                    service("Corporate Events", "Professional corporate event management for launches, conferences, awards nights, and executive gatherings.", "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"),
                    service("Catering", "Reliable catering coordination with curated menus, service staff management, and hospitality-focused execution.", "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80")
            ));
        }

        if (galleryRepository.count() == 0) {
            galleryRepository.saveAll(List.of(
                    gallery("https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80", GalleryCategory.WEDDING),
                    gallery("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80", GalleryCategory.WEDDING),
                    gallery("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80", GalleryCategory.BIRTHDAY),
                    gallery("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80", GalleryCategory.BIRTHDAY),
                    gallery("https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80", GalleryCategory.CORPORATE),
                    gallery("https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80", GalleryCategory.CORPORATE)
            ));
        }
    }

    private ServiceEntity service(String name, String description, String imageUrl) {
        ServiceEntity service = new ServiceEntity();
        service.setName(name);
        service.setDescription(description);
        service.setImageUrl(imageUrl);
        return service;
    }

    private GalleryImage gallery(String imageUrl, GalleryCategory category) {
        GalleryImage galleryImage = new GalleryImage();
        galleryImage.setImageUrl(imageUrl);
        galleryImage.setCategory(category);
        return galleryImage;
    }
}
