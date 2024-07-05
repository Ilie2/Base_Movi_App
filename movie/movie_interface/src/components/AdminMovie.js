import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MoviePage.css';

class AdminMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      newMovie: {
        title: '',
        author: '',
        genre: '',
        year: 0,
        img: '',
        url: '',
      },
      updateMovie: {
        id: 0,
        title: '',
        author: '',
        genre: '',
        year: 0,
        img: '',
        url: '',
      }
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    axios.get('http://localhost:8080/ai/movie')
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  handleChange = (e, isUpdate) => {
    const { name, value } = e.target;
    if (isUpdate) {
      this.setState({ updateMovie: { ...this.state.updateMovie, [name]: value } });
    } else {
      this.setState({ newMovie: { ...this.state.newMovie, [name]: value } });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = this.state.newMovie;
    axios.post('http://localhost:8080/ai/movie/add', newMovie)
      .then(response => {
        this.setState({
          movies: [...this.state.movies, response.data],
          newMovie: { title: '', author: '', genre: '', year: 0, img: '', url: '' },
        });
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const movieToUpdate = this.state.updateMovie;
    axios.put('http://localhost:8080/ai/movie/update', movieToUpdate)
      .then(response => {
        const updatedMovies = this.state.movies.map(movie =>
          movie.id === movieToUpdate.id ? response.data : movie
        );
        this.setState({
          movies: updatedMovies,
          updateMovie: { id: 0, title: '', author: '', genre: '', year: 0, img: '', url: '' },
        });
      })
      .catch(error => {
        console.error('Error updating movie:', error);
      });
  };

  handleDelete = (movie) => {
    axios.delete(`http://localhost:8080/ai/movie/delete/${movie.id}`)
      .then(() => {
        const remainingMovies = this.state.movies.filter(m => m.id !== movie.id);
        this.setState({ movies: remainingMovies });
      })
      .catch(error => {
        console.error('Error deleting movie:', error);
      });
  };

  handleEditClick = (movie) => {
    this.setState({ updateMovie: movie });
  };

  resetNewMovieForm = () => {
    this.setState({ newMovie: { title: '', author: '', genre: '', year: 0, img: '', url: '' } });
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
                <button onClick={() => this.handleEditClick(movie)}>Edit</button>
                <button onClick={() => this.handleDelete(movie)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <h2>Add a New Movie</h2>
        <form onSubmit={this.handleSubmit} className="add-movie-form">
        <input type="number" name="id" placeholder="id" value={this.state.newMovie.id} onChange={(e) => this.handleChange(e, false)} />
          <input type="text" name="title" placeholder="Title" value={this.state.newMovie.title} onChange={(e) => this.handleChange(e, false)} />
          <input type="text" name="author" placeholder="Author" value={this.state.newMovie.author} onChange={(e) => this.handleChange(e, false)} />
          <input type="text" name="genre" placeholder="Genre" value={this.state.newMovie.genre} onChange={(e) => this.handleChange(e, false)} />
          <input type="number" name="year" placeholder="Year" value={this.state.newMovie.year} onChange={(e) => this.handleChange(e, false)} />
          <input type="text" name="img" placeholder="Image URL" value={this.state.newMovie.img} onChange={(e) => this.handleChange(e, false)} />
          <input type="text" name="url" placeholder="Video URL" value={this.state.newMovie.url} onChange={(e) => this.handleChange(e, false)} />
          <button type="submit">Add Movie</button>
        </form>

        <h2>Update Movie</h2>
        <form onSubmit={this.handleUpdate} className="update-movie-form">
          <input type="number" name="id" placeholder="ID" value={this.state.updateMovie.id} onChange={(e) => this.handleChange(e, true)} />
          <input type="text" name="title" placeholder="Title" value={this.state.updateMovie.title} onChange={(e) => this.handleChange(e, true)} />
          <input type="text" name="author" placeholder="Author" value={this.state.updateMovie.author} onChange={(e) => this.handleChange(e, true)} />
          <input type="text" name="genre" placeholder="Genre" value={this.state.updateMovie.genre} onChange={(e) => this.handleChange(e, true)} />
          <input type="number" name="year" placeholder="Year" value={this.state.updateMovie.year} onChange={(e) => this.handleChange(e, true)} />
          <input type="text" name="img" placeholder="Image URL" value={this.state.updateMovie.img} onChange={(e) => this.handleChange(e, true)} />
          <input type="text" name="url" placeholder="Video URL" value={this.state.updateMovie.url} onChange={(e) => this.handleChange(e, true)} />
          <button type="submit">Update Movie</button>
        </form>
      </div>
    );
  }
}

export default AdminMovie;
