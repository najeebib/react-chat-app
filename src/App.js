import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Register from './Register';
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from "react-router-dom";
import {useState,React,useEffect} from 'react';
import Login from "./Login"
import db from './firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userUID, setUID] = useState(""); // State to track login status
  const [name,setName] = useState('');

  useEffect(() => {
    if (isLoggedIn)
    {
      db.collection('Users').doc(userUID).onSnapshot(snapshot => {
        const userData = snapshot.data();
        if (userData) {
          setName(userData.Name);
        }
      });
    }

  },[isLoggedIn]);
  return (
    <div className="App">
       
          <Router>
            {!isLoggedIn &&(
               <Routes>
                <Route
                 path="/"
                 element={<Login setIsLoggedIn={setIsLoggedIn} setUID={setUID} />} // Pass setIsLoggedIn to Login
               />
               <Route
                 path="/Register"
                 element={<Register />} // Pass setIsLoggedIn to Login
               />
             </Routes>
            )}
            {isLoggedIn &&(
              
              <div className="chat">
                <Sidebar name={name}/>

                <Routes>
                  <Route path="/chats/:chatId" element={<Chat name={name}/>} />
                  <Route path="/" element={<Chat />} />
                </Routes>
                </div>
              
            )}
          
          </Router>
        
    </div>
    
      
    
  );
}

export default App;
