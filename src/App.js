import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Register from './Register';
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from "react-router-dom";
import {useState,React} from 'react';
import Login from "./Login"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status


  return (
    <div className="App">
       
          <Router>
            {!isLoggedIn &&(
               <Routes>
                <Route
                 path="/"
                 element={<Login setIsLoggedIn={setIsLoggedIn} />} // Pass setIsLoggedIn to Login
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
