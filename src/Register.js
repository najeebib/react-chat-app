import { React, useState } from 'react'
import db from "./firebase"
import "./Register.css"
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

function Register() {
    const navigate = useNavigate();
    
      const [name,setName] = useState(''); 
      const [email,setEmail] = useState(''); 
      const [password,setPass] = useState(''); 
      
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can add code to send login data to your server or perform authentication.
        // For this example, we'll just log the data to the console.
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            const uid = user.uid;
            db.collection('Users').doc(uid).set({
              Name: name,
              Email: email,
              // Other user data you want to store
            });
      
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
          <label>Name:</label>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=> setPass(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register
