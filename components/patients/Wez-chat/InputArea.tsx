import React from "react";
import { RiMicLine, RiSendPlaneFill } from "react-icons/ri";
import Recorder from "./Recorder";

const InputArea = ({
  setInputText,
  inputRef,
  handleKeyPress,
  inputText,
  handleSendMessage,
  type,
  uploadAudio,
  isProcessing,
}: {
  setInputText: any;
  inputRef: any;
  handleKeyPress: any;
  inputText: any;
  handleSendMessage: any;
  type: string;
  uploadAudio?: any;
  isProcessing?: boolean;
}) => {
  return (
    <div className="bg-white/80 z-60 backdrop-blur-xl border-t border-gray-200/50 p-4 md:p-6 sticky bottom-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3 md:space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl md:rounded-3xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm md:text-base shadow-sm hover:shadow-md"
            />
          </div>

          {/* Voice/Send Toggle */}
          {inputText.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-3 md:p-4 bg-blue-900 text-white rounded-2xl md:rounded-3xl hover:bg-blue-800 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-900/25 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <RiSendPlaneFill className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          ) : (
            type == "bot" && (
              <Recorder uploadAudio={uploadAudio} isProcessing={isProcessing || false} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default InputArea;
