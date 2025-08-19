import React from 'react';

const Badge = ({ 
  children, 
  variant = "default",
  size = "md",
  rounded = "full",
  animated = false,
  className = "",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300";
  
  const variants = {
    default: "bg-slate-100 text-slate-800 border border-slate-200",
    primary: "bg-purple-100 text-purple-800 border border-purple-200",
    secondary: "bg-slate-100 text-slate-800 border border-slate-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200",
    purple: "bg-purple-100 text-purple-800 border border-purple-200",
    cyan: "bg-cyan-100 text-cyan-800 border border-cyan-200",
    pink: "bg-pink-100 text-pink-800 border border-pink-200",
    indigo: "bg-indigo-100 text-indigo-800 border border-indigo-200",
    teal: "bg-teal-100 text-teal-800 border border-teal-200",
    orange: "bg-orange-100 text-orange-800 border border-orange-200",
    emerald: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    rose: "bg-rose-100 text-rose-800 border border-rose-200",
    // Solid variants
    "solid-default": "bg-slate-600 text-white border border-slate-600",
    "solid-primary": "bg-purple-600 text-white border border-purple-600",
    "solid-success": "bg-green-600 text-white border border-green-600",
    "solid-warning": "bg-yellow-600 text-white border border-yellow-600",
    "solid-danger": "bg-red-600 text-white border border-red-600",
    "solid-info": "bg-blue-600 text-white border border-blue-600",
    // Gradient variants
    "gradient-primary": "bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0",
    "gradient-success": "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0",
    "gradient-warning": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0",
    "gradient-danger": "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0",
    "gradient-info": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-sm",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
    xl: "px-5 py-2.5 text-lg"
  };

  const roundedVariants = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
  };

  const animationClasses = animated ? "hover:scale-105 hover:shadow-md" : "";

  return (
    <span 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${roundedVariants[rounded]} ${animationClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Status Badge
const StatusBadge = ({ 
  status = "active",
  size = "md",
  showDot = true,
  className = "",
  ...props 
}) => {
  const statusConfig = {
    active: {
      text: "Active",
      variant: "success",
      dotColor: "bg-green-500"
    },
    inactive: {
      text: "Inactive",
      variant: "default",
      dotColor: "bg-slate-400"
    },
    pending: {
      text: "Pending",
      variant: "warning",
      dotColor: "bg-yellow-500"
    },
    completed: {
      text: "Completed",
      variant: "success",
      dotColor: "bg-green-500"
    },
    failed: {
      text: "Failed",
      variant: "danger",
      dotColor: "bg-red-500"
    },
    processing: {
      text: "Processing",
      variant: "info",
      dotColor: "bg-blue-500"
    },
    locked: {
      text: "Locked",
      variant: "default",
      dotColor: "bg-slate-500"
    },
    unlocked: {
      text: "Unlocked",
      variant: "success",
      dotColor: "bg-green-500"
    }
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <Badge 
      variant={config.variant} 
      size={size} 
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      {showDot && (
        <div className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse`}></div>
      )}
      {config.text}
    </Badge>
  );
};

// Progress Badge
const ProgressBadge = ({ 
  progress = 0,
  total = 100,
  size = "md",
  showPercentage = true,
  className = "",
  ...props 
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  
  let variant = "default";
  if (percentage >= 80) variant = "success";
  else if (percentage >= 60) variant = "info";
  else if (percentage >= 40) variant = "warning";
  else if (percentage >= 20) variant = "danger";

  return (
    <Badge 
      variant={variant} 
      size={size} 
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
      {showPercentage ? `${Math.round(percentage)}%` : `${progress}/${total}`}
    </Badge>
  );
};

// Count Badge
const CountBadge = ({ 
  count = 0,
  max = 99,
  size = "md",
  variant = "primary",
  className = "",
  ...props 
}) => {
  const displayCount = count > max ? `${max}+` : count;
  const isZero = count === 0;

  return (
    <Badge 
      variant={isZero ? "default" : variant} 
      size={size} 
      className={`min-w-[1.5em] justify-center ${className}`}
      {...props}
    >
      {displayCount}
    </Badge>
  );
};

// Icon Badge
const IconBadge = ({ 
  icon,
  children,
  size = "md",
  variant = "default",
  className = "",
  ...props 
}) => {
  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6"
  };

  return (
    <Badge 
      variant={variant} 
      size={size} 
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      <span className={iconSizes[size]}>{icon}</span>
      {children}
    </Badge>
  );
};

// Removable Badge
const RemovableBadge = ({ 
  children,
  onRemove,
  variant = "default",
  size = "md",
  className = "",
  ...props 
}) => {
  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-4 h-4",
    xl: "w-5 h-5"
  };

  return (
    <Badge 
      variant={variant} 
      size={size} 
      className={`flex items-center gap-1 pr-1 ${className}`}
      {...props}
    >
      <span>{children}</span>
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors duration-200"
      >
        <span className={`${iconSizes[size]} text-current`}>×</span>
      </button>
    </Badge>
  );
};

// Learning Platform Specific Badges
const CourseBadge = ({ 
  level = "beginner",
  size = "md",
  className = "",
  ...props 
}) => {
  const levelConfig = {
    beginner: { text: "Beginner", variant: "success" },
    intermediate: { text: "Intermediate", variant: "warning" },
    advanced: { text: "Advanced", variant: "danger" },
    expert: { text: "Expert", variant: "gradient-primary" }
  };

  const config = levelConfig[level] || levelConfig.beginner;

  return (
    <Badge 
      variant={config.variant} 
      size={size} 
      className={className}
      {...props}
    >
      {config.text}
    </Badge>
  );
};

const CategoryBadge = ({ 
  category = "general",
  size = "md",
  className = "",
  ...props 
}) => {
  const categoryConfig = {
    technology: { text: "Technology", variant: "info" },
    business: { text: "Business", variant: "primary" },
    design: { text: "Design", variant: "pink" },
    marketing: { text: "Marketing", variant: "purple" },
    finance: { text: "Finance", variant: "emerald" },
    health: { text: "Health", variant: "success" },
    education: { text: "Education", variant: "cyan" },
    general: { text: "General", variant: "default" }
  };

  const config = categoryConfig[category] || categoryConfig.general;

  return (
    <Badge 
      variant={config.variant} 
      size={size} 
      className={className}
      {...props}
    >
      {config.text}
    </Badge>
  );
};

export {
  Badge,
  StatusBadge,
  ProgressBadge,
  CountBadge,
  IconBadge,
  RemovableBadge,
  CourseBadge,
  CategoryBadge
};

export default Badge;
