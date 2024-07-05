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
public class Review {
    @Id
    private String id;
    private String reviewer;
    private int movieId; // ID-ul filmului pe care se face recenzia
    private int rating;
    private String comment;
}
