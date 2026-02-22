"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import ChatService from "@/app/services/chat.service";
import Link from "next/link";

const CreateGroup = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatId, setChatId] = useState("");

  const onCreate = async () => {
    if (!session?.user?.id) {
      setError("Login required");
      return;
    }
    if (!name.trim()) {
      setError("Please enter a group name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await ChatService.createChat(name.trim(), session.user.id);
      if (!data?.success || !data?.chat?._id) {
        setError(data?.message || "Unable to create group");
        return;
      }
      setChatId(data.chat._id);
      setName("");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Unable to create group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-24 p-8 max-w-3xl mx-auto">
      <p className="text-slate-600 mb-6">Create your own chat sessions to interact with peer learners</p>
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Create New Chat Room</h2>
        <label className="block text-sm font-medium text-slate-700">
          Group Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Dynamic Programming Practice"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          onClick={onCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </div>

      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm text-slate-700">
          Group ID:
          <span className="ml-2 font-semibold text-slate-900">{chatId || "ID will appear after creation"}</span>
        </p>
        {chatId && (
          <Link href="/chats" className="inline-block mt-3 text-blue-700 font-medium hover:underline">
            Go to chats
          </Link>
        )}
      </div>
    </section>
  );
};

export default CreateGroup;
