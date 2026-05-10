package org.example.auth;

import java.util.Map;
import java.util.Objects;

import org.example.auth.dto.ApiMessageDto;
import org.example.auth.dto.AuthResponseDto;
import org.example.auth.dto.OtpRequestDto;
import org.example.auth.dto.OtpResponseDto;
import org.example.auth.dto.VerifyOtpDto;
import org.example.auth.model.UserRole;
import org.example.auth.service.JwtService;
import org.example.auth.service.OtpService;
import org.example.config.AppProperties;
import org.example.notifications.EmailSender;
import org.example.notifications.WhatsAppSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

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
    public ResponseEntity<?> requestOtp(@Valid @RequestBody OtpRequestDto request) {
        String identifier = normalizeIdentifier(request.getIdentifier());
        String otp = otpService.issueOtp(identifier);

        boolean emailSent = false;
        boolean whatsappSent = false;
        if (isEmailIdentifier(identifier)) {
            emailSent = emailSender.sendOtp(identifier, otp);
        } else {
            whatsappSent = whatsAppSender.sendOtp(identifier, otp);
        }

        // Dev mode: return OTP in response
        if (appProperties.getOtp().isDevModeDisplay()) {
            OtpResponseDto response = new OtpResponseDto("OTP generated", otp);
            return ResponseEntity.ok(response);
        }

        if (!appProperties.getMail().isEnabled() && !appProperties.getWhatsapp().isEnabled()) {
            LOGGER.info("OTP dev fallback for {}: {}", identifier, otp);
            ApiMessageDto msg = new ApiMessageDto("OTP generated locally. Check server logs for the OTP in development mode.");
            return ResponseEntity.ok(msg);
        }

        if (!emailSent && !whatsappSent) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "OTP could not be delivered. Check email/WhatsApp provider configuration.");
        }

        ApiMessageDto response;
        if (emailSent && whatsappSent) {
            response = new ApiMessageDto("OTP sent on email and WhatsApp");
        } else if (whatsappSent) {
            response = new ApiMessageDto("OTP sent on WhatsApp");
        } else {
            response = new ApiMessageDto("OTP sent on email");
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponseDto> verifyOtp(@Valid @RequestBody VerifyOtpDto request) {
        String identifier = normalizeIdentifier(request.getIdentifier());
        boolean valid = otpService.verifyOtp(identifier, request.getOtp());
        if (!valid) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired OTP");
        }

        String role = appProperties.getAuth().getDefaultRole();
        String token = jwtService.generateToken(identifier, role);
        AuthResponseDto response = new AuthResponseDto(token, "Bearer", jwtService.getExpirationEpochSeconds(), role);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/manual-login")
    public ResponseEntity<AuthResponseDto> manualLogin(@Valid @RequestBody OtpRequestDto request) {
        if (!appProperties.getAuth().isManualEnabled()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Manual login is disabled");
        }

        String configuredIdentifier = normalizeIdentifier(appProperties.getAuth().getManualIdentifier());
        if (configuredIdentifier.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Manual login is enabled but no manual identifier is configured");
        }

        String identifier = normalizeIdentifier(request.getIdentifier());
        if (!Objects.equals(identifier, configuredIdentifier)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Manual login is not allowed for this identifier");
        }

        String role = request.getRole() != null ? request.getRole() : appProperties.getAuth().getDefaultRole();
        String token = jwtService.generateToken(identifier, role);
        AuthResponseDto response = new AuthResponseDto(token, "Bearer", jwtService.getExpirationEpochSeconds(), role);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> me(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        String token = extractBearerToken(authHeader);
        String subject = jwtService.getSubjectFromToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

        String role = jwtService.getRoleFromToken(token).orElse("user");
        return ResponseEntity.ok(Map.of("identifier", subject, "email", subject, "role", role));
    }

    @GetMapping("/role")
    public ResponseEntity<Map<String, String>> getRole(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        String token = extractBearerToken(authHeader);
        String role = jwtService.getRoleFromToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

        return ResponseEntity.ok(Map.of("role", role));
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
