import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { ChatMessage } from "./ChatMessage";
import { ChatbotService } from "../services/chatbotService";

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatInterfaceProps {
  chatbotService: ChatbotService;
}

export function ChatInterface({ chatbotService }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How can I help you today?", isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    const userMessage: Message = { text: trimmedMessage, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const botResponse = chatbotService.getResponse(trimmedMessage);
      const botMessage: Message = { text: botResponse, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#4a0f14] via-[#5e1a1f] to-[#2a0b0d] text-amber-50">
      <div className="bg-black/30 backdrop-blur-sm shadow-lg px-6 py-4 border-b border-[#3b0c10]">
        <h1 className="text-3xl font-bold" style={{ color: '#f0b019ff' }}>E Panjaayathu Chatbot</h1>
        <p className="text-sm text-amber-100/80">Mental Health Assistant</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28 }}
            >
              <ChatMessage
                message={message.text}
                isBot={message.isBot}
                // pass a theme prop if your ChatMessage supports it
              />
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-gradient-to-t from-black/25 to-transparent border-t border-[#3b0c10] px-4 py-4">
        <div className="max-w-4xl mx-auto flex gap-3 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="share your message..."
            className="flex-1 px-4 py-3 bg-[#2b1113] border border-[#4a1b1f] rounded-xl text-amber-50 placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-[#ffd97d]"
            style={{ boxShadow: '0 4px 18px rgba(255, 217, 125, 0.06)' }}
          />

          <button
            onClick={handleSendMessage}
            className="px-5 py-3 bg-[#ffd97d] hover:bg-[#ffe79f] text-[#4a0f14] rounded-xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={!inputMessage.trim()}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating subtle accent */}
      <div className="pointer-events-none fixed right-6 bottom-6 opacity-20">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#ffd97d" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffb84d" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="110" cy="110" r="90" fill="url(#g)" />
        </svg>
      </div>
    </div>
  );
}
