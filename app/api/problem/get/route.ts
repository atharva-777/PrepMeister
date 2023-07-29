import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function POST(request: NextRequest) {
  try {
    // return NextResponse.json({message:'Request successful',success:true},{status:200});
    // const data = await Question.find()
    // const target = JSON.stringify(data)
    const reqBody = await request.json();
    const { lim } = reqBody;
    const data = await Question.find({}).limit(lim);
    return NextResponse.json({
      message: "Success",
      success: true,
      // users,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  }
}
