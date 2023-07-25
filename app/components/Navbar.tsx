"use client";
import React from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'


const Navbar = () => {
    const {user,setUser} = useContext<any>(UserContext)
    console.log(user)
  return (
    <div>
        <div className='flex flex-row p-4'>
            <h1 className='text-4xl'>PrepMeister</h1>
            name : {user.username}
            email : {user.email}
            {/* <button onClick={()=>{setUser({ username: "atharva", email: "abc@gmail.com" });}}>set</button> */}
        </div>
    </div>
  )
}

export default Navbar