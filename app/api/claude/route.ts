import { NextResponse } from 'next/server';
import { sendMessage } from '@/lib/claude/client';

// Remove the edge runtime directive since we're using the edge SDK
// export const runtime = 'edge';

// Force Vercel rebuild - timestamp: ${new Date().toISOString()}
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { message, previousMessages } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const response = await sendMessage(message, previousMessages || []);
        return NextResponse.json({ response });
    } catch (error) {
        console.error('Error in Claude API route:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
} 