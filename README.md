# JoJo Voice Chat

A modern voice-enabled AI chat application built with Next.js and Claude AI. Talk naturally with JoJo using your voice or text.

## Features

- 🎙️ Voice input/output with Web Speech API
- 💜 Light, effortless UI
- 🤖 Powered by Claude AI for natural conversations
- 💬 Message history and context awareness
- 🎯 Centered, clean design focused on the conversation

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Claude AI (Anthropic)
- Web Speech API

## Environment Variables

Required environment variables (either will work, but ANTHROPIC_API_KEY is preferred):
```bash
ANTHROPIC_API_KEY=your_api_key_here
# or for compatibility
CLAUDE_API_KEY=your_api_key_here
```

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Add your Claude API key to `.env.local`
4. Run the development server: `pnpm dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Claude AI Documentation](https://docs.anthropic.com/claude/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the following environment variables in your Vercel project settings:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDevCabin%2Fhume-claude-ai)

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── voice/       # Voice interface components
├── lib/             # Core functionality
│   ├── claude/      # Claude API integration
│   └── voice/       # Voice processing utilities
└── types/           # TypeScript types
```

## Development

This project is built with:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Web Speech API
- Anthropic Claude API

## License

MIT
