"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, setUser } = useContext<any>(UserContext);
  console.log(user);
  return (
    <header className="w-full mx-auto p-4 sm:px-20 fixed top-0 z-50 shadow border-b-2">
      <div className="justify-between md:items-center md:flex">
        <h1 className="text-4xl">PrepMeister</h1>
        {user ? (
          <div>
            <p>name : {!user.username ? "no" : user.username}</p>
            <p>email : {user.email ? user.email : "nope"} </p>
          </div>
        ) : (
          "no"
        )}
      </div>
    </header>
  );
};

export default Navbar;
