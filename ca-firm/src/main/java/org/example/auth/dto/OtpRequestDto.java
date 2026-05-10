package org.example.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record OtpRequestDto(
        @NotBlank String identifier
) {
}
