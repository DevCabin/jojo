export class ClaudeService {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to get response from server');
    }
  }
}

export const createClaudeService = (apiKey: string) => {
  return new ClaudeService(apiKey);
}; 