package org.example.auth;

import jakarta.validation.Valid;
import org.example.auth.dto.ApiMessageDto;
import org.example.auth.dto.AuthResponseDto;
import org.example.auth.dto.OtpRequestDto;
import org.example.auth.dto.VerifyOtpDto;
import org.example.auth.service.JwtService;
import org.example.auth.service.OtpService;
import org.example.config.AppProperties;
import org.example.notifications.EmailSender;
import org.example.notifications.WhatsAppSender;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private final OtpService otpService;
    private final JwtService jwtService;
    private final EmailSender emailSender;
    private final WhatsAppSender whatsAppSender;
    private final AppProperties appProperties;

    public AuthController(OtpService otpService, JwtService jwtService, EmailSender emailSender, WhatsAppSender whatsAppSender, AppProperties appProperties) {
        this.otpService = otpService;
        this.jwtService = jwtService;
        this.emailSender = emailSender;
        this.whatsAppSender = whatsAppSender;
        this.appProperties = appProperties;
    }

    @PostMapping("/request-otp")
    public ResponseEntity<ApiMessageDto> requestOtp(@Valid @RequestBody OtpRequestDto request) {
        String identifier = normalizeIdentifier(request.identifier());
        String otp = otpService.issueOtp(identifier);

        boolean emailSent = false;
        boolean whatsappSent = false;
        if (isEmailIdentifier(identifier)) {
            emailSent = emailSender.sendOtp(identifier, otp);
        } else {
            whatsappSent = whatsAppSender.sendOtp(identifier, otp);
        }

        if (!appProperties.getMail().isEnabled() && !appProperties.getWhatsapp().isEnabled()) {
            LOGGER.info("OTP dev fallback for {}: {}", identifier, otp);
            return ResponseEntity.ok(new ApiMessageDto("OTP generated locally. Check server logs for the OTP in development mode."));
        }

        if (!emailSent && !whatsappSent) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "OTP could not be delivered. Check email/WhatsApp provider configuration.");
        }

        if (emailSent && whatsappSent) {
            return ResponseEntity.ok(new ApiMessageDto("OTP sent on email and WhatsApp"));
        }

        if (whatsappSent) {
            return ResponseEntity.ok(new ApiMessageDto("OTP sent on WhatsApp"));
        }

        return ResponseEntity.ok(new ApiMessageDto("OTP sent on email"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponseDto> verifyOtp(@Valid @RequestBody VerifyOtpDto request) {
        String identifier = normalizeIdentifier(request.identifier());
        boolean valid = otpService.verifyOtp(identifier, request.otp());
        if (!valid) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired OTP");
        }

        String token = jwtService.generateToken(identifier);
        return ResponseEntity.ok(new AuthResponseDto(token, "Bearer", jwtService.getExpirationEpochSeconds()));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> me(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        String token = extractBearerToken(authHeader);
        String subject = jwtService.getSubjectFromToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

        return ResponseEntity.ok(Map.of("identifier", subject, "email", subject));
    }

    private boolean isEmailIdentifier(String identifier) {
        return identifier.contains("@");
    }

    private String normalizeIdentifier(String identifier) {
        String trimmed = identifier.trim();
        if (isEmailIdentifier(trimmed)) {
            return trimmed.toLowerCase();
        }
        return trimmed;
    }

    private String extractBearerToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing bearer token");
        }
        return authHeader.substring(7);
    }
}
