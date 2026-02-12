import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, num } = reqBody;

    // Call backend API to update solved problems
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${backendUrl}/api/users/${email}/solved`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problemId: num }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "User not found" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(
      { message: "User updated successfully", data: result },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}