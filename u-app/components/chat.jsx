
import { useSelector } from 'react-redux';
import classes from '../styles/ChatApp.module.css'
import Input from './input';
import Messages from './messages';

export default function Chat(){
  const {user} = useSelector((state) => state.chat)


  


  return (
    <div className={classes.chat}>
        <div className={classes.chatInfo}>
            <span>{user?.displayName}</span>
        </div>
        <Messages />
        <Input/>
    </div>
  );
};
