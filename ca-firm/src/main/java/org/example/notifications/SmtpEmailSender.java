package org.example.notifications;

import org.example.config.AppProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SmtpEmailSender implements EmailSender {

    private static final Logger LOGGER = LoggerFactory.getLogger(SmtpEmailSender.class);

    private final JavaMailSender mailSender;
    private final AppProperties appProperties;

    public SmtpEmailSender(JavaMailSender mailSender, AppProperties appProperties) {
        this.mailSender = mailSender;
        this.appProperties = appProperties;
    }

    @Override
    public boolean sendOtp(String toEmail, String otp) {
        if (!appProperties.getMail().isEnabled()) {
            LOGGER.info("Mail sending disabled. OTP for {} is {}", toEmail, otp);
            return false;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(appProperties.getMail().getFrom());
            message.setTo(toEmail);
            message.setSubject("Your CA Firm Login OTP");
            message.setText("Your OTP is " + otp + ". It expires in " + appProperties.getOtp().getExpirationMinutes() + " minutes.");
            mailSender.send(message);
            return true;
        } catch (Exception ex) {
            LOGGER.error("Failed to send OTP email to {}", toEmail, ex);
            return false;
        }
    }
}
