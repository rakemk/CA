package org.example.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OtpResponseDto {
    @JsonProperty("message")
    private String message;

    @JsonProperty("devOtp")
    private String devOtp;

    public OtpResponseDto() {}

    public OtpResponseDto(String message, String devOtp) {
        this.message = message;
        this.devOtp = devOtp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDevOtp() {
        return devOtp;
    }

    public void setDevOtp(String devOtp) {
        this.devOtp = devOtp;
    }
}
