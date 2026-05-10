package org.example.auth.model;

import java.time.Instant;

public class OtpEntry {
    private final String code;
    private final Instant expiresAt;
    private int failedAttempts;

    public OtpEntry(String code, Instant expiresAt) {
        this.code = code;
        this.expiresAt = expiresAt;
    }

    public String getCode() {
        return code;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public int getFailedAttempts() {
        return failedAttempts;
    }

    public void incrementFailedAttempts() {
        this.failedAttempts++;
    }
}
