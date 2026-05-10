package org.example.notifications;

import org.example.config.AppProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.Base64;


@Service
public class TwilioWhatsAppSender implements WhatsAppSender {

    private static final Logger LOGGER = LoggerFactory.getLogger(TwilioWhatsAppSender.class);

    private final AppProperties appProperties;
    private final RestTemplate restTemplate;

    public TwilioWhatsAppSender(AppProperties appProperties, RestTemplateBuilder restTemplateBuilder) {
        this.appProperties = appProperties;
        this.restTemplate = restTemplateBuilder.build();
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

                // Create headers
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                String auth = accountSid + ":" + authToken;
                String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
                headers.set("Authorization", "Basic " + encodedAuth);

                // Create body
                MultiValueMap<String, String> body_map = new LinkedMultiValueMap<>();
                body_map.add("From", from);
                body_map.add("To", to);
                body_map.add("Body", body);

                HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body_map, headers);
                restTemplate.postForObject(url, request, String.class);
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
}
