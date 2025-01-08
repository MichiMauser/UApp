import { useState } from 'react';
import classes from '../styles/ChatApp.module.css'
import { collection, query, where, getDocs, serverTimestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../lib/firebase';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrUser } from '../redux/chatSlice';
export default function Search(){
    const [username, setUsername] = useState("");
    const [User, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { user } = useSelector((state) => state.user)
    const {userCurrId} = useSelector((state) => state.chat)
    
    const dispatch = useDispatch()
    const handleSearch= async() => {
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username))

        try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setUser(doc.data())
    });
    }catch(err){
        setErr(true);
    }
};

    const handleKey = (e) => {
        e.code == "Enter" &&  handleSearch();
    };
    
   
    const handleSelect = async() => {
        const combinedId =  User.uid > userCurrId ? userCurrId + User.uid: User.uid + userCurrId
        try{
            const res = await getDoc(doc(db, "chats", combinedId));
            if(!res.exists()){
                
                await setDoc(doc(db, "chats", combinedId), {messages:[]})

                await updateDoc(doc(db, "userChats", userCurrId),{
                    [combinedId+ ".userInfo"]:{
                        uid: User.uid,
                        displayName: User.displayName,
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userChats", User.uid),{
                    [combinedId+ ".userInfo"]:{
                        uid: userCurrId,
                        displayName: user.username,
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
                
            }
        }catch(err){
            console.log(err)
        }
        //create user chats

        setUser(null);
        setUsername("");
    };
    return(
        <div className={classes.search}>
            <div className={classes.searchForm}>     
                <input type="text" placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User not found</span>}
            {User &&<div className={classes.userChat} onClick= {handleSelect}>
            <div className={classes.userChatInfo}>
                <span>
                    {User?.displayName}
                </span>
                
            </div>
        </div>}
        </div>);
 };