import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/model/User";

export async function POST (request : NextRequest) {
    try {
        const {name , email , password, role} = await request.json();
       
       
        if (!name || !email || !password) {
            return NextResponse.json({
                message : "All fields are required"
            }, { status: 400 })
        }
        
        await connectDB();

        const existingUser = await User.find({email})
        if (existingUser) {
            return NextResponse.json({
                message : "User already exists"
            }, { status: 400 })
        }

        const user = new User({
            name,
            email,
            password, 
            role : role || "Visitor" 
        })

        return NextResponse.json({
            message : "User registered successfully",
            user : {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            }
        }, { status: 201 })
        
       
    } catch (error : any) {
        return NextResponse.json({
            message : error.message || "Error registering user"
        }, { status: 500 })
    }
}