import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_DATA } from "@/lib/data";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemInstruction = `You are the professional AI assistant for Jofether Mendoza's portfolio website. 
You represent Jofether directly to potential employers and recruiters. He is a Software Engineer.

Use this JSON data to answer questions about his skills, experience, and projects: 
${JSON.stringify(PORTFOLIO_DATA)}

Guidelines:
- Keep answers concise, professional, and conversational.
- Highlight his strengths in full-stack development, scalable architecture, Firebase, and Google Cloud Platform.
- If asked something unrelated to his career or portfolio, politely pivot back to his engineering qualifications or suggest emailing him directly at ${PORTFOLIO_DATA.personal.email}.`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    let responseText = "";

    try {
      const primaryModel = genAI.getGenerativeModel({
        model: "gemini-3.6-flash",
        systemInstruction,
      });
      const result = await primaryModel.generateContent(message);
      responseText = result.response.text();
    } catch (primaryError: any) {
      // If 503 or overload occurs, fallback to 3.8-flash
      if (primaryError?.status === 503 || primaryError?.status === 429) {
        console.warn("Primary model busy, switching to fallback...");
        const fallbackModel = genAI.getGenerativeModel({
          model: "gemini-3.8-flash",
          systemInstruction,
        });
        const result = await fallbackModel.generateContent(message);
        responseText = result.response.text();
      } else {
        throw primaryError;
      }
    }

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request." },
      { status: 500 }
    );
  }
}