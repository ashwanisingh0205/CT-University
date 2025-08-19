import React, { useEffect, useRef } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title,
  children, 
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = "",
  ...props 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Force scroll to top when modal opens
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        // Also try document.documentElement for better compatibility
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // No need to restore scroll position since we want to stay at top
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-start justify-center p-4 pt-20">
        <div 
          ref={modalRef}
          className={`relative w-full ${sizes[size]} transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 ease-out animate-slide-down ${className}`}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal with Animation
const AnimatedModal = ({ 
  isOpen, 
  onClose, 
  title,
  children, 
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = "",
  ...props 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Scroll to top when modal opens
      window.scrollTo(0, 0);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // No need to restore scroll position since we want to stay at top
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-start justify-center p-4 pt-20">
        <div 
          ref={modalRef}
          className={`relative w-full ${sizes[size]} transform overflow-hidden rounded-2xl bg-white shadow-2xl animate-slide-down ${className}`}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  size = "md",
  className = "",
  ...props 
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const confirmButtonVariants = {
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "bg-slate-600 hover:bg-slate-700",
    success: "bg-green-600 hover:bg-green-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
    danger: "bg-red-600 hover:bg-red-700",
    info: "bg-blue-600 hover:bg-blue-700"
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      className={className}
      {...props}
    >
      <div className="space-y-6">
        {/* Message */}
        <div className="text-center">
          <p className="text-slate-600">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${confirmButtonVariants[confirmVariant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Form Modal
const FormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  title,
  children, 
  submitText = "Submit",
  cancelText = "Cancel",
  submitVariant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const submitButtonVariants = {
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "bg-slate-600 hover:bg-slate-700",
    success: "bg-green-600 hover:bg-green-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
    danger: "bg-red-600 hover:bg-red-700",
    info: "bg-blue-600 hover:bg-blue-700"
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      className={className}
      {...props}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Content */}
        <div>
          {children}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${submitButtonVariants[submitVariant]} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Learning Platform Specific Modals
const CoursePreviewModal = ({ 
  isOpen, 
  onClose, 
  course,
  className = "",
  ...props 
}) => {
  if (!course) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Course Preview"
      size="lg"
      className={className}
      {...props}
    >
      <div className="space-y-6">
        {/* Course Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <span className="text-3xl text-white">{course.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h2>
          <p className="text-slate-600">{course.description}</p>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{course.duration}</div>
            <div className="text-sm text-slate-600">Duration</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-cyan-600">{course.lessons}</div>
            <div className="text-sm text-slate-600">Lessons</div>
          </div>
        </div>

        {/* Course Content */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">What you'll learn</h3>
          <ul className="space-y-2">
            {course.learningPoints?.map((point, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-slate-600">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-200">
            Enroll Now
          </button>
        </div>
      </div>
    </Modal>
  );
};

export {
  Modal,
  AnimatedModal,
  ConfirmModal,
  FormModal,
  CoursePreviewModal
};

export default Modal;
