import { api } from "../config/axios";

class ProblemService {
  static async getSingleProblem(slug: string) {
    const response = await fetch(`/api/problem/getProblem?slug=${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  static async getAllProblems(limit: number = 50) {
    const response = await fetch(`/api/problem/get?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
}

export default ProblemService;
