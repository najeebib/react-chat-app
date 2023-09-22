import { React, useState } from 'react'

import "./Register.css"
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

function Register() {
    const navigate = useNavigate();
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
        firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            navigate('/');
            })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
             // ..
        });

        // Redirect to the chat page
        
      };

  return (
    <div className="register">
        <h2>Register an account</h2>
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
        <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register
