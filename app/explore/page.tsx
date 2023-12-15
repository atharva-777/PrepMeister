"use client";
import React from 'react'
import { api } from '../config/axios'
import axios from 'axios'
import { useSession } from 'next-auth/react';

const Explore = () => {

  const {data:session} = useSession();
  const user = session?.user;


    const call = async () => {
        const dataFromBackend = await axios.post(
            "http://localhost:4000/api/v1/problems/getProblem",
            {slug:"two-sum"}
            );  
            console.log(dataFromBackend.data)
    }
    

  return (
    <div className='m-64'>
        <button onClick={()=>{call()}}>Click me</button>
        {user && <div className='m-12 bg-green-400 p-12 border rounded-full'>
          <ul>
            <li>{user.email}</li>
            <li>{user.name}</li>
            <li>{session.expires}</li>
          </ul>
          </div>}

          {!user && <div>
            <li className='m-12'>User not logged in</li>
            </div>}
        
    </div>
  )
}

export default Explore