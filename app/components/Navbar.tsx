"use client";
import React,{useState} from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { TbUserCircle } from "react-icons/tb";

const Navbar = () => {
  const { user, setUser } = useContext<any>(UserContext);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

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
            <button onClick={toggleProfileDropdown}>
              <TbUserCircle width={100} height={100} />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-1">
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <Link href={'/profile'}>
                    Profile
                    </Link>
                  </li>
                  <li
                    // onClick={logout}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    Logout
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
