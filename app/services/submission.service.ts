import { api } from "../config/axios";

class SubmissionService {
  static async createSubmission(data: any) {
    const res = await api.post("/submissions/postSubmission", data);
    return res.data;
  }

  static async getSubmission(token: string) {
    const res = await api.post("/submissions/getSubmission", token);
    return res.data;
  }
}

export default SubmissionService;