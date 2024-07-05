import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importăm useNavigate pentru a gestiona redirecționările

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Utilizăm useNavigate pentru a gestiona redirecționările

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', credentials)
      .then(response => {
        localStorage.setItem('isLoggedIn', 'true'); // Salvăm starea autentificării în localStorage
        setMessage(response.data);
        navigate('/'); // Redirecționăm utilizatorul către pagina principală după autentificare
      })
      .catch(error => {
        console.error('Error during login:', error);
        setMessage('Error during login!');
      });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
