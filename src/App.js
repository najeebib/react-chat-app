import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from "react-router-dom";
import React from 'react';
import Login from "./Login"
import { useStateValue } from './StateProvider';
function App() {
  
  const [{ user }] = useStateValue();

  return (//Display login screen if user not logged in
    <div className="App">
      {!user ? (
         <Login/>
      ) : (
        <div className="chat">
          <Router>
          <Sidebar/>
            <Routes>
              <Route path="/chats/:chatId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
    
      
    
  );
}

export default App;
