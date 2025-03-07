"use client";

import React, { useState } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function Controls() {
  const { connect, disconnect, readyState } = useVoice();
  const [error, setError] = useState<string | null>(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      // TODO: Implement text message handling
      console.log('Sending text:', textInput);
      setTextInput('');
    }
  };

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
        
        <button
          onClick={() => setShowTextInput(!showTextInput)}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
          {showTextInput ? 'Hide Text Input' : 'Show Text Input'}
        </button>

        {showTextInput && (
          <div className="mt-2 w-full max-w-md flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
            />
            <button
              onClick={handleTextSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        )}
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