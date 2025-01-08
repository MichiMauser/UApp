import { useEffect, useState } from 'react';
import classes from '../styles/ChatApp.module.css'
import { collection, doc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../redux/chatSlice';



export const getCurrentUserUid = async (user) => {
  try {
    let returnCurrId;
    const q = query(
      collection(db, "users"),
      where("displayName", "==", user.username)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      returnCurrId = doc.data().uid;
    });
    return returnCurrId;
  } catch (err) {
    console.error("Error fetching user UID:", err);
    setErr(true);
  }
};



export default function Chats(){

  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState(null); // Manage userData with state
  const dispatch = useDispatch()
  const {userCurrId} = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  

  useEffect(() => {
      const fetchChats = () => {
      console.log(userCurrId)
      const unsub = onSnapshot(doc(db, "userChats", userCurrId), (doc) => {
        console.log("Snapshot data:", doc.data());
        setChats(doc.data() || []); 
      });

      return unsub; 
    };

    const unsubscribe = fetchChats();

    return () => unsubscribe(); 
  }, [userCurrId]); 


  const handleSelect = (u) => {
    dispatch(
      setChat({
        user: u
      })
    )
  }


    console.log(Object.entries(chats))
    return (
      <div className={classes.chats}>
        {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
          <div className={classes.userChat} key={chat[0]} onClick = {() => handleSelect(chat[1].userInfo)}>
            <div className={classes.userChatInfo}>
              <span>{chat[1].userInfo.displayName}</span>
              <p>
                {chat[1]?.lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
}
  