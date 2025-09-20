import React, { useState } from 'react';
import { Mic, MessageSquare, Volume2, Settings, Phone, PhoneOff } from 'lucide-react';
import VapiWidget from './VapiWidget';

const VapiDemo: React.FC = () => {
  const [publicKey, setPublicKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  const handleConfigure = () => {
    if (publicKey.trim()) {
      setIsConfigured(true);
    }
  };

  const handleReset = () => {
    setIsConfigured(false);
    setPublicKey('');
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Configure Vapi</h1>
            <p className="text-gray-300">Enter your Vapi public key to get started</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="publicKey" className="block text-sm font-medium text-gray-300 mb-2">
                Public Key
              </label>
              <input
                type="text"
                id="publicKey"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Enter your Vapi public key"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleConfigure}
              disabled={!publicKey.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Configure Widget
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Don't have a key? Get one from{' '}
              <a href="https://vapi.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                vapi.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Vapi Voice AI</h1>
                <p className="text-gray-300 text-sm">Intelligent voice conversations</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              Reset Config
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience the Future of Voice AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start a natural conversation with our AI assistant. Click the phone button below to begin talking.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Natural Speech</h3>
            <p className="text-gray-300">
              High-quality voice synthesis that sounds natural and engaging, powered by advanced AI models.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Voice Recognition</h3>
            <p className="text-gray-300">
              Accurate speech-to-text conversion that understands context and handles natural speech patterns.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Conversations</h3>
            <p className="text-gray-300">
              Intelligent responses powered by GPT models, creating meaningful and contextual conversations.
            </p>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">How to Use</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Start Conversation</h4>
                  <p className="text-gray-300 text-sm">Click the green phone button to begin your voice conversation with the AI assistant.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <PhoneOff className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">End Conversation</h4>
                  <p className="text-gray-300 text-sm">Click the red phone button to end the current conversation at any time.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Speak Naturally</h4>
                  <p className="text-gray-300 text-sm">Talk normally - the AI will understand your speech and respond with natural voice.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Volume2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Listen & Respond</h4>
                  <p className="text-gray-300 text-sm">The AI will respond with voice - you can have a back-and-forth conversation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vapi Widget */}
      <VapiWidget publicKey={publicKey} />
    </div>
  );
};

export default VapiDemo;