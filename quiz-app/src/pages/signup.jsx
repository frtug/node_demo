import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthStyles.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signup data:', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    // send to our api 
    async function makeSignUp(){
      try{
        const response = await axios.post(`${API_BASE_URL}/auth/signup`,formData,{
          header:{'Content-Type':'application/json'}
          // 'Authorization':"Bearer token" 
        })
        const data = response.data;
        console.log(data.token)
        localStorage.set('token',data.token)
      }
      catch(err){
        console.log(err)
      }
    } 
    makeSignUp()
    // Handle signup logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
        
        <p className="toggle-text">
          Already have an account?
          <Link to="/login" className="toggle-btn">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;