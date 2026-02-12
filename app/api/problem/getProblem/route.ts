import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required", success: false },
        { status: 400 }
      );
    }

    // Call backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${backendUrl}/api/problems/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Problem not found", success: false },
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