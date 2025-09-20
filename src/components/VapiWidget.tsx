import React, { useEffect, useRef, useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';

// Define types for Vapi
interface VapiInstance {
  start: (assistant?: any) => Promise<void>;
  stop: () => Promise<void>;
  setMuted: (muted: boolean) => void;
  isMuted: () => boolean;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    Vapi: {
      new (publicKey: string): VapiInstance;
    };
  }
}

interface VapiWidgetProps {
  publicKey: string;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({ publicKey }) => {
  const vapiRef = useRef<VapiInstance | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVapiLoaded, setIsVapiLoaded] = useState(false);

  // Load Vapi SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.js';
    script.async = true;
    script.onload = () => {
      setIsVapiLoaded(true);
    };
    script.onerror = () => {
      setError('Failed to load Vapi SDK');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Initialize Vapi instance
  useEffect(() => {
    if (!isVapiLoaded || !publicKey) return;

    try {
      vapiRef.current = new window.Vapi(publicKey);

      const handleCallStart = () => {
        setIsCallActive(true);
        setIsLoading(false);
        setError(null);
      };

      const handleCallEnd = () => {
        setIsCallActive(false);
        setIsLoading(false);
        setIsMuted(false);
      };

      const handleError = (error: any) => {
        console.error('Vapi error:', error);
        setError('Call failed. Please try again.');
        setIsLoading(false);
        setIsCallActive(false);
      };

      vapiRef.current.on('call-start', handleCallStart);
      vapiRef.current.on('call-end', handleCallEnd);
      vapiRef.current.on('error', handleError);

      return () => {
        if (vapiRef.current) {
          vapiRef.current.off('call-start', handleCallStart);
          vapiRef.current.off('call-end', handleCallEnd);
          vapiRef.current.off('error', handleError);
        }
      };
    } catch (err) {
      console.error('Failed to initialize Vapi:', err);
      setError('Failed to initialize voice AI');
    }
  }, [isVapiLoaded, publicKey]);

  const startCall = async () => {
    if (!vapiRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const assistant = {
        model: {
          provider: 'openai',
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Keep your responses concise and conversational. You are speaking to the user via voice, so avoid using formatting like markdown or bullet points.'
            }
          ]
        },
        voice: {
          provider: '11labs',
          voiceId: 'rachel'
        },
        firstMessage: 'Hello! I\'m your AI assistant. How can I help you today?'
      };

      await vapiRef.current.start(assistant);
    } catch (err) {
      console.error('Failed to start call:', err);
      setError('Failed to start call. Please check your configuration.');
      setIsLoading(false);
    }
  };

  const endCall = async () => {
    if (!vapiRef.current) return;

    try {
      await vapiRef.current.stop();
    } catch (err) {
      console.error('Failed to end call:', err);
    }
  };

  const toggleMute = () => {
    if (!vapiRef.current) return;

    const newMutedState = !isMuted;
    vapiRef.current.setMuted(newMutedState);
    setIsMuted(newMutedState);
  };

  if (!isVapiLoaded) {
    return (
      <div className="fixed bottom-6 right-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-full p-4 border border-white/20">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500/90 backdrop-blur-lg text-white px-4 py-2 rounded-lg border border-red-400/50 z-50">
          {error}
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        {/* Mute Button (only show when call is active) */}
        {isCallActive && (
          <button
            onClick={toggleMute}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
              isMuted
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>
        )}

        {/* Main Call Button */}
        <button
          onClick={isCallActive ? endCall : startCall}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
            isCallActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : isCallActive ? (
            <PhoneOff className="w-7 h-7 text-white" />
          ) : (
            <Phone className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      {/* Call Status Indicator */}
      {isCallActive && (
        <div className="fixed top-4 left-4 bg-green-500/90 backdrop-blur-lg text-white px-4 py-2 rounded-lg border border-green-400/50 flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Call Active</span>
          {isMuted && <span className="text-xs opacity-75">(Muted)</span>}
        </div>
      )}
    </>
  );
};

export default VapiWidget;