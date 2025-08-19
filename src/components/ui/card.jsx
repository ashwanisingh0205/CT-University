import React from 'react';

const Card = ({ 
  children, 
  className = "", 
  variant = "default",
  hover = true,
  animated = true,
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden transition-all duration-500 ease-out";
  
  const variants = {
    default: "bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl hover:shadow-purple-500/20",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
    dark: "bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl hover:shadow-purple-500/30",
    gradient: "bg-gradient-to-br from-purple-50/90 to-cyan-50/90 backdrop-blur-xl border border-purple-200/50 shadow-2xl",
    elevated: "bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl hover:shadow-2xl hover:shadow-purple-500/30"
  };

  const hoverClasses = hover ? "hover:scale-[1.02] hover:-translate-y-1" : "";
  const animatedClasses = animated ? "animate-fade-in-up" : "";

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${animatedClasses} ${className}`}
      {...props}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #a855f7 2px, transparent 2px),
                          radial-gradient(circle at 75% 75%, #06b6d4 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover effect line */}
      {hover && (
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      )}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-bold text-slate-900 mb-2 ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-slate-600 text-lg ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

// Specialized card variants for learning platform
const LearningCard = ({ 
  title, 
  description, 
  icon, 
  progress, 
  status = "active",
  onClick,
  className = "",
  ...props 
}) => {
  const statusColors = {
    active: "bg-green-500",
    pending: "bg-yellow-500",
    completed: "bg-blue-500",
    locked: "bg-gray-500"
  };

  const statusText = {
    active: "Active",
    pending: "Pending",
    completed: "Completed",
    locked: "Locked"
  };

  return (
    <Card 
      variant="elevated" 
      className={`cursor-pointer group ${className}`}
      onClick={onClick}
      {...props}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className={`w-3 h-3 rounded-full ${statusColors[status]} animate-pulse`}></div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {progress !== undefined && (
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Progress</span>
              <span className="text-slate-900 font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="progress-bar h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      )}
      
      <CardFooter>
        <span className="text-sm text-slate-500">{statusText[status]}</span>
        <div className="text-purple-500 group-hover:translate-x-1 transition-transform duration-300">
          →
        </div>
      </CardFooter>
    </Card>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  trend = "up",
  className = "",
  ...props 
}) => {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-slate-600"
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→"
  };

  return (
    <Card variant="default" className={className} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-cyan-100 flex items-center justify-center text-purple-600">
            {icon}
          </div>
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {trendIcons[trend]} {change}
          </span>
        </div>
        <CardTitle className="text-3xl font-bold text-slate-900">{value}</CardTitle>
        <CardDescription className="text-sm text-slate-600">{title}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, LearningCard, StatsCard };
export default Card; 