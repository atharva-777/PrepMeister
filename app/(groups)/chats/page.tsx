"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Avatar from "react-avatar";
import { useSession } from "next-auth/react";
import ChatService from "@/app/services/chat.service";
import { io, Socket } from "socket.io-client";

type ChatMember = {
  _id: string;
  username?: string;
  email?: string;
};

type ChatMessage = {
  _id: string;
  content: string;
  from?: {
    _id?: string;
    username?: string;
    email?: string;
  };
  createTime?: string;
};

type Chat = {
  _id: string;
  name: string;
  creator?: ChatMember;
  members?: ChatMember[];
};

const Chats = () => {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUserId, setTypingUserId] = useState("");
  const [error, setError] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [lastJoinedChatId, setLastJoinedChatId] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const activeChatIdRef = useRef("");
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const userId = session?.user?.id || "";
  const activeChat = useMemo(
    () => chats.find((chat) => chat._id === activeChatId) || null,
    [chats, activeChatId]
  );

  const fetchChats = useCallback(async () => {
    if (!userId) return;
    try {
      setLoadingChats(true);
      setError("");
      const data = await ChatService.accessChats(userId);
      setChats(data?.chats || []);
      if (!activeChatId && data?.chats?.length) {
        setActiveChatId(data.chats[0]._id);
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to fetch chats");
    } finally {
      setLoadingChats(false);
    }
  }, [userId, activeChatId]);

  const fetchMessages = useCallback(async (chatId: string) => {
    if (!chatId) return;
    try {
      setLoadingMessages(true);
      const data = await ChatService.getMessages(chatId);
      setMessages(data?.messages || []);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to fetch messages");
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    fetchMessages(activeChatId);
  }, [activeChatId, fetchMessages]);

  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

  useEffect(() => {
    if (!userId) return;

    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";
    const socketClient = io(socketUrl, {
      transports: ["websocket", "polling"],
    });

    setSocket(socketClient);
    socketClient.emit("setup", { id: userId, _id: userId });

    socketClient.on("connected", () => {
      setSocketConnected(true);
    });

    socketClient.on("message received", (incomingMessage) => {
      const incomingChatId =
        incomingMessage?.chatId || incomingMessage?.chat?._id || incomingMessage?.chat;
      if (!incomingChatId || String(incomingChatId) !== String(activeChatIdRef.current)) {
        return;
      }
      setMessages((prev) => [...prev, incomingMessage]);
    });

    socketClient.on("typing", ({ chatId, userId: typerId }) => {
      if (String(chatId) !== String(activeChatIdRef.current)) return;
      if (String(typerId) === String(userId)) return;
      setIsTyping(true);
      setTypingUserId(typerId || "");
    });

    socketClient.on("stop typing", ({ chatId, userId: typerId }) => {
      if (String(chatId) !== String(activeChatIdRef.current)) return;
      if (String(typerId) === String(userId)) return;
      setIsTyping(false);
      setTypingUserId("");
    });

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socketClient.disconnect();
      setSocketConnected(false);
      setSocket(null);
    };
  }, [userId]);

  useEffect(() => {
    if (!socket || !activeChatId) return;
    if (lastJoinedChatId && lastJoinedChatId !== activeChatId) {
      socket.emit("leave chat", lastJoinedChatId);
    }
    socket.emit("join chat", activeChatId);
    setLastJoinedChatId(activeChatId);
  }, [socket, activeChatId, lastJoinedChatId]);

  const handleSend = async () => {
    if (!activeChatId || !userId || !messageInput.trim()) return;

    try {
      setError("");
      const data = await ChatService.sendMessage(messageInput.trim(), activeChatId, userId);
      if (!data?.success || !data?.message) {
        setError("Failed to send message");
        return;
      }
      setMessages((prev) => [...prev, data.message]);
      socket?.emit("new message", {
        ...data.message,
        chatId: activeChatId,
      });
      socket?.emit("stop typing", { chatId: activeChatId, userId });
      setMessageInput("");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to send message");
    }
  };

  const handleMessageInputChange = (value: string) => {
    setMessageInput(value);
    if (!socket || !activeChatId || !userId) return;

    socket.emit("typing", { chatId: activeChatId, userId });
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", { chatId: activeChatId, userId });
    }, 800);
  };

  return (
    <div className="pt-20 px-4 md:px-6 h-[calc(100vh-60px)]">
      <div className="h-full grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
        <aside className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Your Chats</h2>
          </div>
          <div className="h-[calc(100%-53px)] overflow-y-auto">
            {loadingChats ? (
              <p className="p-4 text-sm text-slate-500">Loading chats...</p>
            ) : chats.length === 0 ? (
              <p className="p-4 text-sm text-slate-500">No chats found. Create or join a group.</p>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => setActiveChatId(chat._id)}
                  className={`w-full text-left px-4 py-3 border-b border-slate-100 transition ${
                    activeChatId === chat._id ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <p className="font-medium text-slate-900 truncate">{chat.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {chat.members?.length || 0} members
                  </p>
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                {activeChat?.name || "Select a chat"}
              </h2>
              {activeChat && (
                <p className="text-xs text-slate-500">
                  {activeChat.members?.length || 0} members
                </p>
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                socketConnected ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {socketConnected ? "Live" : "Reconnecting..."}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {!activeChatId ? (
              <p className="text-sm text-slate-500">Pick a chat from the left panel.</p>
            ) : loadingMessages ? (
              <p className="text-sm text-slate-500">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-sm text-slate-500">No messages yet. Start the conversation.</p>
            ) : (
              messages.map((msg) => {
                const isOwn = msg?.from?._id && String(msg.from._id) === String(userId);
                const sender = msg?.from?.username || msg?.from?.email || "User";
                return (
                  <div
                    key={msg._id}
                    className={`max-w-[85%] rounded-xl px-3 py-2 ${
                      isOwn
                        ? "ml-auto bg-blue-600 text-white"
                        : "mr-auto bg-white border border-slate-200 text-slate-800"
                    }`}
                  >
                    {!isOwn && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar name={sender} size="18" round />
                        <span className="text-[11px] font-semibold">{sender}</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                );
              })
            )}
            {isTyping && (
              <p className="text-xs text-slate-500 italic">
                {typingUserId ? "Someone is typing..." : "Typing..."}
              </p>
            )}
          </div>

          <div className="p-3 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                value={messageInput}
                onChange={(e) => handleMessageInputChange(e.target.value)}
                placeholder={activeChatId ? "Type a message..." : "Select a chat to send messages"}
                disabled={!activeChatId}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
              />
              <button
                onClick={handleSend}
                disabled={!activeChatId || !messageInput.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                Send
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chats;
