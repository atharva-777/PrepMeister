import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/questionModel";

connect();

export async function POST(req: NextRequest) {
    try{
        console.log("request at end")
        const reqBody = await req.json();
        const {slug} = reqBody;
        const problem = await Question.findOne({slug})

        if(!problem){
            return NextResponse.json({message:"Problem not found",status:false},{status:400});
        }
        return NextResponse.json({problem},{status:200})

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}