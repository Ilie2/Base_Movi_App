import React from 'react';
import './HomePage.css'; // fișier CSS pentru stilizare

class HomePage extends React.Component {
  render() {
    return (
      <div className="homepage">
        <header className="homepage-header">
          <h1>Welcome to the Movie Database</h1>
          <p>Explore our collection of movies and their reviews.</p>
        </header>
        
        <div className="homepage-content">
          <div className="movie-section">
            <img src="https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg" alt="The Matrix" className="movie-image" />
            <h2>The Matrix</h2>
            <p>A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.</p>
            <button className="explore-button">Explore</button>
          </div>
          
          <div className="movie-section">
            <img src="" alt="Inception" className="movie-image" />
            <h2>Inception</h2>
            <p>A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.</p>
            <button className="explore-button">Explore</button>
          </div>
          
          <div className="movie-section">
            <img src="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg" alt="Interstellar" className="movie-image" />
            <h2>Interstellar</h2>
            <p>A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</p>
            <button className="explore-button">Explore</button>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
