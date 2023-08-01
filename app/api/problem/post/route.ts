import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/questionModel";
import { NextRequest,NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const {title, description,tags,company,number,level} = reqBody

        const newQuestion = new Question({
            title,
            description,
            tags,
            company,
            number,
            level,
            slug : slugify(title,{lower:true})
        })

        const savedQuestion = await newQuestion.save();
    return NextResponse.json({
      message: "Question saved successfully",
      success: true,
      savedQuestion,
    });
    }catch(error:any){
       return  NextResponse.json({error:error.message},{status:500});
    }
}


connect()