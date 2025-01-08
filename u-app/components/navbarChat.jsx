import { useRouter } from 'next/router'
import classes from '../styles/ChatApp.module.css'
import { useSelector } from 'react-redux'
import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
const Navbar = () => {
   
    const router = useRouter()
    const { user } = useSelector((state) => state.user)
    
    console.log(user)
  return (
    <div className={classes.navbar}>
      <span className={classes.logo}>UT-Chat</span>
      <div className={classes.user}>
        <span>{user && user.username}</span>
        <button onClick={()=>router.push('..')}>Back</button>
      </div>
    </div>
  )
}

export default Navbar