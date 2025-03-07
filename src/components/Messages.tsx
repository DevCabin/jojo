"use client";

import React from 'react';
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
  const { messages } = useVoice();

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          return (
            <div key={msg.type + index} className={`p-4 rounded-lg ${
              msg.message.role === 'assistant' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <div className="font-bold mb-1">{msg.message.role === 'assistant' ? 'Claude' : 'You'}</div>
              <div>{msg.message.content}</div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
} 