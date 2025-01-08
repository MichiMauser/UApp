import classes from '../styles/ChatApp.module.css'
import image from '../public/assets/img.png'
import Image from 'next/image';
import { use, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useSelector } from 'react-redux';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
export default function Input(){
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const {user} = useSelector((state) => state.user)
  const {userCurrId, user: chat_user, chatId} = useSelector((state) => state.chat)

  const handleSend = async ()=>{
      if(img){
        const storageRef = ref(storage, uuid())
        const uploadTask = uploadBytesResumable(storageRef, img)
        uploadTask.on(
          (error) => {
            console.log(error)
          },
          ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: userCurrId,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
            
        );
      }else {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: userCurrId,
            date: Timestamp.now(),
          }),
        });
      }
  

    await updateDoc(doc(db, "userChats", userCurrId), {
    [chatId + ".lastMessage"]: {
      text,
    },
    [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chat_user.uid), {
    [chatId + ".lastMessage"]: {
      text,
    },
    [chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className={classes.input}>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />
      <div className= {classes.send}>
        
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor='file'>
          <Image src={image} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
  };
  