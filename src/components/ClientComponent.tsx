"use client";

import React, { useEffect, useState } from 'react';
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import { createClaudeService } from '../services/claude';

export default function ClientComponent() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [claudeService] = useState(() => createClaudeService());

  useEffect(() => {
    const humeKey = process.env.NEXT_PUBLIC_HUME_API_KEY;

    if (!humeKey) {
      setError("NEXT_PUBLIC_HUME_API_KEY environment variable is not set");
      return;
    }

    setApiKey(humeKey);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Configuration Error</h2>
          <p>{error}</p>
          <p className="mt-2">Please add it to your .env.local file.</p>
        </div>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-gray-500 text-center">
          <h2 className="text-xl font-bold mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <VoiceProvider 
      auth={{ type: "apiKey", value: apiKey }}
    >
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            How can I help?
          </h1>
          <Messages />
          <Controls claudeService={claudeService} />
        </div>
      </div>
    </VoiceProvider>
  );
} 