package com.naamevent.api.service;

import com.naamevent.api.config.AdminProperties;
import com.naamevent.api.dto.auth.LoginRequest;
import com.naamevent.api.dto.auth.LoginResponse;
import com.naamevent.api.exception.InvalidCredentialsException;
import com.naamevent.api.security.JwtService;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private final AdminProperties adminProperties;
    private final JwtService jwtService;

    public AdminAuthService(AdminProperties adminProperties, JwtService jwtService) {
        this.adminProperties = adminProperties;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        boolean valid = adminProperties.username().equals(request.username())
                && adminProperties.password().equals(request.password());

        if (!valid) {
            throw new InvalidCredentialsException("Invalid admin credentials");
        }

        return new LoginResponse(jwtService.generateToken(request.username()), request.username());
    }
}

