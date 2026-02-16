import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const limit = request.nextUrl.searchParams.get("limit") || "50";

    // Call backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${backendUrl}/api/v1/problems?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch problems", success: false },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error", success: false },
      { status: 500 }
    );
  }
}
