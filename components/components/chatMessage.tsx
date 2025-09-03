import React from "react";

interface ChatMessageProps {
  message: string;
  sender: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl break-words shadow-sm ${
          isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
