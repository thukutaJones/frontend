import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // or react-icons if you prefer

const FormField = ({
  wid,
  title,
  placeholder,
  value,
  type = "text",
  textStyles,
  handleChangeText,
}: {
  wid?: string;
  title: string;
  placeholder: string;
  value: string;
  type?: string;
  textStyles?: string;
  handleChangeText: (event: any) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`${wid} relative`}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {title}
      </label>
      <div className="relative">
        <input
          required
          type={
            isPassword && !showPassword
              ? "password"
              : type === "date"
              ? "date"
              : "text"
          }
          value={value}
          onChange={handleChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-4 pr-12 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl 
          focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
          transition-all duration-300 text-gray-800 placeholder-gray-500
          ${textStyles || ""}`}
        />

        {/* Toggle password visibility */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-900 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
