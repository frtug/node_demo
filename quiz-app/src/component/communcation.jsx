import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

const socket = io('http://localhost:5000')

export default function Communication() {
    const [message,setMessage] = useState("");
    const [msgs,setMsgs] = useState([]);

    useEffect(()=>{
        socket.on("message",(data)=>{
            console.log("data",data)
            setMsgs((prev)=>[...prev,data])
        });
        return ()=> socket.off('message') // unmounting the component
    },[])

    function sendMessage(){
        // sending the mesage here
        console.log(message)
        socket.emit('message',message);
        setMessage('')
    }
  return (
    <div>
        {/* display messages user has send */}
        <ul>
        {msgs.map((msg,i)=> 
            <li key={i} style={{color:"red"}}>{msg}</li>
        )}
        </ul>
        <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter the message'/>
        <button onClick={sendMessage}>Send</button>
    </div>
  )
}
