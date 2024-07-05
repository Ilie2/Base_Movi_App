import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ReviewPage.css'

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      newReview: {
        reviewer: '',
        comment: '',
        rating: 0,
        movieId: parseInt(this.props.movieId, 10),
      },
    };
  }

  componentDidMount() {
    const movieId = this.props.movieId;
    axios.get('http://localhost:8080/api/reviews')
      .then(response => {
        const movieReviews = response.data.filter(review => review.movieId === parseInt(movieId, 10));
        this.setState({ reviews: movieReviews });
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ newReview: { ...this.state.newReview, [name]: value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newReview = this.state.newReview;
    axios.post('http://localhost:8080/api/reviews/add', newReview)
      .then(response => {
        this.setState({
          reviews: [...this.state.reviews, response.data],
          newReview: { reviewer: '', comment: '', rating: 0, movieId: parseInt(this.props.movieId, 10) },
        });
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };

  render() {
    return (
      <div className="review-page">
        <h2>Reviews for Movie</h2>
        <ul>
          {this.state.reviews.map(review => (
            <li key={review.id} className="review-item">
              <p><strong>Reviewer:</strong> {review.reviewer}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
            </li>
          ))}
        </ul>
        <h2>Add a Review</h2>
        <form className="review-form" onSubmit={this.handleSubmit}>
          <input type="text" name="reviewer" placeholder="Reviewer" value={this.state.newReview.reviewer} onChange={this.handleChange} />
          <textarea name="comment" placeholder="Comment" value={this.state.newReview.comment} onChange={this.handleChange}></textarea>
          <input type="number" name="rating" placeholder="Rating (1-5)" value={this.state.newReview.rating} onChange={this.handleChange} />
          <button type="submit">Add Review</button>
        </form>
      </div>
    );
  }
}

const ReviewPageWrapper = () => {
  const { id } = useParams();
  return <ReviewPage movieId={id} />;
};

export default ReviewPageWrapper;
