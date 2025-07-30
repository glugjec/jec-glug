import React, { useState, useEffect } from 'react';


// Temporary x API key
const TEMP_XAPI_KEY = "demo-xapi-key-123";
const SESSION_KEY = "xapi_session";
const SESSION_DURATION = 10 * 60 * 1000; 

const ConfirmationModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "default"
}) => {
  const [xapiKey, setXapiKey] = useState("");
  const [error, setError] = useState("");
  const [sessionActive, setSessionActive] = useState(false);

  // Check session o
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (session && session.key === TEMP_XAPI_KEY && Date.now() < session.expiry) {
      setSessionActive(true);
    } else {
      setSessionActive(false);
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [isOpen]);

  // Handle expiry
  useEffect(() => {
    if (!sessionActive) return;
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (!session) return;
    const timeout = setTimeout(() => {
      sessionStorage.removeItem(SESSION_KEY);
      setSessionActive(false);
      setXapiKey("");
    }, session.expiry - Date.now());
    return () => clearTimeout(timeout);
  }, [sessionActive]);

  const getConfirmButtonStyle = () => {
    switch (type) {
      case "danger":
        return "bg-red-500 hover:bg-red-600 focus:ring-red-500";
      default:
        return "bg-green-500 hover:bg-green-600 focus:ring-green-500";
    }
  };

  //da compare here

  const handleConfirm = () => {
    if (!sessionActive) {
      if (xapiKey !== TEMP_XAPI_KEY) {
        setError("Invalid X-API Key");
        setXapiKey("");
        return;
      }
      // Set session
      const expiry = Date.now() + SESSION_DURATION;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ key: xapiKey, expiry }));
      setSessionActive(true);
      setError("");
    }
    onConfirm();
  };

  /*
  for access xapi to pass in header

  const session = JSON.parse(sessionStorage.getItem('xapi_session'));
  const xapiKey = session?.key;
  
  */

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSessionActive(false);
    setXapiKey("");
    setError("");
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md border border-white/20 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/20 mb-4">
            {type === "danger" ? (
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-blue-200 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed break-words">
            {message}
          </p>
          
          {!sessionActive && (
            <div className="mb-4">
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-900 text-sm mb-1"
                placeholder="Enter X-API Key"
                value={xapiKey}
                onChange={e => { setXapiKey(e.target.value); setError(""); }}
                autoFocus
              />
              {error && <div className="text-red-400 text-xs mt-1">{error}</div>}
            </div>
          )}
          
          {sessionActive && (
            <div className="mb-4 flex flex-col items-center">
              <span className="text-green-300 text-xs mb-1">X-API Key session active</span>
              <button
                onClick={handleLogout}
                className="text-xs text-red-400 underline hover:text-red-500 focus:outline-none"
              >Logout</button>
            </div>
          )}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 text-white px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 text-sm sm:text-base ${getConfirmButtonStyle()}`}
              disabled={!sessionActive && !xapiKey}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
