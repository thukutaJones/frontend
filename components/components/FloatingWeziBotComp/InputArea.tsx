import React from "react";
import { RiMicLine, RiSendPlaneFill } from "react-icons/ri";

const InputArea = ({
  inputRef,
  setInputText,
  inputText,
  handleKeyPress,
  handleSendMessage,
  toggleRecording,
  isRecording
}: {
  inputRef: any;
  setInputText: any;
  inputText: string;
  handleKeyPress: any;
  handleSendMessage: any;
  isRecording: any;
  toggleRecording: any
}) => {
  return (
    <div className="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm"
          />
        </div>

        {/* Voice/Send Toggle */}
        {inputText.trim() ? (
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-900/25 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <RiSendPlaneFill className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        ) : (
          <button
            onClick={toggleRecording}
            className={`
                    p-3 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg group relative overflow-hidden
                    ${
                      isRecording
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-gray-100 text-gray-600 hover:bg-blue-900 hover:text-white"
                    }
                  `}
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <RiMicLine className="w-5 h-5 relative z-10 transition-all duration-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputArea;
