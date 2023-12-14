"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div>
      <div className="text-center place-items-center place-content-center justify-center mt-48">
        <div>
          <h1 className="text-4xl m-4"> Welcome to Profile </h1>
          <h2>
            {!user ? (
              "Nothing"
            ) : (
              <Link href={`/`}>Go to Profile</Link>
            )}
          </h2>
        </div>

        <div className="text-center m-8 bg-blue-200 max-w-2xl p-4 rounded-full mx-auto">
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
          onClick={(e) => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
