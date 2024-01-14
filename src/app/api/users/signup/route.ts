import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect();


export async function POST (request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,password, email} = reqBody;
        console.log(email)
        
       const user =  await User.findOne({email})
       console.log(user)
       if (user){
        return NextResponse.json({error:"user alredy exists"},{status:400})
       }

       //hash the password 
       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password,salt)

       //saving the user in database
       const newUser= new User ({
        username,
        email,
        password:hashedPassword,
       })

       const savedUser = await newUser.save()
       console.log(savedUser)
       return NextResponse.json({
        message:"user created successfully",
        savedUser:savedUser,
       },{status:201})


    } catch (error:any) {
        return NextResponse.json({error:error},{status:500});
    }
}