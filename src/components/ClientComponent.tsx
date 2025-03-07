"use client";

import React from 'react';
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";

export default function ClientComponent() {
  return (
    <VoiceProvider auth={{ type: "apiKey", value: process.env.NEXT_PUBLIC_HUME_API_KEY || "" }}>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            Voice Chat with Claude!
          </h1>
          <Messages />
          <Controls />
        </div>
      </div>
    </VoiceProvider>
  );
} 