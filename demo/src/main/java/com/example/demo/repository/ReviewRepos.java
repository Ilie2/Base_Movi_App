package com.example.demo.repository;

import com.example.demo.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepos extends MongoRepository<Review, Integer> {
}
