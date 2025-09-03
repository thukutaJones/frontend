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
        {messages.map((message: any, index: number) => {
          // Determine if message is from the current user/HOD
          const isOwnMessage =
            (message.sender === "hod" && type === "hod") ||
            (message.sender === "user" &&
              ((message.user && message.user.toString() === userId) ||
                (message.userDeviceId && message.userDeviceId === userId)));

          // Determine if message is from a HOD (for patient view)
          const isHodMessage =
            message.sender === "hod" && !isOwnMessage;

          return (
            <div
              key={index?.toString()}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-4 fade-in duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`
                  max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-6 py-4 rounded-3xl relative overflow-hidden shadow-lg
                  ${
                    isOwnMessage
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
                        isOwnMessage
                          ? "bg-white/20 backdrop-blur-sm"
                          : "bg-blue-100"
                      }
                    `}
                  >
                    {message.sender === "bot" ? (
                      <RiRobot2Line
                        className={`w-4 h-4 ${
                          isOwnMessage ? "text-white" : "text-blue-900"
                        }`}
                      />
                    ) : (
                      <RiUser3Line
                        className={`w-4 h-4 ${
                          isOwnMessage ? "text-white" : "text-blue-900"
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Optional: show who sent this message */}
                    {isHodMessage && message.metadata?.escalatedDept && (
                      <span className="text-xs text-gray-400 font-semibold mb-1 inline-block">
                        Response from HOD - {message.metadata.escalatedDept}
                      </span>
                    )}

                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>

                    <p
                      className={`text-xs mt-2 ${
                        isOwnMessage ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && <TypingIndicator />}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
