import { NextResponse } from "next/server";


export  function GET (){
    console.log("logoout function called")
    try {
        const response= NextResponse.json({message:"logout is successfull",success:true})
        response.cookies.set("token","",{httpOnly:true})
        return response ;
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}