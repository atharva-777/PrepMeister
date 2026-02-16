import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Call backend API for login
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    console.log("Here present ",backendUrl, email, password)
    const response = await fetch(`${backendUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || "Login failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { message: "logged in", success: true, user: data.user },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
