import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showValue = true,
  size = 'md',
  color = 'primary'
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const getHeightClass = () => {
    switch (size) {
      case 'sm': return 'h-1';
      case 'lg': return 'h-4';
      case 'md':
      default: return 'h-2';
    }
  };
  
  const getColorClass = () => {
    switch (color) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'primary':
      default: return 'bg-blue-500';
    }
  };
  
  return (
    <div className="w-full">
      <div className="relative">
        <div className={`w-full ${getHeightClass()} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
          <div 
            className={`${getHeightClass()} ${getColorClass()} rounded-full transition-all duration-300 ease-in-out`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
      
      {showValue && (
        <div className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};