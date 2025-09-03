import React from "react";
import { RiRobot2Line, RiUser3Line } from "react-icons/ri";
import TypingIndicator from "../Wez-chat/TypingIndicator";
import { formatTime } from "@/utils/formatDatenTime";

const MessagesContainer = ({
  messages = [],
  isTyping,
  messagesEndRef,
  type,
  userId,
}: {
  messages: any[];
  isTyping: boolean;
  messagesEndRef: any;
  type: string;
  userId: string;
}) => {
  return (
    <div
      className={`flex-1 overflow-y-auto scroll-container py-4 pb-6 px-6 ${
        type === "hod" ? "md:px-20" : "md:px-20"
      }`}
    >
      <div className="space-y-6">
        {messages.map((message: any, index: number) => (
          <div
            key={index?.toString()}
            className={`flex ${
              message?.senderId === userId ? "justify-end" : "justify-start"
            } animate-in slide-in-from-bottom-4 fade-in duration-500`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`
                      max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-6 py-4 rounded-3xl relative overflow-hidden shadow-lg
                      ${
                        message?.senderId === userId
                          ? "bg-blue-900 text-white rounded-br-lg"
                          : "bg-white text-gray-800 rounded-bl-lg border border-gray-100"
                      }
                      backdrop-blur-sm hover:shadow-xl transition-all duration-300 group
                    `}
            >
              <div className="flex items-start space-x-3 relative z-10">
                <div
                  className={`
                          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                          ${
                            message?.senderId === userId
                              ? "bg-white/20 backdrop-blur-sm"
                              : "bg-blue-100"
                          }
                        `}
                >
                  {message?.senderId === userId ? (
                    <RiUser3Line
                      className={`w-4 h-4 ${
                        message?.senderId === userId
                          ? "text-white"
                          : "text-blue-900"
                      }`}
                    />
                  ) : (
                    <RiUser3Line className="w-4 h-4 text-blue-900" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {message?.text}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message?.senderId === userId
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message?.timestamp)}
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
