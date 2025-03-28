import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthStyles.css';

const API_BASE_URL = 'http://localhost:5000/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    console.log('Login data:', formData);
    // const formData1 = new formData();
    // formData1.email = "dfsdfsadfasdf"
    // Handle login logic here
    // api call for send the fields of email and password
    async function makeLogin(){
      try{
        const response = await fetch(`${API_BASE_URL}/auth/login`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(formData)
        });
        console.log(response)
        if(!response.ok) throw "Sever didn't proper response";
        const data = await response.json();
        console.log(data.token)
        localStorage.setItem('token',data.token)
      }
      catch(err){
        console.log(err)
      }
    }
    makeLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Login</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
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
          
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        
        <p className="toggle-text">
          Don't have an account?
          <Link to="/signup" className="toggle-btn">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;