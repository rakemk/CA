package org.example.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ApiMessageDto {
    @JsonProperty("message")
    private String message;

    public ApiMessageDto() {}

    public ApiMessageDto(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
