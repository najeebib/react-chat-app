import React, { useEffect, useState } from 'react';
import "./Sidebar.css"
import { Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import SidebarChat from "./SidebarChat";
import db from "./firebase"
import { useStateValue } from './StateProvider'

const Sidebar = () => {
    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    const [search,setSearch] = useState('');

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