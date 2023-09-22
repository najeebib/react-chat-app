import { React, useState } from 'react'

import "./Login.css"
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import { auth } from './firebase';
function Login({ setIsLoggedIn }) {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add code to send login data to your server or perform authentication.
    // For this example, we'll just log the data to the console.
    console.log(formData);
    setIsLoggedIn(true);

      // Redirect to the chat page
      navigate('/chat');
  };





  const navigate = useNavigate();

    
  return ( 
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/Register">Register here</Link>
      </p>
    </div>
  )
}

export default Login
