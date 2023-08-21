"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { TbUserCircle } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, setUser } = useContext<any>(UserContext);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <header className="fixed left-0 p-4 right-0 top-0 z-20 shadow-md bg-white">
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
            <button onClick={toggleProfileDropdown}>
              <TbUserCircle
                size={50}
                className="rounded-full p-2 bg-white border m-2 hover:bg-slate-200"
              />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 w-36 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-1">
                  <Link href={"/profile"}>
                    <li className="px-4 py-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-100">
                      <CgProfile size={20} />
                      <p>Profile</p>
                    </li>
                  </Link>
                  <li
                    // onClick={logout}
                    className="px-4 py-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-100"
                  >
                    <AiOutlineLogout size={20} />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
