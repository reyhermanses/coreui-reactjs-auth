import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'

const Logout = (e) => {

    e.preventToDefault()
    
    const nav = useNavigate()

    let data = localStorage.removeItem('authSession')

    const [isLogout, setLogout] = useState(data)
    
    if(isLogout === undefined){
        console.log('logout')
        nav('/login')
    }else{
        console.log('error logout')
        nav('/500')
    }

    return(
        <>logout</>
    )
}

export default Logout