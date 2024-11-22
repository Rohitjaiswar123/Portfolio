package com.portfolio.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.backend.request.EmailRequest;
import com.portfolio.backend.services.EmailService;

@RestController
public class ContactFormController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/submit-contact-form")
    public ResponseEntity<String> submitContactForm(@RequestBody EmailRequest request) {
        try {
            emailService.sendEmail(request);
            return ResponseEntity.ok("Your message has been sent successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to send message: " + e.getMessage());
        }
    }
}
