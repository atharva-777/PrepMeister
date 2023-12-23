"use client";
import React, { useState } from "react";
import useWebSocket from "@/helper/useWebSocket";

const Chats = () => {
    const {messages,sendMessage,error} = useWebSocket();
    const [inputMessage,setInputMessage] = useState<string>("");

    console.log("messages , error ",{messages,error});

    if(error){
        return <div>Error : {error}</div>
    }

    return (
      <div className="p-24 bg-stone-600">
        You have not joined any chats yet.
        <br />
        Please join chats to see here!
        <div className="m-4 bg-red-400">
          <ul>
            Listing all previous messages : 
            {" "}
            {messages.map((message,ind) => (
              <li key={ind}>{message}</li>
            ))}{" "}
          </ul>

          <form
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage("");
            }}
          >
            <input
              type="text"
              name="message"
              onChange={(e) => {
                setInputMessage(e.target.value);
                console.log("Input msg ", inputMessage, e.target.value);
              }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
}

export default Chats;