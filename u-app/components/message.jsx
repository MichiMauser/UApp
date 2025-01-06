import Image from 'next/image'
import classes from '../styles/ChatApp.module.css'
import img from '../public/assets/img.png'

export default function Message(){
    return (
        <div className={`${classes.message} ${classes.owner}`}>
            <div className={classes.messageInfo}>
                <p>Moga</p>
            </div>
            <div className={classes.messageContent}>
                <p>hello ma puka</p>
                <Image src={img} alt='message-pic' />
            </div>
        </div>)
} 