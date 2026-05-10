package org.example.notifications;

import org.example.config.AppProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class TwilioWhatsAppSender implements WhatsAppSender {

    private static final Logger LOGGER = LoggerFactory.getLogger(TwilioWhatsAppSender.class);

    private final AppProperties appProperties;
    private final RestClient restClient = RestClient.builder().build();

    public TwilioWhatsAppSender(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @Override
    public boolean sendOtp(String phoneNumber, String otp) {
        if (!appProperties.getWhatsapp().isEnabled()) {
            LOGGER.info("WhatsApp sending disabled. OTP for {} is {}", phoneNumber, otp);
            return false;
        }

        try {
            String accountSid = appProperties.getWhatsapp().getAccountSid();
            String authToken = appProperties.getWhatsapp().getAuthToken();
            String fromNumber = appProperties.getWhatsapp().getFromNumber();

            if (isBlank(accountSid) || isBlank(authToken) || isBlank(fromNumber)) {
                LOGGER.error("WhatsApp is enabled but Twilio configuration is incomplete");
                return false;
            }

            String url = "https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Messages.json";

            String from = asWhatsAppAddress(fromNumber);
            String to = asWhatsAppAddress(phoneNumber);
            String body = "Your CA Firm OTP is " + otp + ". It expires in " + appProperties.getOtp().getExpirationMinutes() + " minutes.";

            restClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .headers(headers -> headers.setBasicAuth(accountSid, authToken))
                    .body("From=" + encode(from) + "&To=" + encode(to) + "&Body=" + encode(body))
                    .retrieve()
                    .toBodilessEntity();
            return true;
        } catch (Exception ex) {
            LOGGER.error("Failed to send OTP over WhatsApp to {}", phoneNumber, ex);
            return false;
        }
    }

    private String asWhatsAppAddress(String value) {
        String sanitized = value == null ? "" : value.trim().replace(" ", "");
        if (sanitized.regionMatches(true, 0, "whatsapp:", 0, "whatsapp:".length())) {
            return "whatsapp:" + sanitized.substring("whatsapp:".length());
        }
        return "whatsapp:" + sanitized;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String encode(String value) {
        return java.net.URLEncoder.encode(value, java.nio.charset.StandardCharsets.UTF_8);
    }
}
