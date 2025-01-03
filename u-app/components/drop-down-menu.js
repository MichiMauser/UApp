'use client'
import Link from 'next/link'
import classes from '../styles/MainNavigation.module.css'
import {motion} from 'framer-motion'
export default function DropDownMenu(){

    return <motion.div className={classes.accountmenu} initial={{opacity:0, y:0}} animate={{opacity:1, y:20}} exit={{opacity:0, y:0}}>
        <Link href={'/home/parking'}>Parking reservations</Link>
        <Link href={'/home'}>Conversations</Link>
        <Link href={'/home/washing_machine'}>Washing machine</Link>
        <Link href={'/logout'}>Log Out</Link>
    </motion.div>
}