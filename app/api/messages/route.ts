import { PrismaClient } from "@prisma/client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: { timestamp: "asc" },
  });
  return new NextResponse(JSON.stringify(messages), { status: 200 });
}

export async function POST(request: NextRequest) {
  const { message }: { message: string } = await request.json();
  console.log(message);

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const { text } = await generateText({
    model: google("models/gemini-1.5-pro-latest"),
    prompt: message,
  });

  const newMessage = await prisma.message.create({
    data: {
      message,
      answer: text,
      feedback: null,
    },
  });

  return new NextResponse(JSON.stringify(newMessage), { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { id, feedback } = await request.json();
  const updatedMessage = await prisma.message.update({
    where: { id },
    data: { feedback },
  });

  return new NextResponse(JSON.stringify(updatedMessage), { status: 200 });
}
