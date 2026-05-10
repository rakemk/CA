package org.example.notifications;

public interface EmailSender {
    boolean sendOtp(String toEmail, String otp);
}
