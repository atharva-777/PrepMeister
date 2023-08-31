import { api } from "../config/axios";

class Auth{
    static async authenticate(email:string, password:string){
        return JSON.stringify({
            user:"Atharva",
            token: "sd"
        })
    }
}

export default Auth;