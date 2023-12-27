import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function useWebSocket() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [error, setError] = useState(null);
// you can also use http://localhost:4000 | Backend URL
  const socket = io("ws://localhost:4000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server!",socket.id);
      socket.io.engine.on('upgrade',()=>{
        const upgradedTransport = socket.io.engine.transport.name;
      })
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
  }, [socket,messages]);

  const sendMessage = (message: string) => {
    if (socket.connected) {
      setMessages([message]);
      socket.send(message);
      socket.emit("message",message);
    }
  };

  return{messages,sendMessage,error};

}

export default useWebSocket;
