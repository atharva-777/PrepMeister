"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/navigation";
import "@/public/assets/prepmeisterlogo.png";
import Avatar from "react-avatar";
import Timer from "./Timer";
import { useSession } from "next-auth/react";

const problemPage = true;

  const Topbar = () => {
  const {data:session} = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {};

  return (
    <nav className="flex h-[60px] pt-24 w-full shrink-0 items-center px-5 relative  p-8 border overflow-hidden">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link href="/" className="h-[22px] flex-1">
          <h1 className="text-xl font-bold">PrepMeister</h1>
        </Link>

        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/problems"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {!user && (
            <Link href="/login">
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          )}
          {user && problemPage && <Timer />}
          {user && (
            <div className="cursor group relative pr-4">
              <Avatar
                className="rounded-full"
                size="40px"
                name={user.name || null || undefined}
                color={"green"}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Topbar;