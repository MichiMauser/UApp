
import classes from '../styles/ChatApp.module.css'
import Input from './input';
import Messages from './messages';
export default function Chat(){
  return (
    <div className={classes.chat}>
        <div className={classes.chatInfo}>
            <span>Stan</span>
        </div>
        <Messages />
        <Input/>
    </div>
  );
};
