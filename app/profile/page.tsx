"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { get } from "http";

const UserProfile = () => {
  const router = useRouter()
  const [data,setData] = useState({
    _id:"",
    username:"",
    email:""
  });
  const Logout =async () => {
    try{
      await axios.get('/api/users/logout')
      router.push('/')
    }catch(error:any){
      console.log(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    setData(res.data.data);
  }

  useEffect(()=>{
    getUserDetails();
  },[])

  return (
    <div className="text-center place-items-center place-content-center justify-center mt-48">
      <div>
        <h1 className="text-4xl m-4"> Welcome to Profile </h1>
        <h2>
          {!data ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data._id}`}>Go to Profile</Link>
          )}
        </h2>
        {/* <button onClick={getUserDetails}>UserData</button> */}
      </div>

      <div className="text-center m-8 bg-blue-200 max-w-2xl p-4 rounded-full mx-auto">
        <h3>User Details</h3>
        <ul>
        <li>{data._id}</li>
        <li>{data.username}</li>
        <li>{data.email}</li>
        </ul>
      </div>

      <button
        className="p-3 m-4 bg-red-400 rounded hover:bg-red-500 hover:z-20"
        onClick={(e) => Logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
