import React from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

    //login using google sigin popup with firebase
    const signIn = () => {
      setIsLoggedIn(true);

      // Redirect to the chat page
      navigate('/chat');
    }
  return ( 
    <div className="Login">
        <div className="LoginContainer">
            <div className="LoginText">
                <h1>Sign in to chat app</h1>
            </div>
        </div>
        <button type="submit" onClick={signIn}>Sign in with google</button> 
      
    </div>
  )
}

export default Login
