import React, { useEffect, useState } from 'react';
import "./Sidebar.css"
import { Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import SidebarChat from "./SidebarChat";
import db from "./firebase"

const Sidebar = ({name}) => {
    const [seed,setSeed] = useState('');
    const [rooms,setRooms] = useState([]);
    const [search,setSearch] = useState('');
    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000));
    },[]);
    useEffect(()=>{
        //get the chat rooms from firebase
        db.collection('Chats').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        ));
    },[]);
    //display the chat room in the sidebar
    return (
        <div className="Sidebar">
            <div className="SidebarHeader">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <h1>{name}</h1>
            </div>
            <div className="SidebarSearch">
                <div className="SidebarSearchContainer">
                    <SearchIcon style={{color: 'gray', padding: '10px'}}/>
                    <input type="text"
                    value={search} onChange={(e)=> setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="SidebarChats">
                <SidebarChat addNewChat/>
                {rooms.filter(room => room.data.Name.indexOf(search)>-1)
                .map(room =>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.Name}/>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;