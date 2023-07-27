import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function GET(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {perPage} = reqBody
    }
    catch(error:any){
        return NextResponse.json({error:error.messsage},{status:500})
    }
}
