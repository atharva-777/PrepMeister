"use client";
import React, { useState } from "react";
import useWebSocket from "@/helper/useWebSocket";

const Chats = () => {
  const { messages, sendMessage, error } = useWebSocket();
  const [inputMessage, setInputMessage] = useState<string>("");

  console.log("messages , error ", { messages, error });

  if (error) {
    return <div>Error : {error}</div>;
  }

  return (
    <div className="p-24">
      You have not joined any chats yet.
      <br />
      Please join chats to see here!
      <div className="m-4 p-2 space-y-6">
        <div className="p-3">
          <ul>
            Listing all previous messages :{" "}
            {messages.map((message, ind) => (
              <li key={ind}>{message}</li>
            ))}{" "}
          </ul>
        </div>

        <form
          action=""
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(inputMessage);
          }}
        >
          <input
            type="text"
            name="message"
            className="border border-black/25 m-2"
            onChange={(e) => {
              setInputMessage(e.target.value);
              // console.log("Input msg ", inputMessage, e.target.value);
            }}
          />
          <button
            type="submit"
            className="rounded-md bg-green-400 p-2"
            onClick={(e) => {
              e.preventDefault();
              console.log("input ", inputMessage);
              sendMessage(inputMessage);
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
