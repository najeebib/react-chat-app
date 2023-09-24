import { React, useState } from 'react'

import "./Login.css"
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import firebase from 'firebase/compat/app';

function Login({ setIsLoggedIn ,setUID}) {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {//change the values on change
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {//login onclick
    e.preventDefault();
    console.log(formData);

    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
    .then((userCredential) => {
      var user = userCredential.user;//get user details
      setUID(user.uid)//set the current user id
      setIsLoggedIn(true);//the user is logged in succesfully 

     })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error" + errorCode + "\n" + errorMessage)
    });
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
