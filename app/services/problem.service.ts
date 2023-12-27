import { headers } from "next/dist/client/components/headers";
import { api } from "../config/axios";
import axios from "axios";

class ProblemService {
  static async getSingleProblem(slug: String | any ) {
    const data = await api.post('/problems/getProblem',slug);
    return data.data;
  }
  static async getAllProblem(lim: number) {
    const res = await api.post("/problems/getAllProblems", lim);
    return res.data;
  }
  static async getAll(){
    const res = await api.post("/problems/getAllProblems",{lim:5});
  }
}

export default ProblemService;
