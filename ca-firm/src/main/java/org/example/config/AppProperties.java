package org.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final Jwt jwt = new Jwt();
    private final Otp otp = new Otp();
    private final Auth auth = new Auth();
    private final Mail mail = new Mail();
    private final Whatsapp whatsapp = new Whatsapp();
    private String frontendOrigin = "http://localhost:3000,http://localhost:5173,http://127.0.0.1:5173,http://[::1]:5173";

    public Jwt getJwt() {
        return jwt;
    }

    public Otp getOtp() {
        return otp;
    }

    public Auth getAuth() {
        return auth;
    }

    public Mail getMail() {
        return mail;
    }

    public Whatsapp getWhatsapp() {
        return whatsapp;
    }

    public String getFrontendOrigin() {
        return frontendOrigin;
    }

    public void setFrontendOrigin(String frontendOrigin) {
        this.frontendOrigin = frontendOrigin;
    }

    public static class Jwt {
        private String secret = "change-me-to-a-long-random-secret-key-for-jwt-signing-2026";
        private long expirationMinutes = 60;

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
        }

        public long getExpirationMinutes() {
            return expirationMinutes;
        }

        public void setExpirationMinutes(long expirationMinutes) {
            this.expirationMinutes = expirationMinutes;
        }
    }

    public static class Otp {
        private int length = 6;
        private long expirationMinutes = 5;
        private int maxAttempts = 5;

        public int getLength() {
            return length;
        }

        public void setLength(int length) {
            this.length = length;
        }

        public long getExpirationMinutes() {
            return expirationMinutes;
        }

        public void setExpirationMinutes(long expirationMinutes) {
            this.expirationMinutes = expirationMinutes;
        }

        public int getMaxAttempts() {
            return maxAttempts;
        }

        public void setMaxAttempts(int maxAttempts) {
            this.maxAttempts = maxAttempts;
        }
    }

    public static class Auth {
        private boolean manualEnabled = false;
        private String manualIdentifier = "";

        public boolean isManualEnabled() {
            return manualEnabled;
        }

        public void setManualEnabled(boolean manualEnabled) {
            this.manualEnabled = manualEnabled;
        }

        public String getManualIdentifier() {
            return manualIdentifier;
        }

        public void setManualIdentifier(String manualIdentifier) {
            this.manualIdentifier = manualIdentifier;
        }
    }

    public static class Mail {
        private boolean enabled = false;
        private String from = "no-reply@ca-firm.local";

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getFrom() {
            return from;
        }

        public void setFrom(String from) {
            this.from = from;
        }
    }

    public static class Whatsapp {
        private boolean enabled = false;
        private String accountSid = "";
        private String authToken = "";
        private String fromNumber = "";

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getAccountSid() {
            return accountSid;
        }

        public void setAccountSid(String accountSid) {
            this.accountSid = accountSid;
        }

        public String getAuthToken() {
            return authToken;
        }

        public void setAuthToken(String authToken) {
            this.authToken = authToken;
        }

        public String getFromNumber() {
            return fromNumber;
        }

        public void setFromNumber(String fromNumber) {
            this.fromNumber = fromNumber;
        }
    }
}
