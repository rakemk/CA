package org.example.auth.service;

import org.example.auth.model.OtpEntry;
import org.example.config.AppProperties;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private final AppProperties appProperties;
    private final SecureRandom secureRandom = new SecureRandom();
    private final Map<String, OtpEntry> otpStore = new ConcurrentHashMap<>();

    public OtpService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public String issueOtp(String identifier) {
        String normalizedIdentifier = normalizeIdentifier(identifier);
        String otp = createNumericOtp(appProperties.getOtp().getLength());
        Instant expiresAt = Instant.now().plus(appProperties.getOtp().getExpirationMinutes(), ChronoUnit.MINUTES);
        otpStore.put(normalizedIdentifier, new OtpEntry(otp, expiresAt));
        return otp;
    }

    public boolean verifyOtp(String identifier, String otp) {
        String normalizedIdentifier = normalizeIdentifier(identifier);
        OtpEntry entry = otpStore.get(normalizedIdentifier);
        if (entry == null) {
            return false;
        }

        if (Instant.now().isAfter(entry.getExpiresAt())) {
            otpStore.remove(normalizedIdentifier);
            return false;
        }

        if (entry.getFailedAttempts() >= appProperties.getOtp().getMaxAttempts()) {
            otpStore.remove(normalizedIdentifier);
            return false;
        }

        if (!entry.getCode().equals(otp)) {
            entry.incrementFailedAttempts();
            if (entry.getFailedAttempts() >= appProperties.getOtp().getMaxAttempts()) {
                otpStore.remove(normalizedIdentifier);
            }
            return false;
        }

        otpStore.remove(normalizedIdentifier);
        return true;
    }

    private String createNumericOtp(int length) {
        StringBuilder builder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            builder.append(secureRandom.nextInt(10));
        }
        return builder.toString();
    }

    private String normalizeIdentifier(String identifier) {
        String trimmed = identifier.trim();
        if (trimmed.contains("@")) {
            return trimmed.toLowerCase();
        }
        return trimmed;
    }
}
