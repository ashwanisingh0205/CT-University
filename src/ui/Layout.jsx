import React, { useState } from 'react';
import its from '../assets/logo/its.png'

// Interactive healthcare-themed animations
const healthcareAnimations = `
  @keyframes shimmer {
    0% { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.3); }
    50% { box-shadow: 0 0 35px rgba(74, 222, 128, 0.6); }
  }
  
  @keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes medical-pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes scan-line {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInFromBottom {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { filter: brightness(1) drop-shadow(0 0 10px rgba(74, 222, 128, 0.3)); }
    50% { filter: brightness(1.1) drop-shadow(0 0 20px rgba(74, 222, 128, 0.6)); }
  }
  
  @keyframes ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }
  
  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

// Add style tag for animations
if (typeof document !== 'undefined' && !document.getElementById('healthcare-animations')) {
  const style = document.createElement('style');
  style.id = 'healthcare-animations';
  style.innerHTML = healthcareAnimations;
  document.head.appendChild(style);
}

const Layout = ({ children, selectedSection, onSectionChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: '📊', 
      id: 'dashboard', 
      description: 'Medical History & Patient Search',
      color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Patient Registration', 
      icon: '👤', 
      id: 'patient-registration', 
      description: 'Add New Patient & Generate ID',
          color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Bed Booking', 
      icon: '🛏️', 
      id: 'bed-booking', 
      description: 'Book Hospital Beds with Patient ID',
          color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Blood Bank', 
      icon: '🩸', 
      id: 'blood-bank', 
      description: 'Blood Packages & Medical Supplies',
      color: 'from-black-300 to-black-400'
    },
    { 
      text: 'AI ChatBot', 
      icon: '🤖', 
      id: 'chatbot', 
      description: 'AI Assistant for Medical Queries',
      color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Hospital Details', 
      icon: '🏥', 
      id: 'hospital-details', 
      description: 'Manage Hospital Information',
       color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Patient Flow', 
      icon: '📈', 
      id: 'patient-flow', 
      description: 'Monitor Patient Status & Flow',
       color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Patient Reports', 
      icon: '📋', 
      id: 'patient-reports', 
      description: 'Upload & Manage Medical Reports',
          color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Emergency Help', 
      icon: '🚑', 
      id: 'emergency-help', 
      description: 'Ambulance & Emergency Services',
    color: 'from-black-300 to-black-400'
    },
    { 
      text: 'HR Management', 
      icon: '👥', 
      id: 'hr-management', 
      description: 'Manage Doctors, Staff & Administration',
      color: 'from-black-300 to-black-400'
    },
    { 
      text: 'TPA Management', 
      icon: '🏢', 
      id: 'tpa-management', 
      description: 'Third Party Administrator & Insurance',
      color: 'from-black-300 to-black-400'
    },
    { 
      text: 'Claim Management', 
      icon: '📄', 
      id: 'claim-management', 
      description: 'Insurance Claims Processing & Management',
      color: 'from-black-300 to-black-400'
    }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row font-sans transition-all duration-1000 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 relative overflow-hidden">
      {/* Interactive healthcare background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Interactive floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-200 rounded-full opacity-60 animate-bounce-gentle"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-200 rounded-full opacity-50 animate-bounce-gentle" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-teal-200 rounded-full opacity-40 animate-bounce-gentle" style={{animationDelay: '1.5s'}}></div>
        
        {/* Interactive grid overlay */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Interactive Mobile Header */}
      <div className="sticky top-0 z-40 md:hidden flex items-center justify-between bg-white/95 backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-3 shadow-2xl border-b border-green-300/40">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-green-200 shadow-lg flex items-center justify-center bg-gradient-to-br from-green-300 to-emerald-300 animate-glow-pulse">
            <img src={its} alt="Arogya Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-full" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-base sm:text-lg font-bold tracking-wide">
            Arogya
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Interactive Mobile Sign Out Button */}
          <button
            onClick={handleLogout}
            className="px-2 py-1.5 sm:px-3 sm:py-2 text-green-400 hover:text-white bg-green-50/90 hover:bg-green-300 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium border border-green-200/60 hover:shadow-lg hover:scale-105 mobile-touch-target"
          >
            <span className="hidden sm:inline">Sign Out</span>
            <span className="sm:hidden">Out</span>
          </button>
          {/* Interactive Mobile Menu Toggle */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-green-400 hover:text-green-300 focus:outline-none transition-all duration-300 hover:scale-110 p-1.5 sm:p-2 rounded-lg hover:bg-green-50/70 hover:shadow-md mobile-touch-target"
          >
            <span className="text-lg sm:text-xl">☰</span>
          </button>
        </div>
      </div>

      {/* Sidebar Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden animate-fadeIn" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Interactive Healthcare Sidebar */}
      <div className={`fixed md:fixed md:top-0 z-30 top-0 left-0 h-screen w-64 sm:w-72 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-green-200/60`}>
        {/* Interactive Logo Section */}
        <div className="hidden md:flex flex-col items-center gap-4 p-6 border-b border-green-200/60">
          <div className="w-16 h-16 rounded-full border-2 border-green-200 shadow-lg flex items-center justify-center bg-gradient-to-br from-green-300 to-emerald-300 animate-glow-pulse">
            <img src={its} alt="Arogya Logo" className="w-12 h-12 object-contain rounded-full" />
          </div>
          <div className="text-center">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 text-2xl font-bold tracking-wide mb-1">
              Arogya
            </h1>
            <p className="text-green-400/70 text-xs font-medium tracking-wide">
              Healthcare Management
            </p>
          </div>
        </div>

        <div className="border-b border-green-200/60 mb-4 hidden md:block"></div>

        {/* Interactive Healthcare Menu Items */}
        <nav className="flex-1 px-3 sm:px-4 py-4 space-y-2 sm:space-y-3 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="transform transition-all duration-300 ease-out"
              style={{ animationDelay: `${index * 0.1}s animate-glow-pulse text-black` }}
            >
              <button
                onClick={() => { onSectionChange(item.id); setSidebarOpen(false); }}
                className={`w-full group relative overflow-hidden rounded-lg transition-all duration-300 text-left font-medium tracking-wide text-xs sm:text-sm transform-gpu hover:scale-105 hover:shadow-lg mobile-touch-target
                  ${selectedSection === item.id
                    ? `hover:bg-gradient-to-r from-black-300 to-black-400 hover:shadow-md hover:ring-1 text-black`
                    : ' hover:bg-gradient-to-r from-black-300 to-black-400  hover:shadow-md hover:ring-1 '
                  }
                `}
              >
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-sm sm:text-lg bg-gradient-to-br ${item.color}/15 border border-green-200/60 group-hover:animate-bounce-gentle`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-xs sm:text-sm block truncate">{item.text}</span>
                    <p className="text-xs text-green-900 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed hidden sm:block">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Interactive hover effect line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                {/* Interactive ripple effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          ))}
        </nav>

        {/* Interactive Footer Section */}
        <div className="flex-shrink-0 p-4 border-t border-green-200/60 backdrop-blur-sm bg-white/80">
          {/* Interactive User Profile Section */}
          
          
          {/* Interactive Sign Out Button */}
          <button
            onClick={handleLogout}
            className="w-full group relative overflow-hidden flex items-center justify-center gap-2 px-4 py-2 text-white font-semibold rounded-lg transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg shadow-md bg-gradient-to-r from-green-300 to-emerald-300 hover:from-green-400 hover:to-emerald-400 border border-green-200/60"
          >
            <span className="text-sm">🚪</span>
            <span className="text-sm text-black">Sign Out</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      {/* Interactive Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Interactive Healthcare Header */}
        <header className="z-30 shadow-lg w-full flex-shrink-0 bg-white/95 backdrop-blur-xl border-b border-green-200/60">
          <div className="flex items-center justify-between px-6 py-3 w-full">
            <div className='flex items-center'>
              <h1 className="text-transparent bg-clip-text text-lg md:text-xl font-bold tracking-wide"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #4ade80, #22c55e, #16a34a, #4ade80)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}
              >
                Arogya Healthcare 
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Interactive Notification Button */}
              <button className="relative group p-2 rounded-lg bg-green-50/90 hover:bg-green-100/90 border border-green-200/60 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <svg className="w-5 h-5 text-green-400 group-hover:text-green-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5L9 15H4l5-5V4l-5 5H9l-4.5 4.5z" />
                </svg>
                {/* Interactive Notification Badge */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></div>
              </button>
              
              {/* Interactive User Profile Button */}
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50/90 hover:bg-green-100/90 border border-green-200/60 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-300 to-emerald-300 border border-green-200 flex items-center justify-center animate-glow-pulse">
                  <span className="text-white font-bold text-xs">A</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-green-500 text-xs font-medium">Admin</p>
                  <p className="text-green-300/70 text-xs">Healthcare</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Interactive Main Content Area */}
        <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-green-200/60 p-3 sm:p-4 md:p-6 lg:p-8 min-h-full transition-all duration-700 hover:shadow-green-400/30 relative overflow-hidden">
            {/* Interactive content background pattern */}
            <div className="absolute inset-0 opacity-3">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #4ade80 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, #22c55e 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            {/* Interactive floating elements */}
            <div className="absolute top-10 right-10 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-bounce-gentle"></div>
            <div className="absolute bottom-20 left-10 w-1 h-1 bg-emerald-300 rounded-full opacity-30 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-teal-300 rounded-full opacity-35 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
            
            {/* Interactive content wrapper */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 