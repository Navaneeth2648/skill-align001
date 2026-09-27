import React from 'react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading verified government records...',
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`p-10 flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="relative w-8 h-8">
        <div className="w-8 h-8 rounded-full border-2 border-[#102c49]/20 dark:border-sky-400/20 border-t-[#102c49] dark:border-t-sky-400 animate-spin" />
      </div>
      <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
};
