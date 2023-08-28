"use client";
import axios from 'axios';
import {createContext,useState } from 'react'
import React from 'react'

const UserContext = createContext({});

interface UserData {
  id?: string;
  username?: string;
  email?: string;
}



const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData| null >(null);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setUser({
      id: res.data.data._id,
      username: res.data.data.username,
      email: res.data.data.email,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser,getUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export  {UserContext,UserProvider};