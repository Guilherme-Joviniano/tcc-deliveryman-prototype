import { useState } from 'react';

import styles from './style.module.css'

interface IUser {
    name: string,
    picture_uri: string
}

export const Navbar =  () => {
    const [user, _] = useState<IUser>(JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user") : ""))
    
    return (
        <div className={styles["navbar"]}>
            <img className={styles["profile-image"]} src={user.picture_uri} />
            <div className={styles['name']}>{user.name}</div>
        </div>
    ) 
}