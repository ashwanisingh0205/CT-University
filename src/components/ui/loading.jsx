import React from 'react';

// Main Loading Spinner
const Spinner = ({ 
  size = "md", 
  color = "purple", 
  className = "",
  ...props 
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colors = {
    purple: "border-purple-500",
    cyan: "border-cyan-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
    blue: "border-blue-500"
  };

  return (
    <div 
      className={`${sizes[size]} ${colors[color]} border-2 border-t-transparent rounded-full animate-spin ${className}`}
      {...props}
    />
  );
};

// Pulse Loading
const Pulse = ({ 
  size = "md", 
  color = "purple", 
  className = "",
  ...props 
}) => {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-6 h-6"
  };

  const colors = {
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500"
  };

  return (
    <div className={`flex space-x-2 ${className}`} {...props}>
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse`} style={{animationDelay: '0ms'}}></div>
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse`} style={{animationDelay: '150ms'}}></div>
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse`} style={{animationDelay: '300ms'}}></div>
    </div>
  );
};

// Skeleton Loading
const Skeleton = ({ 
  className = "", 
  lines = 1,
  ...props 
}) => {
  return (
    <div className={`animate-pulse ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index} 
          className={`bg-slate-200 rounded h-4 mb-3 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
};

// Progress Bar
const ProgressBar = ({ 
  progress = 0, 
  total = 100,
  size = "md",
  variant = "default",
  showLabel = true,
  animated = true,
  className = "",
  ...props 
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
    xl: "h-6"
  };

  const variants = {
    default: "bg-gradient-to-r from-purple-500 to-cyan-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
    danger: "bg-gradient-to-r from-red-500 to-pink-500",
    info: "bg-gradient-to-r from-blue-500 to-cyan-500"
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">Progress</span>
          <span className="text-sm font-semibold text-slate-900">{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div className={`w-full bg-slate-200 rounded-full ${sizes[size]} overflow-hidden`}>
        <div 
          className={`${variants[variant]} ${sizes[size]} rounded-full transition-all duration-1000 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular Progress
const CircularProgress = ({ 
  progress = 0, 
  total = 100,
  size = "md",
  variant = "default",
  showLabel = true,
  strokeWidth = 4,
  className = "",
  ...props 
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  const radius = 50 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  };

  const variants = {
    default: "stroke-purple-500",
    success: "stroke-green-500",
    warning: "stroke-yellow-500",
    danger: "stroke-red-500",
    info: "stroke-blue-500"
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`} {...props}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-200"
        />
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={variants[variant]}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out'
          }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-900">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};

// Loading States
const LoadingState = ({ 
  type = "spinner",
  size = "md",
  color = "purple",
  text = "Loading...",
  className = "",
  ...props 
}) => {
  const loaders = {
    spinner: <Spinner size={size} color={color} />,
    pulse: <Pulse size={size} color={color} />,
    skeleton: <Skeleton lines={3} />
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`} {...props}>
      {loaders[type]}
      {text && (
        <p className="text-slate-600 text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

// Page Loading
const PageLoader = ({ 
  message = "Loading your learning experience...",
  className = "",
  ...props 
}) => {
  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 ${className}`} {...props}>
      <div className="text-center">
        {/* Animated logo or icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center animate-pulse">
          <span className="text-3xl text-white">📚</span>
        </div>
        
        {/* Loading spinner */}
        <div className="mb-6">
          <Spinner size="lg" color="purple" />
        </div>
        
        {/* Message */}
        <p className="text-white text-lg font-medium animate-pulse">{message}</p>
        
        {/* Progress dots */}
        <div className="mt-4">
          <Pulse size="md" color="purple" />
        </div>
      </div>
    </div>
  );
};

// Content Loading
const ContentLoader = ({ 
  type = "skeleton",
  lines = 3,
  className = "",
  ...props 
}) => {
  if (type === "skeleton") {
    return <Skeleton lines={lines} className={className} {...props} />;
  }
  
  return (
    <div className={`flex items-center justify-center py-8 ${className}`} {...props}>
      <LoadingState type="spinner" size="md" text="Loading content..." />
    </div>
  );
};

export {
  Spinner,
  Pulse,
  Skeleton,
  ProgressBar,
  CircularProgress,
  LoadingState,
  PageLoader,
  ContentLoader
};

export default LoadingState;
