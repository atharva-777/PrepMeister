import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const {email}  = reqBody
        // const data = await User.find({email}).select("-password -isVerified -isAdmin -__v")
        const record = await User.find({email},{"solved":1,"_id":0}).sort('solved')
        record.sort()
        return NextResponse.json({record},{status:200})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}