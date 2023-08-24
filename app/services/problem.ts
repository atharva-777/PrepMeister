import { api } from "../config/axios";

class ProblemService {
  static async getSingleProblem(slug: String) {
    console.log(slug)
    const res = await api.post("/problem/getProblem", slug);
    console.log("res  ");
    return res.data;
  }
  static async getAllProblem(lim:number){
    const res = await api.post('/problem/get',lim)
    return res.data
  }
}

export default ProblemService;
