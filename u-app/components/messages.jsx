import classes from '../styles/ChatApp.module.css'
import Message from './message'

export default function Messages(){
    return (
        <div className={classes.messages}>
            <Message />
            <Message />
            <Message />
            <Message />
        </div>)
} 