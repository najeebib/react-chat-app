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
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userUID, setUID] = useState(""); // State to track login status


  useEffect(() => {
    if (isLoggedIn)
    {
      
    }

  },[isLoggedIn, userUID]);
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
                <Sidebar/>

                <Routes>
                  <Route path="/chats/:chatId" element={<Chat />} />
                  <Route path="/chat" element={<Chat />} />
                </Routes>
                </div>
              
            )}
          
          </Router>
        
    </div>
    
      
    
  );
}

export default App;
