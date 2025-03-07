"use client";

import React, { useEffect, useState } from 'react';
import { VoiceProvider } from "@humeai/voice-react";
import Messages, { Message } from "./Messages";
import Controls from "./Controls";
import { createClaudeService } from '../services/claude';

export default function ClientComponent() {
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [claudeService] = useState(() => createClaudeService());
  const [humeKey, setHumeKey] = useState<string | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_HUME_API_KEY;
    if (key) {
      setHumeKey(key);
    } else {
      setError("NEXT_PUBLIC_HUME_API_KEY environment variable is not set");
    }
  }, []);

  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-red-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
            <p className="text-gray-600 mb-2">{error}</p>
            <p className="text-sm text-gray-500">Please add it to your .env.local file.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!humeKey) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VoiceProvider auth={{ type: "apiKey", value: humeKey }}>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="flex-1 w-full max-w-4xl mx-auto">
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              How can I help?
            </h1>
          </div>
          <Messages messages={messages} />
          <Controls claudeService={claudeService} onNewMessage={handleNewMessage} />
        </div>
      </div>
    </VoiceProvider>
  );
} 