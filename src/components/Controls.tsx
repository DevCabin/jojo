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
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-16">
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            {error && (
              <div className="text-red-600 text-center mb-6 p-4 bg-red-50 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}
            <div className="text-center">
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
                style={{ 
                  backgroundColor: '#2563eb',
                  padding: '19px',
                  marginTop: '49px',
                  borderRadius: '19px'
                }}
                className="inline-flex items-center px-8 py-4 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-lg font-medium"
              >
                Start Voice Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-16">
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          {error && (
            <div className="text-red-600 text-center mb-6 p-4 bg-red-50 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div className="flex justify-center gap-6">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                disabled={isProcessing}
                style={{ 
                  backgroundColor: isProcessing ? '#e2e8f0' : '#10b981',
                  padding: '19px',
                  marginTop: '49px',
                  borderRadius: '19px'
                }}
                className={`
                  inline-flex items-center px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-white
                  ${isProcessing 
                    ? 'cursor-not-allowed'
                    : 'hover:brightness-110'
                  }
                `}
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                style={{ 
                  backgroundColor: '#eab308',
                  padding: '19px',
                  marginTop: '49px',
                  borderRadius: '19px'
                }}
                className="inline-flex items-center px-8 py-4 text-white rounded-xl hover:brightness-110 transition-all duration-200 shadow-md hover:shadow-lg text-lg font-medium"
              >
                Stop Recording
              </button>
            )}
            
            <button
              onClick={() => disconnect()}
              style={{ 
                backgroundColor: '#ef4444',
                padding: '19px',
                marginTop: '49px',
                borderRadius: '19px'
              }}
              className="inline-flex items-center px-8 py-4 text-white rounded-xl hover:brightness-110 transition-all duration-200 shadow-md hover:shadow-lg text-lg font-medium"
            >
              End Voice Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 