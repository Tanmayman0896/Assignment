import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500 dark:bg-green-600',
          icon: <CheckCircle className="h-5 w-5 text-white" />
        };
      case 'error':
        return {
          bg: 'bg-red-500 dark:bg-red-600',
          icon: <AlertCircle className="h-5 w-5 text-white" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500 dark:bg-yellow-600',
          icon: <AlertTriangle className="h-5 w-5 text-white" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-500 dark:bg-blue-600',
          icon: <Info className="h-5 w-5 text-white" />
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`${styles.bg} text-white rounded-lg shadow-lg p-4 flex items-center max-w-md`}>
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            type="button"
            className="inline-flex text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};