"use client";
import React,{useEffect,useState} from 'react'
import { api } from '../config/axios'
import axios from 'axios'

interface User{
    name:string;
    roll: number;
}

const Explore = () => {

    const [userInfo,setUserInfo] = useState<User>();

    const call = async () => {
        const dataFromBackend = await axios.get(
            "http://localhost:4000/api/v1/jsonData"
            );  
            setUserInfo(dataFromBackend.data);
    }

    useEffect(() => {
    
      return () => {
        call();
      }
    }, [])
    

  return (
    <div>
        <button onClick={()=>{call()}}>Click me</button>
        <h1>User Details</h1>
        <h3>Hello {userInfo?.name}</h3>
        <h4>{userInfo?.roll}</h4>
    </div>
  )
}

export default Explore