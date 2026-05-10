package org.example.notifications;

public interface WhatsAppSender {
    boolean sendOtp(String phoneNumber, String otp);
}
