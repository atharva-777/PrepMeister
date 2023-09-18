"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { UserContext } from "../context/UserProvider";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const user = useSession();

  const router = useRouter();
  // const { user, setUser } = useContext<any>(UserContext);
  // const [data, setData] = useState({
  //   _id: "",
  //   username: "",
  //   email: "",
  // });
  // const Logout = async () => {
  //   try {
  //     setUser(null);
  //     await axios.get("/api/users/logout");
  //     router.push("/");
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   setData(res.data.data);
  //   setUser({
  //     id: res.data.data._id,
  //     username: res.data.data.username,
  //     email: res.data.data.email,
  //   });
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  return (
    <div>
      <Navbar />
      {/* <div className="text-center place-items-center place-content-center justify-center mt-48">
        <div>
          <h1 className="text-4xl m-4"> Welcome to Profile </h1>
          <h2>
            {!user ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data._id}`}>Go to Profile</Link>
            )}
          </h2>
        </div>

        <div className="text-center m-8 bg-blue-200 max-w-2xl p-4 rounded-full mx-auto">
          <h3>User Details</h3>
          {user ? (
            <ul>
              <li>{user.id}</li>
              <li>{user.username}</li>
              <li>{user.email}</li>
            </ul>
          ) : null}
        </div>

        <button
          className="p-3 m-4 bg-red-400 rounded hover:bg-red-500 hover:z-20"
          onClick={(e) => Logout()}
        >
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default UserProfile;
