"use client";

import React from 'react';
import { useVoice } from "@humeai/voice-react";

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessagesProps {
  messages: Message[];
}

export default function Messages({ messages: textMessages }: MessagesProps) {
  const { messages: voiceMessages } = useVoice();

  // Combine voice and text messages
  const allMessages = [
    ...textMessages,
    ...voiceMessages
      .filter(msg => msg.type === "user_message" || msg.type === "assistant_message")
      .map(msg => ({
        role: msg.message.role,
        content: msg.message.content
      }))
  ];

  return (
    <div className="space-y-4 mb-24 max-h-[60vh] overflow-y-auto">
      {allMessages.map((msg, index) => (
        <div key={index} className={`p-4 rounded-lg ${
          msg.role === 'assistant' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}>
          <div className="font-bold mb-1">{msg.role === 'assistant' ? 'Claude' : 'You'}</div>
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  );
} 