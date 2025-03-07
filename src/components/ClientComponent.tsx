"use client";

import React, { useEffect, useState } from 'react';
import Messages, { Message } from "./Messages";
import Controls from "./Controls";
import { createClaudeService } from '../services/claude';

export default function ClientComponent() {
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [claudeService] = useState(() => createClaudeService());

  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-4xl font-mono text-sm pt-24 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          How can I help?
        </h1>
        <Messages messages={messages} />
        <Controls claudeService={claudeService} onNewMessage={handleNewMessage} />
      </div>
    </div>
  );
} 