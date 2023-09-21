import React,{ useEffect, useState } from 'react'
import "./Chat.css"
import {Avatar} from '@mui/material';

import {useParams} from "react-router-dom";
import db from './firebase';
import firebase from "firebase/compat/app";
function Chat() {
  let {chatId} = useParams();
  const [seed,setSeed] = useState('');
  const [input,setInput] = useState('');
  const [RoomName,setRoomName] = useState('');
  const [messages,setMessages] = useState([]);
  //get the chat room name and messages from firebase
  useEffect(() =>{
    if(chatId)
    {
      db.collection('Chats').doc(chatId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().Name)
      ));
      db.collection('Chats').doc(chatId).collection('messages').orderBy('timestamp','asc')
      .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data())))
      );
    }
},[chatId]);



  useEffect(() =>{
      setSeed(Math.floor(Math.random() * 5000));
  },[]);
//send the message to the the chat room messages collection for this room
const sendMessage = (e) =>{
  e.preventDefault();
  
  /*db.collection('Chats').doc(chatId).collection('messages').add({
    message: input,
    name: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })*/
  setInput("")
}

  return (
    <div className="Chat">
      <div className="ChatHeader">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="ChatHeaderInfo">
            <h3>{RoomName}</h3>
        </div>
          
      </div>
      <div className="ChatBody">{console.log(messages)}
        {messages.map((message) => (
          <div className={`ChatMessage ${"" === message.name&& 'ChatReciever'}`}>
          <span className="ChatName">{message.name}</span>
            {message.message}
            <span className="Timestamp">
              {new Date(message.timestamp && message.timestamp.toDate()).toUTCString()}
            </span>
          </div>
        ))}
      </div>
      <div className="ChatFooter">

        <form>
            <input value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Type a message" type="text"/>
            <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
