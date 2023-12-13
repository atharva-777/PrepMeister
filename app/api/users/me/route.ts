import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest){
    try{
        const userID = await getDataFromToken(request);
        const user = await User.findOne({_id: userID}).select("-password -isAdmin")
        return NextResponse.json({message:'User found',data:user})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:400})
    }
} 