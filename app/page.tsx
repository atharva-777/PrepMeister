"use client";
import Navbar from "./components/Navbar";
import Login from "./login/page";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar/>
    <div className="justify-center text-lg items-center text-center m-48">
      <h1 className="m-4 text-3xl font-bold"> Home </h1>
      <div className="text-center flex flex-col space-y-4">
        <Link href={"/login"}>Already a user ? Login</Link>
        <Link href={"/signup"}>New User ? Signup</Link>
      </div>
    </div>
    </div>
  );
}
