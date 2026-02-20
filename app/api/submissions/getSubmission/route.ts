import { NextRequest, NextResponse } from "next/server";

const SUBMISSION_ENDPOINTS = [
  "/api/v1/submissions/getSubmission",
  "/api/submissions/getSubmission",
];

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const token =
      typeof reqBody === "string" ? reqBody : reqBody?.token || reqBody?.submissionToken;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Submission token is required" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const payload = { token, submissionToken: token };
    let lastError: any = null;
    let lastStatus = 502;

    for (const endpoint of SUBMISSION_ENDPOINTS) {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      }

      const parsedError = await response.json().catch(() => null);
      if (response.status !== 404) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to fetch submission status",
            backendError: parsedError,
          },
          { status: response.status }
        );
      }

      lastStatus = response.status;
      lastError = parsedError;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch submission status",
        backendError: lastError,
      },
      { status: lastStatus }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
