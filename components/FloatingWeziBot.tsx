"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatToggleutton from "./FloatingWeziBot/ChatToggleutton";
import InputArea from "./FloatingWeziBot/InputArea";
import Header from "./FloatingWeziBot/Header";
import Messages from "./FloatingWeziBot/Messages";
import { useAuth } from "../hooks/useAuth"; // adjust import path

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface WeziChatbotProps {
  className?: string;
}

const FloatingWeziBot = ({ className = "" }: WeziChatbotProps) => {
  const { user } = useAuth(['doctor','admin','patient']); // 👈 now we have current user (or guest)
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Wezi AI Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id || "guest", // 👈 attach real user or guest
          message: newMessage.text,
        }),
      });

      const data = await res.json();

      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data?.response || "🤖 Sorry, I didn’t get that.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, Math.random() * 2000 + 1000);
    } catch (error) {
      console.error("❌ Chat request failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "⚠️ Failed to connect to the server.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-10 ${className}`}>
      {isOpen && (
        <div className="mb-4 w-96 h-[32rem] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-700 flex flex-col">
          <Header setIsOpen={setIsOpen} />
          <Messages
            isTyping={isTyping}
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
          <InputArea
            inputRef={inputRef}
            setInputText={setInputText}
            inputText={inputText}
            handleKeyPress={handleKeyPress}
            handleSendMessage={handleSendMessage}
            toggleRecording={toggleRecording}
            isRecording={isRecording}
          />
        </div>
      )}

      <ChatToggleutton
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        messages={messages}
      />
    </div>
  );
};

export default FloatingWeziBot;
