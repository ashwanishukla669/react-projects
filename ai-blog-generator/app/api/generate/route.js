import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI( process.env.GEMINI_API_KEY );

console.log("API Key:", process.env.GEMINI_API_KEY);

export async function POST(req){
    try{
        const { topic } = await req.json();

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        
        const result = await model.generateContent(
            `Generate a blog title and article about ${topic}`
        );

        const content = result.response.text();

        return NextResponse.json({
            content,
        });
    } catch(error){
       console.error(error);

       return NextResponse.json(
        { error: error.message },
        { status: 500 }
       );
    }
}