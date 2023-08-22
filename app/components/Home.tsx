import React from "react";
import Link from "next/link";

export default function HomeUI() {
  return (
      <div className="h-screen flex flex-col justify-center text-lg items-center text-center">
        <div className="border border-spacing-2 p-24 hover:shadow-stone-700 shadow">

        <h1 className="text-3xl font-bold m-4"> Home </h1>
        <div className="text-center flex flex-col space-y-4">
          <Link href={"/login"}>Already a user ? Login</Link>
          <Link href={"/signup"}>New User ? Signup</Link>
        </div>
        </div>
      </div>
  );
}
