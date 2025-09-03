"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "123", message: text }),
      });
      const data = await res.json();
      const botMessage: Message = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[90vw] sm:w-80 md:w-96 h-[70vh] sm:h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
            <h2 className="font-bold text-lg sm:text-xl">Wezi Chatbot</h2>
            <button onClick={() => setOpen(false)} className="font-bold hover:text-gray-200 transition">
              ✕
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <ChatMessage key={i} sender={m.sender} message={m.text} />
            ))}
            {loading && <p className="text-gray-400 italic">Bot is typing...</p>}
            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <ChatInput onSend={handleSend} />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg fixed bottom-4 right-4 transition-transform hover:scale-110"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
