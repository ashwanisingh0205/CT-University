import React from 'react';

const Button = ({ 
  children, 
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  className = "",
  onClick,
  ...props 
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-1 focus:ring-purple-500",
    secondary: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-slate-500",
    outline: "bg-transparent border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white hover:-translate-y-1 focus:ring-purple-500",
    ghost: "bg-transparent text-purple-600 hover:bg-purple-50 hover:-translate-y-1 focus:ring-purple-500",
    success: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-1 focus:ring-green-500",
    danger: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-1 focus:ring-red-500",
    warning: "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 hover:-translate-y-1 focus:ring-yellow-500"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7"
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <div className={`spinner ${iconSizes[size]}`}></div>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className={`${iconSizes[size]} flex-shrink-0`}>
                {icon}
              </span>
            )}
            <span>{children}</span>
            {icon && iconPosition === "right" && (
              <span className={`${iconSizes[size]} flex-shrink-0`}>
                {icon}
              </span>
            )}
          </>
        )}
      </div>
    </button>
  );
};

// Specialized button variants for learning platform
const ActionButton = ({ 
  children, 
  action = "primary",
  className = "",
  ...props 
}) => {
  const actionVariants = {
    primary: "primary",
    secondary: "secondary",
    success: "success",
    danger: "danger",
    warning: "warning"
  };

  return (
    <Button 
      variant={actionVariants[action]} 
      className={`group ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

const IconButton = ({ 
  icon, 
  size = "md",
  variant = "primary",
  className = "",
  ...props 
}) => {
  const iconButtonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
    xl: "w-16 h-16"
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${iconButtonSizes[size]} p-0 ${className}`}
      {...props}
    >
      <span className="text-xl">{icon}</span>
    </Button>
  );
};

const FloatingButton = ({ 
  icon, 
  onClick, 
  className = "",
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center ${className}`}
      {...props}
    >
      <span className="text-2xl">{icon}</span>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
    </button>
  );
};

const ToggleButton = ({ 
  active, 
  onChange, 
  children, 
  className = "",
  ...props 
}) => {
  return (
    <button
      onClick={() => onChange(!active)}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        active 
          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button, ActionButton, IconButton, FloatingButton, ToggleButton };
export default Button;
