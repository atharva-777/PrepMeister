"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TbUserCircle } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
              PrepMeister
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/problems"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Problems
            </Link>
            <Link
              href="/discuss"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Discuss
            </Link>
            <Link
              href="/groups"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Groups
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative group">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <TbUserCircle size={32} className="text-gray-700" />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {user.name || user.email?.split("@")[0]}
                  </span>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <ul className="py-2">
                      <Link href="/profile" onClick={toggleProfileDropdown}>
                        <li className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-50 cursor-pointer transition">
                          <CgProfile size={18} />
                          <p>Profile</p>
                        </li>
                      </Link>
                      <li
                        onClick={() => {
                          signOut();
                          router.push("/");
                          setShowProfileDropdown(false);
                        }}
                        className="px-4 py-2 flex items-center space-x-2 text-red-600 hover:bg-red-50 cursor-pointer transition"
                      >
                        <AiOutlineLogout size={18} />
                        <p>Logout</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
