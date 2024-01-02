"use client";
import React, { useState } from "react";
import useWebSocket from "@/helper/useWebSocket";
import Avatar from "react-avatar";

const chats = [
  {
    name: "Dynamic Programming Questions asked in FAANG",
    email: "jadhavatharva499@gmail.com",
    lastSeen: "yesterday",
    role: "admin",
    imageUrl: "",
  },
  {
    name: "Upsolving Contest Problems",
    email: "niks@gmail.com",
    lastSeen: "today",
    role: "member",
    imageUrl: "",
  },
  {
    name: "Flipkart Grid 5.0 OA Questions",
    email: "adi09x@gmail.com",
    lastSeen: "4Hrs Ago",
    role: "member",
    imageUrl: "",
  },
];

const Chats = () => {
  // const { messages, sendMessage, error } = useWebSocket();
  const [inputMessage, setInputMessage] = useState<string>("");

  // if (error) {
  //   return <div>Error : {error}</div>;
  // }

  return (
    <div className="p-24">
      <ul role="list" className="divide-y divide-gray-100">
        {chats.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Avatar
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                size="40px"
                name={person.name}
                color={"orange"}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last Message{" "}
                  <time dateTime={person.lastSeen}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
