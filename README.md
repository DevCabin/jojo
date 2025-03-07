# Hume AI + Claude Chat Interface

A modern chat interface that combines Hume AI's emotion analysis with Claude's conversational capabilities.

## Recent Changes
- Removed npm lockfile in favor of pnpm for consistent package management
- Project setup with Next.js, TypeScript, and Tailwind CSS

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
Create a `.env.local` file with your API keys:
```
HUME_API_KEY=your_hume_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

3. Run the development server:
```bash
pnpm dev
```

## Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Hume AI API
- Anthropic Claude API
- pnpm (Package Manager)

## Project Structure
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/src` - Source code and utilities 