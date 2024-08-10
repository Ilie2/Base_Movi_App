// MoviePage.js

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MoviePage.css';

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      newMovie: {
        id: 0,
        title: '',
        author: '',
        genre: '',
        year: 0,
        img: '',
        url: '', // Adăugat câmpul url
      },
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/ai/movie')
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ newMovie: { ...this.state.newMovie, [name]: value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = this.state.newMovie;
    axios.post('http://localhost:8080/ai/movie/addmovie1', newMovie)
      .then(response => {
        this.setState({
          movies: [...this.state.movies, response.data],
          newMovie: { id: 0, title: '', author: '', genre: '', year: 0, img: '', url: '' }, // Reset url
        });
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  render() {
    return (
      <div className="container">
        <h2>List of Movies</h2>
        <div className="movie-list">
          {this.state.movies.map(movie => (
            <div key={movie.id} className="movie-item">
              <img src={movie.img} alt={movie.title} />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p><strong>Author:</strong> {movie.author}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Year:</strong> {movie.year}</p>
                <Link to={`/movies/${movie.id}/reviews`} className="review-link">Reviews</Link>
                <Link to={`/movies/${movie.id}/play`} className="play-link">Watch</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MoviePage;
