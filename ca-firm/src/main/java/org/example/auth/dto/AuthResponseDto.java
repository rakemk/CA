package org.example.auth.dto;

public record AuthResponseDto(
        String token,
        String tokenType,
        long expiresAtEpochSeconds
) {
}
