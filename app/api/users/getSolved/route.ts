import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const {email}  = reqBody
        console.log(email)
        const data = await User.find({email}).select("-password -isVerified -isAdmin -__v")
        return NextResponse.json({data},{status:200})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}