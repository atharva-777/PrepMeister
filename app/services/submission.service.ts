class SubmissionService {
  static async createSubmission(data: any) {
    const response = await fetch("/api/submissions/postSubmission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async getSubmission(token: string) {
    const response = await fetch("/api/submissions/getSubmission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return response.json();
  }
}

export default SubmissionService;
