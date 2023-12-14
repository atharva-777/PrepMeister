import { api } from "../config/axios";

class AuthService {
  static async login(data: any) {
    const res = await api.post("/users/login", data);
    return res.data;
  }
  static async signup(data: any) {
    console.log("Requst Received")
    const res = await api.post("/users/signup", data);
    console.log("Requst done",res);
    return res.data;
  }
}

export default AuthService;
