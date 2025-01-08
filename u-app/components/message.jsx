import Image from 'next/image'
import classes from '../styles/ChatApp.module.css'
import img from '../public/assets/img.png'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

export default function Message({message}){
    const {user} = useSelector((state) => state.user)
    const {userCurrId, user: chat_user} = useSelector((state) => state.chat)

    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
    },[message])

    return (
     
        <div ref={ref} className={`${classes.message} ${message.senderId === userCurrId &&  classes.owner}`}>
            <div className={classes.messageInfo}>
                <p>{message.senderId === userCurrId ? user && user.username : chat_user && chat_user.displayName}</p>
            </div>
            <div className={classes.messageContent}>
                <p>{message.text}</p>
                {message.img && <Image src={message.img} alt='message-pic' />}
            </div>

        </div>
        )

} 