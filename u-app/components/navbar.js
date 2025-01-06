'use client'

import {IconButton} from '@mui/material'
import {Menu, Person, Search} from '@mui/icons-material'
import { grey, common } from '@mui/material/colors'
import classes from '../styles/MainNavigation.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import { useState } from 'react'
import DropDownMenu from './drop-down-menu'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.ico'

export default function Navbar(){
    
    const [showMenu, setShowMenu] = useState(false)
    
    const [search, setSearch] = useState('')
    

    function handleChange(event){
        setSearch(event.target.value)
    }

    return <>
    <div className={classes.navbarWrapper}>
    <div className={classes.navbar}>
        <Link href={'/home'}>
            <motion.div whileHover={{ scale: 1.05 }}>
                <Image className={classes.img} src={logo} alt="logo" />
            </motion.div>
        </Link>
        <div className={classes.options}>
            <motion.button className={classes.dropdown_menu} whileHover={{scale: 1.05}} onClick={() => {setShowMenu((prevState) => !prevState)}}>
                <Menu sx={{color: grey[800]}} />
                <Person sx={{color: grey[800]}} />
            </motion.button>
            <AnimatePresence>
            {showMenu && <DropDownMenu />}
            </AnimatePresence>
        </div>
    </div>
    </div>
    <hr/>
    </>
}