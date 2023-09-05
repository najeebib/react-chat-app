import React, { useEffect, useState } from 'react';
import "./Sidebar.css"
import { IconButton ,Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SidebarChat from "./SidebarChat";
import db from "./firebase"
import { useStateValue } from './StateProvider'

const Sidebar = () => {
    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(()=>{
        db.collection('Chats').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        ));
    },[]);
    return (
        <div className="Sidebar">
            <div className="SidebarHeader">
                <Avatar src={user?.photoURL}/>
                <div className="SidebarheaderRight">
                    <IconButton style={{marginRight: '1vw',fontSize: '24px'}}>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton style={{marginRight: '1vw',fontSize: '24px'}}>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton style={{marginRight: '1vw',fontSize: '24px'}}>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="SidebarSearch">
                <div className="SidebarSearchContainer">
                    <SearchIcon style={{color: 'gray', padding: '10px'}}/>
                    <input type="text"/>
                </div>
            </div>
            <div className="SidebarChats">
                <SidebarChat addNewChat/>
                {rooms.map(room =>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.Name}/>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;