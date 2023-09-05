import React from 'react'
import "./Login.css"
import {auth,provider} from "./firebase"
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
function Login() {
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result =>
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
              })
      
            ).catch(error => alert(error));
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
