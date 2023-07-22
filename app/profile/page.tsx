"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserProfile = () => {
  const router = useRouter()
  const Logout =async () => {
    try{
      await axios.get('/api/users/logout')
      router.push('/')
    }catch(error:any){
      console.log(error.message)
    }
  }
  return (
    <div className="text-center place-items-center place-content-center justify-center mt-48">
      <div>
        <h1 className="text-4xl m-4"> Welcome to Profile </h1>
      </div>
      <button className="p-3 m-4 bg-red-400 rounded hover:bg-red-500 hover:z-20"
        onClick={(e)=>Logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
