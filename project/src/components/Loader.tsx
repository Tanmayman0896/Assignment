import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary'
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4 border-2';
      case 'lg':
        return 'w-8 h-8 border-4';
      case 'md':
      default:
        return 'w-6 h-6 border-3';
    }
  };
  
  const getColorClasses = () => {
    switch (color) {
      case 'white':
        return 'border-white border-t-transparent';
      case 'primary':
      default:
        return 'border-blue-500 border-t-transparent dark:border-blue-400';
    }
  };
  
  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${getSizeClasses()}
          ${getColorClasses()}
          rounded-full animate-spin
        `}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};