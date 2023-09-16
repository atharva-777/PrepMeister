import { api } from "../config/axios";

class ProblemService {
  static async getSingleProblem(slug: String) {
    const res = await api.post("/problem/getProblem", slug);
    return res.data;
  }
  static async getAllProblem(lim:number){
    const res = await api.post('/problem/get',lim)
    return res.data
  }
}

export default ProblemService;
