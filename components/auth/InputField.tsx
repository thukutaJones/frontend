import React from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  icon: any;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  disabled = false,
  showPasswordToggle = false,
  showPassword,
  onTogglePassword,
}) => {
    const Icon = icon;
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-gray-700 font-semibold text-sm"
      >
        {label}
      </label>
      <div className="relative">
        {/* Left Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Icon  className="w-5 h-5 text-gray-400"/>
        </div>

        {/* Input */}
        <input
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full ${showPasswordToggle ? "pl-12 pr-12" : "pl-12 pr-4"} py-3
            rounded-2xl border-2 transition-all duration-300
            bg-white/70 backdrop-blur-sm font-medium
            focus:outline-none focus:ring-0 focus:scale-[1.02]
            ${
              error
                ? "border-red-300 focus:border-red-400"
                : "border-gray-200 focus:border-blue-400"
            }
            placeholder:text-gray-400
          `}
          placeholder={placeholder}
          disabled={disabled}
        />

        {/* Password Toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={disabled}
          >
            {showPassword ? (
              <RiEyeOffLine className="w-5 h-5" />
            ) : (
              <RiEyeLine className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
    </div>
  );
};

export default InputField;
