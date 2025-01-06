import classes from '../styles/ChatApp.module.css'

export default function Chats(){
    return (
      <div className={classes.chats}>
        <div className={classes.userChat}>
            <div className={classes.userChatInfo}>
                <span>Stan</span>
                <p>Salut</p>
            </div>
        </div>
      </div>
    );
  };
  