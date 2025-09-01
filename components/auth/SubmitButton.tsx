import React from "react";
import { RiLoader4Line, RiShieldCheckLine } from "react-icons/ri";

const SubmitButton = ({
  isLoading,
  isFormValid,
  title,
}: {
  isLoading: boolean;
  isFormValid: boolean;
  title: string;
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || !isFormValid}
      className={`
                  w-full py-3 rounded-2xl font-bold text-lg transition-all duration-500 transform-gpu
                  relative overflow-hidden group
                  ${
                    isLoading || !isFormValid
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-900 text-white hover:bg-blue-800 hover:scale-[1.02] shadow-xl hover:shadow-blue-900/25"
                  }
                `}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 animate-pulse"></div>
      )}
      <div className="flex items-center text-sm justify-center space-x-3 relative z-10">
        {isLoading ? (
          <>
            <RiLoader4Line className="w-6 h-6 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>{title}</span>
          </>
        )}
      </div>
      {!isLoading && (
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </button>
  );
};

export default SubmitButton;
