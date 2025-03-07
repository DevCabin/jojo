"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
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