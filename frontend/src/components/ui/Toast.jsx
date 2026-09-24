import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({
  message,
  type = 'info', // 'success' | 'error' | 'info'
  duration = 4000,
  onClose
}) => {
  useEffect(() => {
    if (!message || !duration || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
    error: 'bg-red-950/90 border-red-500/50 text-red-200',
    info: 'bg-blue-950/90 border-blue-500/50 text-blue-200',
  };

  const IconComponent = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[type] || Info;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 max-w-md ${typeStyles[type] || typeStyles.info
        }`}
    >
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
