import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connect();

export async function POST (request:NextRequest){

    const reqBody = await  request.json()
    const {email,password} = reqBody
   try {
       //check if user exists or not 
    const user = await  User.findOne({email})
    if (!user){
        return NextResponse.json({error:"user not found"})
    }
 
    //validate the Password
    const validPassword = await bcryptjs.compare(password,user.password)
    
    if(!validPassword){
      return  NextResponse.json({error:"password is not correct "})
    }

    // Create a token Data
    const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email
    }
    
    // Create a token 
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

    //send cookie
    const response = NextResponse.json({
        message:"Login successfull",
        success:true
    })
    
    response.cookies.set("token",token,{httpOnly:true})

    return response;



   } catch (error:any) {
    return NextResponse.json({error:error})
    
   } 
   
}