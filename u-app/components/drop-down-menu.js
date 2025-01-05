'use client'
import Link from 'next/link'
import classes from '../styles/MainNavigation.module.css'
import {motion} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import {setLogout} from '../redux/userSlice'

export default function DropDownMenu(){
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user)
    console.log(user)

    return <motion.div className={classes.accountmenu} initial={{opacity:0, y:0}} animate={{opacity:1, y:20}} exit={{opacity:0, y:0}}>
        <Link href={`${user?.role === "Student" ? '/home/parking' : '/adminDashboard/parking'}`}>Parking reservations</Link>
        <Link href={`${user?.role === "Student" ? '/home' : '/adminDashboard'}`}>Conversations</Link>
        <Link href={`${user?.role === "Student" ? '/home/washing_machine' : '/adminDashboard'}`}>Washing machine</Link>
        <Link href={"/logout"} onClick={()=>{
                dispatch(setLogout())}}>
            Log Out
        </Link>
    </motion.div>
}