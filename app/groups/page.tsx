import React from "react";
import Link from "next/link";

const Groups = () => {
  return (
    <div className="pt-24">
      <div className="grid grid-cols-3 space-x-4 space-y-4 mx-6 my-4">
        <div className="bg-blue-300 p-10 rounded-lg hover:bg-blue-400/90 hover:-translate-y-1 transition ease-in-out duration-100 hover:cursor-pointer">
          <Link href={"/createGroup"}>
            <h1 className="text-xl text-center font-bold mb-3">
              Make New Chat
            </h1>
            <div>
              <p>
                PrepMeister provides you feature to form peer learning groups
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-violet-300 p-10 rounded-full hover:bg-violet-400/90 hover:-translate-y-1 transition ease-in-out duration-100 hover:cursor-pointer">
          <Link href={"/joinGroup"}>
            <h1 className="text-xl text-center font-bold mb-3">Join Chat</h1>
          </Link>
        </div>
        <div className="bg-orange-300 p-10 rounded-full hover:bg-orange-400/90 hover:-translate-y-1 transition ease-in-out duration-100 hover:cursor-pointer">
          <Link href={"/chats"}>
            <h1 className="text-xl text-center font-bold mb-3">
              View your chats
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Groups;
