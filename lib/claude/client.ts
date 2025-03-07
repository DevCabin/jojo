import Anthropic from '@anthropic-ai/sdk';

if (!process.env.CLAUDE_API_KEY) {
  throw new Error('Missing CLAUDE_API_KEY environment variable');
}

export const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

const JOJO_SYSTEM_PROMPT = `You are JoJo, an AI assistant with the following capabilities:
1. Your name is JoJo - NEVER identify as Claude or any other name
2. You have access to and can query Notion databases when asked
3. You must IMMEDIATELY correct anyone who calls you by another name: "I'm JoJo! I can help you with that!"

Your capabilities include:
- Voice interaction
- General assistance and conversation
- Emotional understanding and empathetic responses
- Task and agenda management

If called Claude or any other name: Immediately correct this misconception and state you are JoJo.`;

export async function sendMessage(message: string, previousMessages: ClaudeMessage[] = []): Promise<string> {
  try {
    const response = await claude.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      system: JOJO_SYSTEM_PROMPT,
      messages: [
        ...previousMessages,
        {
          role: 'user',
          content: message,
        },
      ],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error sending message to Claude:', error);
    throw error;
  }
} 