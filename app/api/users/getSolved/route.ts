import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }

    // Call backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${backendUrl}/api/users/${encodeURIComponent(email)}/solved`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          message: errorData.error || "Failed to fetch solved problems", 
          success: false 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    // Backend returns { solved: [...] }, wrap it in record array format expected by frontend
    return NextResponse.json({ 
      record: [{ solved: data.solved || [] }] 
    }, { status: 200 });
  } catch (error: any) {
    console.error("Get solved problems error:", error);
    return NextResponse.json({ 
      error: error.message || "Internal server error",
      success: false 
    }, { status: 500 });
  }
}