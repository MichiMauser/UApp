import { useSelector } from 'react-redux'
import classes from '../styles/ChatApp.module.css'
import Message from './message'
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Messages(){
    const [messages, setMessages] = useState(null);
    const {chatId} = useSelector((state) => state.chat)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () =>{
            unSub
        }
        
    }, [chatId])
    
    return (
        <div className={classes.messages}>
            {messages?.map(m =>(
                <Message message = {m} key = {m.id} />
            ))}
        </div>)
} 