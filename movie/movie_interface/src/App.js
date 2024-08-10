import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './components/MoviePage';
import HomePage from './components/HomePage';
import ReviewPage from './components/ReviewPage';
import MoviePlayerPage from './components/MoviePlayerPage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminMovie from './components/AdminMovie';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/*" element={<PrivateRoute element={MoviePage} />} />
            <Route path="/movies/:movieId/play" element={<MoviePlayerPage />} />
            <Route path="/movies/:id/reviews" element={<ReviewPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/AdminMovie" element={<PrivateRoute element={AdminMovie} requiredRole="admin" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
