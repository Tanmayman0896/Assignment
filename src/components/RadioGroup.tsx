import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  disabled?: boolean;
  error?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
  error
}) => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <button
              type="button"
              id={`${name}-${option.value}`}
              onClick={() => !disabled && onChange(option.value)}
              className={`
                w-4 h-4 rounded-full border flex items-center justify-center
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${value === option.value 
                  ? 'border-blue-500 dark:border-blue-600' 
                  : 'border-gray-300 dark:border-gray-600'
                }
                ${error ? 'border-red-500' : ''}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200
              `}
              aria-checked={value === option.value}
              role="radio"
            >
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-600" />
              )}
            </button>
            <label 
              htmlFor={`${name}-${option.value}`} 
              className={`ml-3 text-sm ${disabled ? 'opacity-50' : ''}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};