import { useState, useRef, useEffect } from "react";
import { Send, Heart, Brain, Sparkles, Moon, Sun } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi da! I'm here to listen. What's on your mind today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{id: number, emoji: string, x: number}>>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Floating emoji animation
  useEffect(() => {
    const interval = setInterval(() => {
      const emojis = ['💙', '🌟', '✨', '💚', '🌈', '🦋', '🌸', '💜'];
      const newEmoji = {
        id: Date.now(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100
      };
      setFloatingEmojis(prev => [...prev, newEmoji].slice(-8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      return "Hey da! 😊 How are you feeling today?";
    }
    if (lower.includes('anxious') || lower.includes('stress')) {
      return "I hear you da, Stress can be overwhelming. Let's break it down together. What situation started this feeling?";
    }
    if (lower.includes('sad') || lower.includes('depressed')) {
      return "I'm sorry you're feeling this way da, You're not alone. Want to talk about what's making you feel sad?";
    }
    if (lower.includes('thanks') || lower.includes('thank you')) {
      return "Always here for you da! Remember, you're stronger than you think 💪";
    }
    return "I'm listening da, Tell me more about what you're going through...";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(74, 222, 128, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)`,
          animation: 'pulse 8s ease-in-out infinite'
        }}/>
      </div>

      {/* Floating emojis */}
      {floatingEmojis.map(item => (
        <div
          key={item.id}
          className="absolute text-4xl pointer-events-none animate-float"
          style={{
            left: `${item.x}%`,
            top: '-50px',
            animation: 'floatUp 6s linear forwards',
            opacity: 0.4
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Header with gradient and icons */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 backdrop-blur-md shadow-2xl px-6 py-5 border-b-4 border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm animate-pulse">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                E Panjaayathu 
                <Heart className="w-6 h-6 text-red-300 animate-pulse" />
              </h1>
              <p className="text-sm text-white/90 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Your Mental Wellness Companion
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-yellow-400/30 p-2 rounded-full animate-spin-slow">
              <Sun className="w-5 h-5 text-yellow-200" />
            </div>
            <div className="bg-blue-400/30 p-2 rounded-full">
              <Moon className="w-5 h-5 text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slideIn`}
            >
              <div
                className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-lg transition-all duration-300 hover:scale-105 ${
                  message.isBot
                    ? 'bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 text-white rounded-tl-none'
                    : 'bg-gradient-to-br from-emerald-400 to-cyan-400 text-gray-900 rounded-tr-none'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.isBot && (
                    <Brain className="w-5 h-5 mt-1 flex-shrink-0 animate-pulse" />
                  )}
                  <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-slideIn">
              <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 px-6 py-4 rounded-3xl rounded-tl-none shadow-lg">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area with gradient border */}
      <div className="relative bg-gradient-to-t from-purple-900/50 to-transparent backdrop-blur-md border-t-2 border-white/20 px-4 py-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-center bg-white/10 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border-2 border-white/20">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... 💭"
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/60 focus:outline-none text-base"
            />

            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold transform hover:scale-105"
              disabled={!inputMessage.trim()}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          
          {/* Quick action buttons */}
          <div className="flex gap-2 mt-3 flex-wrap justify-center">
            {['😊 Feeling Good', '😰 Anxious', '❤️ Need Support', '🌟 Motivation'].map((quick, idx) => (
              <button
                key={idx}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm rounded-full transition-all duration-200 border border-white/20 hover:scale-105"
                onClick={() => setInputMessage(quick.split(' ')[1])}
              >
                {quick}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="pointer-events-none fixed top-20 right-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none fixed bottom-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="pointer-events-none fixed top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

      <style jsx>{`
        @keyframes floatUp {
          to {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
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
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}
