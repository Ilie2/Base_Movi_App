package com.example.demo.Controllers;

import com.example.demo.model.Review;
import com.example.demo.repository.ReviewRepos;
import com.example.demo.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ReviewRepos reviewRepos;

    @PostMapping("/add")
    public Review addReview(@RequestBody Review review) {
        return reviewService.save(review);
    }
    @PostMapping("/delete.review")
    public Review deleteReview(@RequestBody Review review) {
        return reviewService.delete(review);
    }
    @PostMapping("/update.review")
    public Review updateReview(@RequestBody Review review) {
        return reviewService.update(review);
    }
    @GetMapping
    public List<Review> getReviewsByMovieId() {
        return reviewRepos.findAll();
    }
}
