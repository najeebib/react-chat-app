import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar} from '@mui/material';
import db from "./firebase"
import {Link} from "react-router-dom"
function SidebarChat({id,name,addNewChat}) {
  const [messages,setMessages] = useState([]);

    const [seed,setSeed] = useState('');

    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000));
    },[]);

    useEffect(() =>{
      if(id)
      {
        //get the chat messages from firebase
        db.collection('Chats').doc(id).collection('messages').orderBy('timestamp','asc')
        .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data())))
        );
      }
  },[id]);

    //create new chat room
    const creatChat = () =>{
        const roomName  = prompt("Please enter a name");
        if(roomName)
        {
          db.collection('Chats').add({
            Name: roomName
          });
        }
    }
    //display the messages from firebase
  return !addNewChat ? (
    <Link to={`/chats/${id}`}>
      <div className="SidebarChat"> 
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="SidebarChatinfo">
            <h2>{name}</h2>{}
            <p>{messages[0] &&messages[0].message}</p>
        </div>
    </div>
    </Link>
    
  ) : (
    <div onClick={creatChat}
    className="SidebarChat">
        <h2>Add new chat</h2>
    </div>
   
  );
}

export default SidebarChat

