import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { title, description, tags, company, number, level, examples } =
      reqBody;

    const newQuestion = {
      title,
      description,
      tags,
      company,
      number,
      level,
      slug: slugify(title, { lower: true }),
      examples: examples,
    };

    // Call backend API instead of accessing database directly
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${backendUrl}/api/problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to save problem", success: false },
        { status: 400 }
      );
    }

    const savedQuestion = await response.json();
    return NextResponse.json({
      message: "Question saved successfully",
      success: true,
      savedQuestion,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}