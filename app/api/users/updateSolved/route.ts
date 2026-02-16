import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, num } = reqBody;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }

    if (num === undefined || num === null) {
      return NextResponse.json(
        { message: "Problem ID is required", success: false },
        { status: 400 }
      );
    }

    // Call backend API to update solved problems
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${backendUrl}/api/users/${encodeURIComponent(email)}/solved`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problemId: num }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          message: errorData.error || "Failed to update solved problems", 
          success: false 
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(
      { message: "User updated successfully", data: result, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update solved problems error:", error);
    return NextResponse.json({ 
      error: error.message || "Internal server error",
      success: false 
    }, { status: 500 });
  }
}