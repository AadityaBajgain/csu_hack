import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: "Generate a short JSON object describing a car." }
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    // Extract the text response
    const result = response.response.text();
    return NextResponse.json(JSON.parse(result));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
