import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_DATA } from "@/lib/data";
import { NextResponse } from "next/server";

// Initialize the Gemini API client securely on the server
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are the professional AI assistant for ${PORTFOLIO_DATA.personal.name}'s portfolio website. 
      You represent them directly to potential employers and clients.
      
      Use the following JSON data to answer any questions about their skills, experience, and projects: 
      ${JSON.stringify(PORTFOLIO_DATA)}
      
      Guidelines:
      - Keep answers concise, professional, and conversational.
      - Always highlight their strengths in TypeScript, scalable architecture, and cloud infrastructure when relevant.
      - If asked something not covered in the data, politely pivot back to their engineering qualifications or suggest contacting them via email at ${PORTFOLIO_DATA.personal.email}.`,
    });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request." },
      { status: 500 }
    );
  }
}