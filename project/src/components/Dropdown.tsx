import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasError = !!error;
  
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <div className="space-y-1 relative">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <button
        type="button"
        id={name}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-3 py-2 rounded-md border text-left flex justify-between items-center
          ${hasError 
            ? 'border-red-500' 
            : 'border-gray-300 dark:border-gray-600'
          }
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500
          transition-all duration-200
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!selectedOption ? 'text-gray-400 dark:text-gray-500' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <ul 
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                ${value === option.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};