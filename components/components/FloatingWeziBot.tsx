"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatToggleutton from "./FloatingWeziBotComp/ChatToggleutton";
import InputArea from "./FloatingWeziBotComp/InputArea";
import Header from "./FloatingWeziBotComp/Header";
import Messages from "./FloatingWeziBotComp/Messages";

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
  }, [messages]);

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

    // Simulated bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. I'm processing your request and will provide you with the most helpful information possible.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };


  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {isOpen && (
        <div className="mb-4 w-96 h-[32rem] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-700">
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
