package com.example.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Document
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
public class Movie {
    @Id
    private Integer id;

    private String title;

    private String author;

    private String genre;

    private int year;

    private String img;

    private String url;

    private List<Integer> reviewIds;
}
