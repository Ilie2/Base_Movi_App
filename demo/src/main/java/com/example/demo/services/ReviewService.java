package com.example.demo.services;


import com.example.demo.model.Review;
import com.example.demo.repository.ReviewRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepos reviewRepos;
    public List<Review> findAll() {
        return reviewRepos.findAll();
    }
    public Review save(Review review) {
        return reviewRepos.save(review);
    }
    public Review delete(Review review) {
        reviewRepos.delete(review);
        return review;
    }
    public Review update(Review review) {
        return reviewRepos.save(review);
    }
    public Review addReview(Review review) {
        return reviewRepos.save(review);
    }

}
