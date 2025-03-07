import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages,
      system: "You are a helpful AI assistant.",
    });

    const content = response.content[0];
    if ('text' in content) {
      return NextResponse.json({ response: content.text });
    } else {
      throw new Error('Unexpected response format from Claude');
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 