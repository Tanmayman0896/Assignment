import React from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-400 dark:border-green-700',
          text: 'text-green-800 dark:text-green-400',
          icon: <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-400 dark:border-red-700',
          text: 'text-red-800 dark:text-red-400',
          icon: <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-400 dark:border-yellow-700',
          text: 'text-yellow-800 dark:text-yellow-400',
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-400 dark:border-blue-700',
          text: 'text-blue-800 dark:text-blue-400',
          icon: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`rounded-md border p-4 ${styles.bg} ${styles.border}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.text}`}>{title}</h3>
          )}
          <div className={`text-sm ${styles.text} ${title ? 'mt-1' : ''}`}>
            {message}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`
                  inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${styles.text} hover:bg-opacity-20 hover:bg-gray-500
                `}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};