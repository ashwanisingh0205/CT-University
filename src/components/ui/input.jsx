import React, { useState, forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  placeholder,
  type = "text",
  variant = "default",
  size = "md",
  error,
  success,
  icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  required = false,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const baseClasses = "relative w-full transition-all duration-300 ease-out";
  
  const variants = {
    default: "bg-white/90 backdrop-blur-sm border-2 border-slate-200 focus:border-purple-500 hover:border-purple-300",
    outline: "bg-transparent border-2 border-slate-300 focus:border-purple-500 hover:border-slate-400",
    filled: "bg-slate-50 border-2 border-transparent focus:border-purple-500 hover:bg-slate-100",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 focus:border-purple-400 hover:border-white/30"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
    xl: "px-6 py-5 text-xl"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7"
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  const getStatusClasses = () => {
    if (error) return "border-red-500 focus:border-red-500";
    if (success) return "border-green-500 focus:border-green-500";
    return "";
  };

  const getStatusIcon = () => {
    if (error) return "❌";
    if (success) return "✅";
    return null;
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2 transition-colors duration-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10">
            <span className={iconSizes[size]}>{icon}</span>
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-xl transition-all duration-300 ease-out
            ${variants[variant]} ${sizes[size]} ${getStatusClasses()}
            ${icon && iconPosition === "left" ? "pl-10" : ""}
            ${icon && iconPosition === "right" ? "pr-10" : ""}
            ${getStatusIcon() ? "pr-10" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : ""}
            ${isFocused ? "shadow-lg shadow-purple-500/20 scale-[1.02]" : ""}
            focus:outline-none focus:ring-2 focus:ring-purple-500/20
            placeholder:text-slate-400
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Right Icon or Status Icon */}
        {(icon && iconPosition === "right") || getStatusIcon() ? (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
            {getStatusIcon() || (icon && iconPosition === "right" && (
              <span className={`${iconSizes[size]} text-slate-400`}>{icon}</span>
            ))}
          </div>
        ) : null}

        {/* Focus Line */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 transition-transform duration-300 origin-left ${
          isFocused ? "scale-x-100" : ""
        }`}></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600 animate-fade-in-up">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-2 text-sm text-green-600 animate-fade-in-up">
          {success}
        </div>
      )}
    </div>
  );
});

// Specialized input variants for learning platform
const SearchInput = ({ 
  onSearch, 
  placeholder = "Search courses, lessons...",
  className = "",
  ...props 
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon="🔍"
          iconPosition="left"
          variant="filled"
          className="pr-20"
          {...props}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105"
        >
          Search
        </button>
      </div>
    </form>
  );
};

const TextArea = forwardRef(({ 
  label,
  placeholder,
  rows = 4,
  variant = "default",
  size = "md",
  error,
  success,
  className = "",
  disabled = false,
  required = false,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = "relative w-full transition-all duration-300 ease-out";
  
  const variants = {
    default: "bg-white/90 backdrop-blur-sm border-2 border-slate-200 focus:border-purple-500 hover:border-purple-300",
    outline: "bg-transparent border-2 border-slate-300 focus:border-purple-500 hover:border-slate-400",
    filled: "bg-slate-50 border-2 border-transparent focus:border-purple-500 hover:bg-slate-100",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 focus:border-purple-400 hover:border-white/30"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
    xl: "px-6 py-5 text-xl"
  };

  const getStatusClasses = () => {
    if (error) return "border-red-500 focus:border-red-500";
    if (success) return "border-green-500 focus:border-green-500";
    return "";
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2 transition-colors duration-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <textarea
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full rounded-xl transition-all duration-300 ease-out resize-none
          ${variants[variant]} ${sizes[size]} ${getStatusClasses()}
          ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : ""}
          ${isFocused ? "shadow-lg shadow-purple-500/20 scale-[1.02]" : ""}
          focus:outline-none focus:ring-2 focus:ring-purple-500/20
          placeholder:text-slate-400
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* Focus Line */}
      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 transition-transform duration-300 origin-left ${
        isFocused ? "scale-x-100" : ""
      }`}></div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600 animate-fade-in-up">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-2 text-sm text-green-600 animate-fade-in-up">
          {success}
        </div>
      )}
    </div>
  );
});

const Select = forwardRef(({ 
  label,
  options = [],
  placeholder = "Select an option",
  variant = "default",
  size = "md",
  error,
  success,
  className = "",
  disabled = false,
  required = false,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = "relative w-full transition-all duration-300 ease-out";
  
  const variants = {
    default: "bg-white/90 backdrop-blur-sm border-2 border-slate-200 focus:border-purple-500 hover:border-purple-300",
    outline: "bg-transparent border-2 border-slate-300 focus:border-purple-500 hover:border-slate-400",
    filled: "bg-slate-50 border-2 border-transparent focus:border-purple-500 hover:bg-slate-100",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 focus:border-purple-400 hover:border-white/30"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
    xl: "px-6 py-5 text-xl"
  };

  const getStatusClasses = () => {
    if (error) return "border-red-500 focus:border-red-500";
    if (success) return "border-green-500 focus:border-green-500";
    return "";
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2 transition-colors duration-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          className={`
            w-full rounded-xl transition-all duration-300 ease-out appearance-none
            ${variants[variant]} ${sizes[size]} ${getStatusClasses()}
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : ""}
            ${isFocused ? "shadow-lg shadow-purple-500/20 scale-[1.02]" : ""}
            focus:outline-none focus:ring-2 focus:ring-purple-500/20
            cursor-pointer
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Focus Line */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 transition-transform duration-300 origin-left ${
          isFocused ? "scale-x-100" : ""
        }`}></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600 animate-fade-in-up">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-2 text-sm text-green-600 animate-fade-in-up">
          {success}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
TextArea.displayName = 'TextArea';
Select.displayName = 'Select';

export { Input, SearchInput, TextArea, Select };
export default Input;
