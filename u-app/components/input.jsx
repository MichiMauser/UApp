import classes from '../styles/ChatApp.module.css'
import img from '../public/assets/img.png'
import Image from 'next/image';

export default function Input(){
    return (
      <div className={classes.input}>
        <input type='text' placeholder='Write a message'/>
        <div className={classes.send}>
            <input type='file' style={{display:"none"}} id='file' />
            <label htmlFor='file'>
                <Image src={img} alt='attach-image'/>
            </label>
            <button>Send</button>
        </div>
      </div>
    );
  };
  