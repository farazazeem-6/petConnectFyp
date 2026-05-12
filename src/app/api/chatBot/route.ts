import { messages, SERVER_END_POINTS } from '@/constants';
import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';

// The Secret Rule
const VET_SYSTEM_PROMPT = messages.chatBotSystemPrompt;
//The API key
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// The POST Request Handler
export async function POST(request: Request) {
  try {
    // Grab what the user typed in the frontend chat UI
    const body = await request.json();
    const userMessages: { role: string; content: string }[] = body.messages;


    // Send the secure request from Our Server to Groq's Server
    const response = await fetch(SERVER_END_POINTS.groq, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // The Llama 3.1 model running on Groq
        messages: [
          { role: 'system', content: VET_SYSTEM_PROMPT },
          ...userMessages,
        ],
        temperature: 0.5, // Keeps the vet's answers serious and factual
      }),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      // This will throw us into the catch block, but now we have the REAL error message
      throw new Error(
        `Groq API rejected request: ${response.status} - ${errorDetails}`,
      );
    }

    const data = await response.json();
    const aiAnswer = data.choices[0].message.content;

    // Send ONLY the final answer back to your React frontend
    return NextResponse.json({ reply: aiAnswer });
  } catch (error) {
    logger.error('AI Error:', error);
    return NextResponse.json(
      { error: 'The virtual vet is currently asleep.Try again later' },
      { status: 500 },
    );
  }
}
