"use client";
import {createContext,useState } from 'react'
import React from 'react'

const UserContext = createContext({});

interface UserData {
  username?: string;
  email?: string;
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData >({username:'',email:''});
//   const add = (username:string, email:string) =>{
//     setUser({username:username,email:email});
//   }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export  {UserContext,UserProvider};