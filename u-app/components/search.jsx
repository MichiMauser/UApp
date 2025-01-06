import { useState } from 'react';
import classes from '../styles/ChatApp.module.css'

export default function Search(){
    const [username, setUsername] = useState("");

    const handleKey = (e) => {
        
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
        </div>)
} 