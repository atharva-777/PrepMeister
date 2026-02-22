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
    const endpoints = ["/api/v1/problems", "/api/problems"];
    let savedQuestion = null;
    let statusCode = 400;

    for (const endpoint of endpoints) {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        savedQuestion = await response.json();
        statusCode = 200;
        break;
      }

      statusCode = response.status;
    }

    if (!savedQuestion) {
      return NextResponse.json(
        { message: "Failed to save problem", success: false },
        { status: statusCode }
      );
    }

    return NextResponse.json({
      message: "Question saved successfully",
      success: true,
      savedQuestion,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
