package com.naamevent.api.service;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class KeepAliveService {

    private static final Logger logger = LoggerFactory.getLogger(KeepAliveService.class);
    
    private final HttpClient httpClient;

    // RENDER_EXTERNAL_URL is automatically provided by Render for web services.
    @Value("${RENDER_EXTERNAL_URL:http://localhost:8080}")
    private String renderExternalUrl;

    public KeepAliveService(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    // Runs every 13 minutes (13 * 60 * 1000 = 780000 ms)
    @Scheduled(fixedRate = 780000)
    public void pingKeepAlive() {
        if ("http://localhost:8080".equals(renderExternalUrl)) {
            logger.info("KeepAliveService: Running locally, skipping ping.");
            return;
        }

        try {
            String url = renderExternalUrl + "/api/health";
            logger.info("KeepAliveService: Pinging {} to prevent sleep mode...", url);
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                logger.info("KeepAliveService: Successfully pinged application. Status: {}", response.statusCode());
            } else {
                logger.warn("KeepAliveService: Ping returned unexpected status code: {}", response.statusCode());
            }
        } catch (Exception e) {
            logger.error("KeepAliveService: Error occurred while pinging application", e);
        }
    }
}
