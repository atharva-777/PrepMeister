import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function useWebSocket() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [error, setError] = useState(null);

  const socket = io("http://localhost:4000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server!");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server!");
    });
    socket.on("error", (error) => {
        console.log("Error Occured ",error);
      setError(error);
    });
    socket.on("message", (message) => {
        console.log("msg ",messages);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket.connected) {
      socket.send(message);
    }
  };

  return{messages,sendMessage,error};

}

export default useWebSocket;
