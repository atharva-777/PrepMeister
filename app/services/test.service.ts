import { api } from "../config/axios";

class TestService { 
    static async  getProblems<T>(lim:number){
        // this api will not support as all routes are shifted to backend
        const res = await api.post<T>("/problem/get",lim)
        return res.data
    }
}

export default TestService;