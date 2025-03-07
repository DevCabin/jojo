# JoJo Voice Chat

A real-time voice chat application powered by Claude AI and Hume AI's voice analysis.

## Features

- Real-time voice chat with Claude AI
- Voice emotion analysis using Hume AI
- Modern, responsive UI with Tailwind CSS
- Real-time message streaming
- Voice recording and transcription
- Error handling and user feedback

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Claude AI for chat
- Hume AI for voice analysis
- WebSocket for real-time communication

## Environment Variables

Create a `.env.local` file with the following variables:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
HUME_API_KEY=your_hume_api_key
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/DevCabin/mojojojo.git
cd mojojojo
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── ClientComponent.tsx    # Main client-side component
│   ├── Controls.tsx          # Voice recording controls
│   ├── Messages.tsx          # Message display
│   └── VoiceProvider.tsx     # Voice context provider
├── services/              # API services
│   ├── ClaudeService.ts      # Claude AI integration
│   └── HumeService.ts        # Hume AI integration
└── types/                 # TypeScript type definitions
```

## Deployment

The project is deployed on Vercel:
https://mojojojo-r8g8tnt8k-devcabins-projects.vercel.app

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
