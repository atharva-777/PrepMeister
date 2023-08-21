import { api } from "../config/axios";

class TestService { 
    static async  getProblems<T>(lim:number){
        const res = await api.post<T>("/problem/get",lim)
        return res.data
    }
}

export default TestService;