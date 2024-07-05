// MoviePlayerPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MoviePlayerPage.css';

const MoviePlayerPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, [movieId]);

  const fetchMovieDetails = (id) => {
    axios.get(`http://localhost:8080/ai/movie/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="movie-player-container">
      <h2>{movie.title}</h2>
      {isYouTubeUrl(movie.url) ? (
        <iframe
          width="600"
          height="400"
          src={getYouTubeEmbedUrl(movie.url)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={movie.title}
        ></iframe>
      ) : (
        <video controls width="600">
          <source src={movie.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="movie-details">
        <p><strong>Author:</strong> {movie.author}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.year}</p>
      </div>
    </div>
  );
};

export default MoviePlayerPage;
