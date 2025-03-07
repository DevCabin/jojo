"use client";

import React, { useState, useEffect } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { ClaudeService } from '../services/claude';
import { Message } from './Messages';

interface ControlsProps {
  claudeService: ClaudeService;
  onNewMessage: (message: Message) => void;
}

export default function Controls({ claudeService, onNewMessage }: ControlsProps) {
  const { connect, disconnect, readyState, startRecording, stopRecording, transcription } = useVoice();
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      await startRecording();
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to start recording. Please try again.');
      setIsRecording(false);
    }
  };

  const handleStopRecording = async () => {
    try {
      setIsRecording(false);
      await stopRecording();
    } catch (error) {
      console.error('Error stopping recording:', error);
      setError('Failed to stop recording. Please try again.');
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    try {
      setIsProcessing(true);
      // Add user message to chat
      onNewMessage({ role: 'user', content: message.trim() });
      
      // Get Claude's response
      const response = await claudeService.sendMessage(message);
      // Add Claude's response to chat
      onNewMessage({ role: 'assistant', content: response });
    } catch (error) {
      console.error('Error sending message to Claude:', error);
      setError('Failed to get response from Claude. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // When transcription is ready, send it to Claude
  useEffect(() => {
    if (transcription) {
      handleSendMessage(transcription);
    }
  }, [transcription]);

  if (readyState !== VoiceReadyState.OPEN) {
    return (
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-4 bg-white p-4 border-t border-gray-200">
        <button
          onClick={() => {
            setError(null);
            connect()
              .then(() => console.log("Connected successfully"))
              .catch((error) => {
                console.error("Connection failed:", error);
                setError(error.message || "Failed to connect. Please try again.");
              });
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Start Voice Session
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-4 bg-white p-4 border-t border-gray-200">
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      
      <div className="flex gap-4">
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-lg font-medium"
            disabled={isProcessing}
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-lg font-medium"
          >
            Stop Recording
          </button>
        )}
        
        <button
          onClick={() => disconnect()}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg font-medium"
        >
          End Voice Session
        </button>
      </div>
    </div>
  );
} 