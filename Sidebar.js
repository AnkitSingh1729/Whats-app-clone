import React, {useEffect, useState} from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { SearchOutlined } from "@material-ui/icons";
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import db from './firebase'; // Local firebase not module firebase
import { useStateValue } from './StateProvider';
// "db" is defined as "firebaseApp.firestore()"
 
//<IconButton /> gives nice dribble effect while clicking the button
function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    // "db.collection('rooms')" means, go to "rooms" collection 
    useEffect(() => {// docs is refering to the list of elements we have in the database collection-named as 'rooms' in firebase
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (// If there is any change in snapshot of "db.collection('rooms')" then this function calls
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,  // Unique id written below "rooms" collection on firebase webite
                    data: doc.data(), //Here this data is name of chat box "Dev Room"
                })
                ))
        ))
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>  
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />  
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
  
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => ( 
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />) )}
            </div>
        </div>
    )
}

export default Sidebar
