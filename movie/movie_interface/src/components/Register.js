import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({ id: '', username: '', password: '', email: '', role: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/register', userData)
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error during registration:', error);
        setMessage('Error during registration!');
      });
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="id" placeholder="ID" value={userData.id} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" value={userData.role} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;

