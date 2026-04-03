package com.naamevent.api.config;

import io.minio.MinioClient;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class AppConfig {

    @Bean
    public MinioClient minioClient(
            @Value("${minio.endpoint}") String endpoint,
            @Value("${minio.hostport:}") String hostport,
            @Value("${minio.secure:false}") boolean secure,
            @Value("${minio.access-key}") String accessKey,
            @Value("${minio.secret-key}") String secretKey
    ) {
        MinioClient.Builder builder = MinioClient.builder()
                .credentials(accessKey, secretKey);

        if (hostport != null && !hostport.isBlank()) {
            String[] parts = hostport.split(":");
            if (parts.length != 2) {
                throw new IllegalArgumentException("MINIO_HOSTPORT must be in host:port format");
            }
            builder.endpoint(parts[0], Integer.parseInt(parts[1]), secure);
        } else {
            builder.endpoint(endpoint);
        }

        return builder.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(@Value("${app.cors-origin}") String corsOrigin) {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(corsOrigin));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
