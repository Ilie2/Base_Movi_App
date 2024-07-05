package com.example.demo.Controllers;

import com.example.demo.model.User;
import com.example.demo.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationService authService;

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Verificați dacă utilizatorul există în baza de date
        User user = authService.authenticate(username, password);
        if (user != null) {
            return "Autentificare reușită!";
        } else {
            return "Autentificare eșuată!";
        }
    }


    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> userData) {
        int id= Integer.parseInt(userData.get("id"));
        String username = userData.get("username");
        String password = userData.get("password");
        String role = userData.get("role");
        String email = userData.get("email");

        authService.register(id,username, password, email,role);

        return "Utilizator înregistrat cu succes!";
    }
}