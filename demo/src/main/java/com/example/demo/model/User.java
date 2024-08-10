package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
public class User {
    @Id
    private int id;
    private String username;
    private String password;
    private String email;
    private String role;

    public String getRoles() {
        return role;
    }
}
