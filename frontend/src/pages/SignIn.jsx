import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import '../styles/signin.css'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password,
      });
      setMessage('Sign in successful!');
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='form-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <input
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaRegUser className='icon username'/>
        </div>
        <div className='form-control'>
          <input
            type="password"
            placeholder="Enter your password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <RiLockPasswordLine className='icon password'/>
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? Please sign up</p>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignIn;
