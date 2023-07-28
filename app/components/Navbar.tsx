"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { TbUserCircle } from "react-icons/tb";

const Navbar = () => {
  const { user, setUser } = useContext<any>(UserContext);
  return (
    <header className="w-full mx-auto p-4 sm:px-20 fixed top-0 z-50 shadow border-b-2">
      <div className="justify-between md:items-center md:flex">
        <h1 className="text-4xl">
          <Link href={"/"}>PrepMeister</Link>
        </h1>
        <div>
          <Link href={"/problems"}>Problems</Link>
        </div>
        {/* <div>Problems</div> */}
        <div>Discussion</div>
        <div>Groups</div>

        {user && (
          <div className="cursor-pointer group relative" id="pr">
            <TbUserCircle width={100} height={100} />
            
            <div
              className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{user.username}</p>
              <p>{user.email}</p>
              <Link href={"/profile"}>
                
              <p>Go to Profile</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
