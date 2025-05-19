import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  error
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <button
              type="button"
              id={name}
              onClick={() => !disabled && onChange(!checked)}
              className={`
                w-5 h-5 rounded border flex items-center justify-center
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${checked 
                  ? 'bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600' 
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                }
                ${error ? 'border-red-500' : ''}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200
              `}
              aria-checked={checked}
              role="checkbox"
            >
              {checked && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>
          <div className="ml-3 text-sm">
            <label 
              htmlFor={name} 
              className={`font-medium ${disabled ? 'opacity-50' : ''}`}
            >
              {label}
            </label>
          </div>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};