import React, { useState, useEffect } from 'react';

// Toast Notification
const Toast = ({ 
  type = "info",
  title,
  message,
  duration = 5000,
  onClose,
  className = "",
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  const types = {
    success: {
      icon: "✅",
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    error: {
      icon: "❌",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    warning: {
      icon: "⚠️",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    info: {
      icon: "ℹ️",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  };

  const currentType = types[type];

  if (!isVisible) return null;

  return (
    <div 
      className={`transform transition-all duration-300 ease-out ${
        isExiting ? 'translate-x-full opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'
      } ${className}`}
      {...props}
    >
      <div className={`max-w-sm w-full bg-white shadow-lg rounded-xl border ${currentType.border} ${currentType.bg} backdrop-blur-xl`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${currentType.iconBg} flex items-center justify-center`}>
              <span className="text-lg">{currentType.icon}</span>
            </div>
            
            <div className="ml-3 flex-1">
              {title && (
                <p className={`text-sm font-medium ${currentType.text}`}>
                  {title}
                </p>
              )}
              {message && (
                <p className={`mt-1 text-sm ${currentType.text}`}>
                  {message}
                </p>
              )}
            </div>
            
            <button
              onClick={handleClose}
              className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <span className="text-lg">×</span>
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        {duration > 0 && (
          <div className="h-1 bg-slate-200 rounded-b-xl overflow-hidden">
            <div 
              className={`h-full ${currentType.iconBg} transition-all duration-300 ease-linear`}
              style={{ 
                width: isExiting ? '0%' : '100%',
                transitionDuration: `${duration}ms`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Toast Container
const ToastContainer = ({ 
  toasts = [],
  position = "top-right",
  className = "",
  ...props 
}) => {
  const positions = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2"
  };

  return (
    <div 
      className={`fixed z-50 space-y-3 ${positions[position]} ${className}`}
      {...props}
    >
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          {...toast}
          onClose={() => toast.onClose && toast.onClose()}
        />
      ))}
    </div>
  );
};

// Alert Component
const Alert = ({ 
  type = "info",
  title,
  children,
  onClose,
  className = "",
  ...props 
}) => {
  const types = {
    success: {
      icon: "✅",
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    error: {
      icon: "❌",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    warning: {
      icon: "⚠️",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    info: {
      icon: "ℹ️",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  };

  const currentType = types[type];

  return (
    <div 
      className={`rounded-xl border ${currentType.border} ${currentType.bg} p-4 ${className}`}
      {...props}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${currentType.iconBg} flex items-center justify-center`}>
          <span className="text-sm">{currentType.icon}</span>
        </div>
        
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${currentType.text}`}>
              {title}
            </h3>
          )}
          <div className={`mt-2 text-sm ${currentType.text}`}>
            {children}
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <span className="text-lg">×</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Banner Component
const Banner = ({ 
  type = "info",
  title,
  children,
  onClose,
  className = "",
  ...props 
}) => {
  const types = {
    success: {
      bg: "bg-green-600",
      text: "text-white",
      icon: "✅"
    },
    error: {
      bg: "bg-red-600",
      text: "text-white",
      icon: "❌"
    },
    warning: {
      bg: "bg-yellow-600",
      text: "text-white",
      icon: "⚠️"
    },
    info: {
      bg: "bg-blue-600",
      text: "text-white",
      icon: "ℹ️"
    }
  };

  const currentType = types[type];

  return (
    <div 
      className={`${currentType.bg} ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg">
              <span className="text-lg">{currentType.icon}</span>
            </span>
            <p className={`ml-3 font-medium ${currentType.text}`}>
              <span className="md:hidden">{title}</span>
              <span className="hidden md:inline">{children}</span>
            </p>
          </div>
          
          {onClose && (
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                onClick={onClose}
                className={`-mr-1 flex p-2 rounded-md ${currentType.text} hover:bg-opacity-20 hover:bg-black transition-colors duration-200`}
              >
                <span className="text-lg">×</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Notification Hook
const useNotification = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (title, message) => {
    return addToast({ type: 'success', title, message });
  };

  const showError = (title, message) => {
    return addToast({ type: 'error', title, message });
  };

  const showWarning = (title, message) => {
    return addToast({ type: 'warning', title, message });
  };

  const showInfo = (title, message) => {
    return addToast({ type: 'info', title, message });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export {
  Toast,
  ToastContainer,
  Alert,
  Banner,
  useNotification
};

export default Toast;
