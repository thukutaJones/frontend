import { useState } from "react";
import { FiX } from "react-icons/fi";

type MultiTextInputProps = {
  values: string[];
  onChange: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  optional?: boolean;
};

const MultiTextInput = ({
  values,
  onChange,
  label = "Enter items",
  placeholder = "Type and press Enter...",
  optional = false,
}: MultiTextInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAdd(inputValue);
    }
  };

  const removeItem = (val: string) => {
    onChange(values.filter((v) => v !== val));
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          {label}{" "}
          {optional && (
            <span className="text-gray-500 font-normal">(optional)</span>
          )}
        </label>
      )}
      <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-3 focus-within:border-blue-400 focus-within:shadow-lg transition-all duration-200">
        <div className="flex flex-wrap gap-2 mb-2">
          {values.map((val) => (
            <span
              key={val}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              {val}
              <button
                type="button"
                className="text-blue-100 hover:text-white hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                onClick={() => removeItem(val)}
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full focus:outline-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400 placeholder:italic"
        />
      </div>
    </div>
  );
};

export default MultiTextInput;  