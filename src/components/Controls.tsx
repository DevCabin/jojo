"use client";

import React, { useState } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function Controls() {
  const { connect, disconnect, readyState } = useVoice();
  const [error, setError] = useState<string | null>(null);

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <div className="flex flex-col items-center w-full mt-4">
        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          End Session
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-4">
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      <button
        onClick={() => {
          setError(null);
          connect()
            .then(() => {
              console.log("Connected successfully");
            })
            .catch((error) => {
              console.error("Connection failed:", error);
              setError(error.message || "Failed to connect. Please try again.");
            });
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Session
      </button>
    </div>
  );
} 