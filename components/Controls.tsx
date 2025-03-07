"use client";

import { useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function Controls() {
  const { connect, disconnect, readyState } = useVoice();

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        End Session
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        connect()
          .then(() => {
            console.log("Connected successfully");
          })
          .catch((error) => {
            console.error("Connection failed:", error);
          });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Start Session
    </button>
  );
} 