'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { ClaudeMessage } from '@/lib/claude/client';

interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ClaudeMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setIsListening(false);
        
        // Add user message
        const userMessage: ClaudeMessage = {
          role: 'user',
          content: transcript
        };
        setMessages(prev => [...prev, userMessage]);

        try {
          // Send to JoJo
          const response = await fetch('/api/claude', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: transcript,
              previousMessages: messages
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to get response');
          }

          const data = await response.json();
          
          // Add JoJo's response
          const assistantMessage: ClaudeMessage = {
            role: 'assistant',
            content: data.response
          };
          setMessages(prev => [...prev, assistantMessage]);

          // Speak the response
          if ('speechSynthesis' in window) {
            setIsSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(data.response);
            window.speechSynthesis.speak(utterance);
            utterance.onend = () => setIsSpeaking(false);
          }
        } catch (error) {
          console.error('Error:', error);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'I apologize, but I encountered an error. Please try again.'
          }]);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      return () => {
        recognition.stop();
      };
    }
  }, [messages]);

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-2xl rounded-lg border border-gray-700 p-6">
        <div className="mb-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600/20 border border-blue-500/50'
                    : 'bg-gray-800/50 border border-gray-700'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleListening}
            variant="outline"
            size="lg"
            disabled={isSpeaking}
            className={`border-2 ${
              isListening 
                ? 'border-white/80 hover:border-white hover:bg-white/10' 
                : 'border-white/60 hover:border-white hover:bg-white/10'
            } bg-transparent text-white min-w-[200px] ${
              isSpeaking ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isListening ? (
              <React.Fragment>
                <MicOff className="mr-2 h-5 w-5" />
                Stop Listening
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Mic className="mr-2 h-5 w-5" />
                Start Listening
              </React.Fragment>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 