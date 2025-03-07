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
            <div key={msg.type + index} className="p-4 rounded-lg bg-gray-100">
              <div className="font-bold">{msg.message.role}</div>
              <div>{msg.message.content}</div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
} 