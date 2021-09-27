import React, { useEffect, useState} from 'react'

import {Avatar} from "@material-ui/core"
import './SidebarChat.css'
import db from './firebase';
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', "desc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => 
                doc.data()))
            ))
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])
  

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        // Only if we entered a "roomName" in the prompt 
        if (roomName) {
            // Do some clever database stuff...
            db.collection('rooms').add({
                name: roomName,
            });
        }
       };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} className="sidebarChatImg" />
                <div className="sidebarChat__info">
                    <div>
                        <h2>{name}</h2>
                        <span className="sidebarChatTime">{
                            new Date(
                                messages[0]?.timestamp?.toDate()
                            ).getHours()
                        }
                        {`:`}
                        {
                            new Date(
                                messages[0]?.timestamp?.toDate()
                            ).getMinutes()
                        }
                        </span>
                    </div>
                    
                    <span>{messages[0]?.message}</span>
                    
                </div>
            </div>
        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    );
}

export default SidebarChat
