package org.example.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponseDto {
    @JsonProperty("token")
    private String token;

    @JsonProperty("tokenType")
    private String tokenType;

    @JsonProperty("expiresAtEpochSeconds")
    private long expiresAtEpochSeconds;

    @JsonProperty("role")
    private String role;

    public AuthResponseDto() {}

    public AuthResponseDto(String token, String tokenType, long expiresAtEpochSeconds, String role) {
        this.token = token;
        this.tokenType = tokenType;
        this.expiresAtEpochSeconds = expiresAtEpochSeconds;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public long getExpiresAtEpochSeconds() {
        return expiresAtEpochSeconds;
    }

    public void setExpiresAtEpochSeconds(long expiresAtEpochSeconds) {
        this.expiresAtEpochSeconds = expiresAtEpochSeconds;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
