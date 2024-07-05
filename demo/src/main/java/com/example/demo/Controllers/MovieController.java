package com.example.demo.Controllers;

import com.example.demo.model.Movie;
import com.example.demo.repository.MovieRepos;
import com.example.demo.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ai/movie")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @Autowired
    private MovieRepos movieRepos;

    @PostMapping("/add")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        if (movie.getTitle() == null || movie.getAuthor() == null || movie.getGenre() == null || movie.getYear() == 0 || movie.getImg() == null || movie.getUrl() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Movie savedMovie = movieRepos.save(movie);
        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Movie> updateMovie(@RequestBody Movie movie) {
        if (movie.getId() == 0 || movieRepos.findById(movie.getId()).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Movie updatedMovie = movieRepos.save(movie);
        return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable int id) {
        if (movieRepos.findById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        movieRepos.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.findAll();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
        return movieRepos.findById(id)
                .map(movie -> new ResponseEntity<>(movie, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/sorted-by-genre")
    public ResponseEntity<List<Movie>> getAllMoviesSortedByGenre() {
        List<Movie> movies = movieService.findAllSortedByGenre();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }
}
