package org.example.auth.dto;

import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonProperty;

public class OtpRequestDto {
    @NotBlank
    @JsonProperty("identifier")
    private String identifier;

    @JsonProperty("role")
    private String role;

    public OtpRequestDto() {}

    public OtpRequestDto(String identifier) {
        this.identifier = identifier;
        this.role = null;
    }

    public OtpRequestDto(String identifier, String role) {
        this.identifier = identifier;
        this.role = role;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
