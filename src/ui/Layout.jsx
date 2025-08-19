import React, { useState } from 'react';
import logo from '../assets/logo/images.png'


// Enhanced gradient keyframes for header text
const shimmerStyle = `
  @keyframes shimmer {
    0% { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(177, 59, 255, 0.3); }
    50% { box-shadow: 0 0 40px rgba(177, 59, 255, 0.6); }
  }
  
  @keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

// Add style tag for animations
if (typeof document !== 'undefined' && !document.getElementById('shimmer-style')) {
  const style = document.createElement('style');
  style.id = 'shimmer-style';
  style.innerHTML = shimmerStyle;
  document.head.appendChild(style);
}

const Layout = ({ children, selectedSection, onSectionChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: '📊', id: 'dashboard', description: 'Overview & Analytics' },
    { text: 'Short Video', icon: '🎥', id: 'orders', description: 'Video Content Management' },
    { text: 'Learn & Grow', icon: '📚', id: 'inventory', description: 'Educational Resources' },
    { text: 'User Analytics', icon: '📈', id: 'users', description: 'User Performance Data' },
    // { text: 'Settings', icon: '⚙️', id: 'settings', description: 'System Configuration' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row font-sans transition-all duration-1000 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Static background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="sticky top-0 z-40 md:hidden flex items-center justify-between bg-black/90 backdrop-blur-xl px-4 py-3 shadow-2xl border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-purple-400 shadow-lg flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
            <img src={logo} alt="FinGuard Logo" className="w-8 h-8 object-cover rounded-full" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-xl font-extrabold tracking-widest">
            FinGuard
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile Sign Out Button */}
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-purple-300 hover:text-white bg-purple-600/20 hover:bg-purple-600/40 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            Sign Out
          </button>
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-purple-400 hover:text-purple-300 focus:outline-none transition-all duration-300 hover:scale-110"
          >
            <span className="text-2xl">☰</span>
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

      {/* Enhanced Sidebar - Fixed Position */}
      <div className={`fixed md:fixed md:top-0 z-30 top-0 left-0 h-screen w-72 bg-gradient-to-b from-black via-slate-900 to-black shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-purple-500/40 backdrop-blur-xl`}>
        {/* Logo Section */}
        <div className="hidden md:flex flex-col items-center gap-4 p-8 border-b border-purple-500/40">
          <div className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-2xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
            <img src={logo} alt="FinGuard Logo" className="w-20 h-20 object-contain rounded-full" />
          </div>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-3xl font-extrabold tracking-widest">
            FinGuard
          </h1>
          <p className="text-purple-300/70 text-sm font-medium text-center">Learning Management System</p>
        </div>

        <div className="border-b border-purple-500/40 mb-4 hidden md:block"></div>

        {/* Enhanced Menu Items - Scrollable */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="transform transition-all duration-300 ease-out"
            >
              <button
                onClick={() => { onSectionChange(item.id); setSidebarOpen(false); }}
                className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 text-left font-semibold tracking-wide text-base transform-gpu hover:scale-105
                  ${selectedSection === item.id
                    ? 'bg-gradient-to-br from-purple-600/20 to-cyan-600/20 text-white border-l-4 border-purple-400 shadow-2xl ring-2 ring-purple-400/40 scale-105'
                    : 'text-purple-200 hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-cyan-600/10 hover:text-white hover:shadow-xl hover:ring-2 hover:ring-purple-400/30'
                  }
                `}
              >
                <div className="flex items-center gap-4 px-6 py-4">
                  <span className="text-2xl w-8 flex justify-center">{item.icon}</span>
                  <div className="flex-1">
                    <span className="font-semibold text-lg">{item.text}</span>
                    <p className="text-xs text-purple-300/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          ))}
        </nav>

        {/* Enhanced Footer Section - Always Visible */}
        <div className="flex-shrink-0 p-6 border-t border-purple-500/40 backdrop-blur-sm bg-gradient-to-b from-black via-slate-900 to-black">
          {/* User Profile Section */}
          {/* <div className="flex items-center gap-4 p-4 mb-4 rounded-2xl bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-500 to-cyan-500 border-2 border-purple-400">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">FinGuard Admin</p>
              <p className="text-purple-300/70 text-xs">System Administrator</p>
            </div>
          </div> */}
          
          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="w-full group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl shadow-xl bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-600 hover:from-purple-500 hover:via-purple-400 hover:to-cyan-500 border-none"
          >
            <span>🚪</span>
            <span>Sign Out</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      {/* Main Content - Scrollable with Left Margin */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-72">
        {/* Enhanced Header */}
        <header className="z-30 shadow-2xl p-0 md:p-6 lg:p-4 xl:p-8 w-full flex-shrink-0 bg-gradient-to-r from-black via-slate-900 to-black border-b-4 border-purple-500/60 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center px-4 sm:px-6 py-4 justify-between gap-6 w-full">
            <div className='flex justify-center items-center'>
              <h1 className="text-transparent bg-clip-text text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-widest drop-shadow-2xl"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #a855f7, #06b6d4, #ec4899, #8b5cf6, #06b6d4)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome to FinGuard Learning 
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-purple-300 text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Main Content Area - Scrollable */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 relative overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-4 sm:p-6 md:p-8 min-h-full transition-all duration-700 hover:shadow-purple-500/20 relative overflow-hidden">
            {/* Content background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #a855f7 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, #06b6d4 2px, transparent 2px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
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