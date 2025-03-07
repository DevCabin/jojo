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
    <div className="space-y-6 mb-32 max-h-[calc(100vh-12rem)] overflow-y-auto px-4 py-6 rounded-lg bg-gray-50">
      {allMessages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">Start speaking to begin the conversation</p>
          <p className="text-sm mt-2">Your messages will appear here</p>
        </div>
      )}
      {allMessages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'assistant'
                ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                : 'bg-blue-600 text-white rounded-tr-none'
            }`}
          >
            <div className={`text-xs mb-1 ${msg.role === 'assistant' ? 'text-gray-500' : 'text-blue-200'}`}>
              {msg.role === 'assistant' ? 'Claude' : 'You'}
            </div>
            <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 