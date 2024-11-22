package com.portfolio.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.portfolio.backend.request.EmailRequest;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(EmailRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();

        // Set the recipient to your email address
        message.setTo("rohit.s.jaiswar@gmail.com"); // Replace with your email address

        // Set the subject using the user's subject
        message.setSubject("New Contact Form Submission: " + request.getSubject());

        // Construct the email body to include user details
        String emailBody = "You have received a new message from your portfolio contact form.\n\n" +
                           "Details:\n" +
                           "First Name: " + request.getFirstName() + "\n" +
                           "Last Name: " + request.getLastName() + "\n" +
                           "Email: " + request.getEmail() + "\n" +
                           "Subject: " + request.getSubject() + "\n" +
                           "Message: " + request.getMessage();

        message.setText(emailBody);

        // Send the email
        mailSender.send(message);
    }
}
