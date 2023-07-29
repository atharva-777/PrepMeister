import { connect } from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json();
        const {email,num} = reqBody
        const user = await User.findOne({email:email})
        if(!user){
            return NextResponse.json({message:'User not found'},{status:400})
        }
        const result = await User.updateOne({email:email},{$push:{solved:num}})
        return NextResponse.json({message:'User updated successfully',data:result},{status:200})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}