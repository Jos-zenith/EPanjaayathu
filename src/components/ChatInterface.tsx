import { useState, useRef, useEffect } from "react";
import { Send, Brain, Sparkles, Shield, MessageCircle } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello, I'm here to support you. Feel free to share what's on your mind in a safe, confidential space.", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    const userMessage: Message = { text: trimmedMessage, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(trimmedMessage);
      const botMessage: Message = { text: botResponse, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    }, 1200);
  };

  const getBotResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes('hi') || lower.includes('hello')) {
      return "Hello. I'm here to listen. How are you feeling right now?";
    }
    if (lower.includes('anxious') || lower.includes('stress')) {
      return "I understand that anxiety and stress can feel overwhelming. Let's work through this together. Can you tell me more about what's causing these feelings?";
    }
    if (lower.includes('sad') || lower.includes('depressed')) {
      return "I'm sorry you're experiencing these difficult emotions. You're not alone, and it's okay to feel this way. Would you like to talk about what's been happening?";
    }
    if (lower.includes('thanks') || lower.includes('thank you')) {
      return "You're welcome. Remember, seeking support is a sign of strength. I'm here whenever you need to talk.";
    }
    return "I'm listening. Please tell me more about what you're experiencing...";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Professional Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 shadow-xl border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-white/10 p-1.5 sm:p-2 rounded-lg backdrop-blur-sm">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                  E Panjaayathu
                </h1>
                <p className="text-xs sm:text-sm text-purple-100 flex items-center gap-1">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Professional Mental Health Support</span>
                  <span className="sm:hidden">Mental Health Support</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="bg-emerald-500/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-400/30">
                <span className="text-[10px] sm:text-xs text-emerald-300 font-medium flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="hidden sm:inline">Online</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container - Fixed scrolling */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(139, 92, 246, 0.5) transparent'
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slideIn`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-300 ${
                  message.isBot
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tl-none'
                    : 'bg-gradient-to-br from-slate-700 to-slate-600 text-white rounded-tr-none'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.isBot && (
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0 opacity-80" />
                  )}
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-slideIn">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl rounded-tl-none shadow-lg">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Mobile Optimized */}
      <div className="bg-slate-900/50 backdrop-blur-md border-t border-purple-500/20 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 sm:gap-3 items-end bg-slate-800/50 backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 shadow-xl border border-purple-500/30">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base resize-none"
            />

            <button
              onClick={handleSendMessage}
              className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 font-medium text-sm sm:text-base active:scale-95"
              disabled={!inputMessage.trim()}
              aria-label="Send message"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          
          {/* Quick action buttons - Mobile Optimized */}
          <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 flex-wrap justify-center">
            {[
              { emoji: '😊', text: 'Feeling Good', value: 'feeling good' },
              { emoji: '😰', text: 'Anxious', value: 'anxious' },
              { emoji: '💬', text: 'Need Support', value: 'need support' },
              { emoji: '🎯', text: 'Motivation', value: 'motivation' }
            ].map((quick, idx) => (
              <button
                key={idx}
                className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm text-white text-xs sm:text-sm rounded-full transition-all duration-200 border border-purple-500/20 hover:border-purple-500/40 active:scale-95"
                onClick={() => setInputMessage(quick.value)}
              >
                <span className="sm:hidden">{quick.emoji}</span>
                <span className="hidden sm:inline">{quick.emoji} {quick.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        
        /* Custom scrollbar for webkit browsers */
        *::-webkit-scrollbar {
          width: 8px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}
