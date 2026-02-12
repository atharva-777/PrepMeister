import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Call backend API to get user info
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${backendUrl}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: response.status }
      );
    }

    const user = await response.json();
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 