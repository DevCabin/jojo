import React from 'react';
import ClientComponent from "../components/ClientComponent";
import { VoiceProvider } from "@humeai/voice-react";

export default async function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">JoJo Voice Chat</h1>
          <!--p className="text-slate-600">Talk naturally with JoJo using your voice</p-->
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <ClientComponent />
        </div>
      </div>
    </main>
  );
} 