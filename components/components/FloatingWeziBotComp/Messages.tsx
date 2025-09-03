import React from "react";
import TypingIndicator from "../patients/Wez-chat/TypingIndicator";
import { RiRobot2Line, RiUser3Line } from "react-icons/ri";
import { formatTime } from "@/utils/formatDatenTime";

const Messages = ({
  isTyping,
  messages = [],
  messagesEndRef,
}: {
  isTyping: boolean;
  messages: any[];
  messagesEndRef: any;
}) => {
  return (
    <div className="h-80 overflow-y-auto p-4 space-y-4 scroll-container">
      {messages.map((message: any, index: number) => (
        <div
          key={index?.toString()}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          } animate-in slide-in-from-bottom-4 fade-in duration-500`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            className={`
                    max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl relative overflow-hidden
                    ${
                      message.sender === "user"
                        ? "bg-blue-900 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }
                    backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300
                  `}
          >
            {message.sender === "bot" && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-50"></div>
            )}

            <div className="flex items-start space-x-2 relative z-10">
              <div
                className={`
                        w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                        ${
                          message.sender === "user"
                            ? "bg-white/20"
                            : "bg-blue-100"
                        }
                      `}
              >
                {message.sender === "user" ? (
                  <RiUser3Line
                    className={`w-3 h-3 ${
                      message.sender === "user" ? "text-white" : "text-blue-900"
                    }`}
                  />
                ) : (
                  <RiRobot2Line className="w-3 h-3 text-blue-900" />
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
