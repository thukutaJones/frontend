import React from "react";
import { RiRobot2Line, RiUser3Line } from "react-icons/ri";
import TypingIndicator from "./TypingIndicator";
import { formatTime } from "@/utils/formatDatenTime";

const MessagesContainer = ({
  messages = [],
  isTyping,
  messagesEndRef,
  type,
}: {
  messages: any[];
  isTyping: boolean;
  messagesEndRef: any;
  type: string;
}) => {
  console.log("messages: ",messages)
  return (
    <div className="flex-1 overflow-y-auto scroll-container pb-6">
      <div className="space-y-6">
        {messages.map((message: any, index: number) => (
          <div
            key={index?.toString()}
            className={`flex ${
              message?.sender === "user" ? "justify-end" : "justify-start"
            } animate-in slide-in-from-bottom-4 fade-in duration-500`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`
                      max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-6 py-4 rounded-3xl relative overflow-hidden shadow-lg
                      ${
                        message?.sender === "user"
                          ? "bg-blue-900 text-white rounded-br-lg"
                          : "bg-white text-gray-800 rounded-bl-lg border border-gray-100"
                      }
                      backdrop-blur-sm hover:shadow-xl transition-all duration-300 group
                    `}
            >
              {message?.sender === "bot" && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-white/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              )}

              <div className="flex items-start space-x-3 relative z-10">
                <div
                  className={`
                          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                          ${
                            message?.sender === "user"
                              ? "bg-white/20 backdrop-blur-sm"
                              : "bg-blue-100"
                          }
                        `}
                >
                  {message?.sender === "user" ? (
                    <RiUser3Line
                      className={`w-4 h-4 ${
                        message?.sender === "user"
                          ? "text-white"
                          : "text-blue-900"
                      }`}
                    />
                  ) : (
                    <RiRobot2Line className="w-4 h-4 text-blue-900" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {message?.message}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message?.sender === "user"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
