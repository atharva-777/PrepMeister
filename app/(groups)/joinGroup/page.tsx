"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import ChatService from "@/app/services/chat.service";

const JoinGroup = () => {
  const { data: session } = useSession();
  const [chatId, setChatId] = useState("");
  const [chatName, setChatName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleJoin = async (mode: "id" | "name") => {
    if (!session?.user?.id) {
      setError("Login required");
      return;
    }

    const payload =
      mode === "id"
        ? { userId: session.user.id, chatId: chatId.trim() }
        : { userId: session.user.id, name: chatName.trim() };

    if ((mode === "id" && !payload.chatId) || (mode === "name" && !payload.name)) {
      setError(mode === "id" ? "Enter a valid chat ID" : "Enter a valid chat name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      const data = await ChatService.joinChat(payload);
      if (!data?.success) {
        setError(data?.message || "Unable to join chat");
        return;
      }
      setMessage(data.message || "Joined chat successfully");
      setChatId("");
      setChatName("");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Unable to join chat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-24 px-6 pb-8 max-w-4xl mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">Join Chat Rooms</h1>

      <div className="space-y-6">
        <div className="border border-slate-300 rounded-xl p-6 text-center bg-white shadow-sm">
          <h2 className="text-xl mb-3 font-semibold">Join Using Chat ID</h2>
          <input
            type="text"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="w-full max-w-md p-2.5 border border-slate-300 rounded-lg"
            placeholder="Paste chat ID"
          />
          <button
            onClick={() => handleJoin("id")}
            disabled={loading}
            className="ml-3 mt-3 sm:mt-0 p-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
          >
            {loading ? "Joining..." : "Join Chat"}
          </button>
        </div>

        <div className="text-center text-slate-500 font-semibold">OR</div>

        <div className="border border-slate-300 rounded-xl p-6 text-center bg-white shadow-sm">
          <h2 className="text-xl mb-3 font-semibold">Join Using Group Name</h2>
          <input
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="w-full max-w-md p-2.5 border border-slate-300 rounded-lg"
            placeholder="Enter group name"
          />
          <button
            onClick={() => handleJoin("name")}
            disabled={loading}
            className="ml-3 mt-3 sm:mt-0 p-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? "Joining..." : "Join Chat"}
          </button>
        </div>
      </div>

      {message && <p className="mt-6 text-center text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-6 text-center text-red-600 font-medium">{error}</p>}
    </section>
  );
};

export default JoinGroup;
