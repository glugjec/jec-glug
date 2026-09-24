import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorAlert = ({ message = 'Something went wrong while fetching data.', onRetry }) => {
  return (
    <div
      role="alert"
      className="max-w-xl mx-auto my-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 backdrop-blur-md text-red-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
    >
      <div className="flex items-center gap-3 text-center sm:text-left">
        <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-red-200">{message}</p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md cursor-pointer flex-shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
