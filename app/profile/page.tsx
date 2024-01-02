"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Avatar from "react-avatar";
import { signOut, useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  if(!user){
    router.push('/');
  }

  return (
    user && 
    <div>
      <div className="text-center flex flex-col items-center justify-center h-screen p-24">
        <div className="space-y-3">
          <h1 className="text-4xl m-4"> Welcome to Dashboard </h1>
          <h2>{!user ? "Nothing" : <Link href={`/`}>Go to Profile</Link>}</h2>
          <Avatar
            className="h-24 w-24 flex-none rounded-full bg-gray-50"
            size="40px"
            name={user?.name || "K"}
            color={"orange"}
          />
        </div>

        <div className="text-center m-8 bg-blue-200 max-w-2xl p-6 rounded-md mx-auto">
          <h3>User Details</h3>
          {user ? (
            <ul>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{session.expires}</li>
            </ul>
          ) : null}
        </div>

        <button
          className="p-3 m-4 bg-red-400 rounded hover:bg-red-500 hover:z-20"
          onClick={(e) => {
            signOut();
            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
