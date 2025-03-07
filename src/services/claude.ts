import Anthropic from '@anthropic-ai/sdk';

export class ClaudeService {
  private anthropic: Anthropic;

  constructor(apiKey: string) {
    this.anthropic = new Anthropic({
      apiKey: apiKey,
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await this.anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: message }],
      });

      return response.content[0].text;
    } catch (error) {
      console.error('Error sending message to Claude:', error);
      throw new Error('Failed to get response from Claude');
    }
  }
}

export const createClaudeService = (apiKey: string) => {
  return new ClaudeService(apiKey);
}; 