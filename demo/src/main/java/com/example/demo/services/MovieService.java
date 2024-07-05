package com.example.demo.services;

import com.example.demo.model.Movie;
import com.example.demo.repository.MovieRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    MovieRepos movieRepos;

    public void save(Movie movie) {
        movieRepos.save(movie);
    }

    public void delete(Movie movie) {
        movieRepos.delete(movie);
    }
    public List<Movie> findAll() {
        return movieRepos.findAll();
    }

    public List<Movie> findAllSortedByGenre() {
        return movieRepos.findAllByOrderByGenreAsc();
    }
}
