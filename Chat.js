import { Avatar, IconButton } from "@material-ui/core"; 
import { AttachFile,  MoreVert, SearchOutlined } from "@material-ui/icons";
import  InsertEmoticonIcon  from "@material-ui/icons/InsertEmoticon";
import  MicIcon  from "@material-ui/icons/Mic";
import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import "./Chat.css"
import db from "./firebase";
import firebase from "firebase"
import { useStateValue } from "./StateProvider";

function Chat() {
    const [input, setInput] = useState(""); // useState("") sets default value to empty
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    // const [day, setDay] = useState();
    const [{user}, dispatch] = useStateValue();

    const day = [];
    
    const setday = (message) => {
        day.push(message.timestamp?.toDate().getDay())
    }

    useEffect(() => {
        if (roomId) { 
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => ( //"onSnapshot" is realtime listener
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log("You typed", input);  // On pressing enter key
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");   // Whenever we press "enter" it will empty the input
    };
    const message__time = new Date(
        messages[messages.length - 1]?.timestamp?.toDate()
    );
    const weekday = new Array('Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat');
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {/* <p>Last seen at ...</p> */}
                    <p> Last seen  : {(new Date()).getDay() === message__time.getDay() ? "today" : weekday[message__time.getDay()] }
                        {`, `}
                        { message__time.getHours()
                        }
                        {`:`}
                        { message__time.getMinutes()
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>  
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />  
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {/* <span className="chat__day">{message__time.getHours() === 31? weekday[message__time.getDay()]:"today"}</span> */}
                {messages.map((message) => (
                    
                    <p >
                        {
                            message.timestamp?.toDate().getDay() === day[day.length-1] ? 
                            (
                                <div className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                                    {/* {console.log(message__time.toUTCString())} */}
                                    <span className="chat__name">{message.name}</span>
                                    {message.message}
                                    <span className="chat__timestamp">
                                        {new Date(message.timestamp?.toDate()).getHours()}
                                        {`:`}
                                        {/* {const day = new Date(message.timestamp?.toDate()).getHours() > 15 && new Date(message.timestamp?.toDate()).getHours() < 16? true:false} */}
                                        {new Date(message.timestamp?.toDate()).getMinutes()}
                                    </span>
                                </div>


                            ) : (

                                <div>
                                    {/* {console.log(message.timestamp?.toDate().toUTCString())}  */}
                                    <span className="chat__day">{(new Date()).getDay() === message.timestamp?.toDate().getDay() ? "today" : weekday[message.timestamp?.toDate().getDay()] }</span>
                                
                                    <div className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                                        <span className="chat__name">{message.name}</span>
                                        {message.message}
                                        <span className="chat__timestamp">
                                            {new Date(message.timestamp?.toDate()).getHours()}
                                            {`:`}
                                            {/* {const day = new Date(message.timestamp?.toDate()).getHours() > 15 && new Date(message.timestamp?.toDate()).getHours() < 16? true:false} */}
                                            {new Date(message.timestamp?.toDate()).getMinutes()}
                                        </span>
                                    </div>
                                    <div className="hide__stuff">{day.push(message.timestamp?.toDate().getDay())}</div>
                                    {/* {setDay(message.timestamp?.toDate().getDay())} */}
                                </div>
                                
                            )
                        }

                    </p>  
                ))}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />

            </div>
        </div>
    )
}

export default Chat;
