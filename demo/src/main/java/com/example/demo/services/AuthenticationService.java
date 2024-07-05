package com.example.demo.services;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;



    public User authenticate(String username, String password) {
        // Căutați utilizatorul în baza de date după numele de utilizator și parolă
        User user = userRepository.findByUsernameAndPassword(username, password);
        return user; // Va returna utilizatorul găsit sau null dacă nu este găsit
    }

    public void register(int id,String username, String password, String email , String role) {
        // Creați un nou utilizator și salvați-l în baza de date
        User newUser = new User(id,username, password,email,role);
        userRepository.save(newUser);

    }
}
