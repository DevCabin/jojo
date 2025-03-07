"use client";

import React, { useState, useEffect } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { ClaudeService } from '../services/claude';

interface ControlsProps {
  claudeService: ClaudeService;
}

export default function Controls({ claudeService }: ControlsProps) {
  const { connect, disconnect, readyState } = useVoice();
  const [error, setError] = useState<string | null>(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { startRecording, stopRecording, transcription } = useVoice();

  const handleStartRecording = async () => {
    setIsRecording(true);
    await startRecording();
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    await stopRecording();
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    try {
      setIsProcessing(true);
      const response = await claudeService.sendMessage(message);
      // Here you would typically update your messages state or UI with the response
      console.log('Claude response:', response);
    } catch (error) {
      console.error('Error sending message to Claude:', error);
    } finally {
      setIsProcessing(false);
      setTextInput('');
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSendMessage(textInput);
  };

  // When transcription is ready, send it to Claude
  useEffect(() => {
    if (transcription) {
      handleSendMessage(transcription);
    }
  }, [transcription]);

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center gap-4">
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
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {showTextInput ? 'Hide Text Input' : 'Show Text Input'}
        </button>

        {showTextInput && (
          <form onSubmit={handleTextSubmit} className="flex gap-2 w-full max-w-md px-4">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg"
              disabled={isProcessing}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={isProcessing || !textInput.trim()}
            >
              Send
            </button>
          </form>
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