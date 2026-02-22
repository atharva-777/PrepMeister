import { api } from "../config/axios";

class ChatService {
  static async accessChats(userId: string) {
    const res = await api.post("/chats/accessChat", { userId });
    return res.data;
  }

  static async createChat(name: string, userId: string) {
    const res = await api.post("/chats/createChat", { name, userId });
    return res.data;
  }

  static async joinChat(params: { userId: string; chatId?: string; name?: string }) {
    const res = await api.post("/chats/joinChat", params);
    return res.data;
  }

  static async sendMessage(content: string, chatId: string, userId: string) {
    const res = await api.post("/messages/sendMessage", { content, chatId, userId });
    return res.data;
  }

  static async getMessages(chatId: string) {
    const res = await api.get(`/messages/getMessages/${chatId}`);
    return res.data;
  }
}

export default ChatService;
