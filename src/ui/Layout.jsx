import React, { useState } from 'react';
// import army from '../assets/login/kushal.PNG';
import logo from '../assets/logo/logo1.png';
import logo1 from '../assets/logo/logo2.png';

// Animated gradient keyframes for header text
const shimmerStyle = `
  @keyframes shimmer {
    0% { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }
`;

// Add style tag for shimmer animation
if (typeof document !== 'undefined' && !document.getElementById('shimmer-style')) {
  const style = document.createElement('style');
  style.id = 'shimmer-style';
  style.innerHTML = shimmerStyle;
  document.head.appendChild(style);
}

const Layout = ({ children, selectedSection, onSectionChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: '📊', id: 'dashboard' },
    { text: 'Orders', icon: '🧾', id: 'orders' },
    { text: 'Inventory', icon: '🛒', id: 'inventory' },
    { text: 'Users', icon: '👤', id: 'users' },
    { text: 'Analytics', icon: '📈', id: 'analytics' },
    { text: 'Settings', icon: '⚙️', id: 'settings' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row font-sans transition-colors duration-700 bg-gradient-to-br from-black via-[#f3e8ff] to-white" style={{backgroundSize: '200% 200%'}}>
      {/* Mobile sidebar toggle */}
      <div className="sticky top-0 z-40 md:hidden flex items-center justify-between bg-slate-900/80 backdrop-blur-md px-4 py-3 shadow-lg transition-colors duration-700">
        <div className="flex items-center gap-2">
          <div className="w-18 h-12 rounded-full border-2 border-cyan-400 shadow-lg flex items-center justify-center bg-slate-800">
            <img src={logo} alt="STEAG Logo" className="w-10 h-10 object-contain rounded-full" />
          </div>
          <span className="text-cyan-400 text-xl font-extrabold tracking-widest ml-2" style={{fontFamily: 'Poppins, sans-serif'}}>STEAG</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-amber-400 focus:outline-none">
          <span className="text-2xl">☰</span>
        </button>
      </div>
      {/* Sidebar Backdrop for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      {/* Sidebar */}
      <div className={`fixed md:sticky md:top-0 z-30 top-0 left-0 h-full md:h-screen w-64 bg-black shadow-2xl flex flex-col h-full overflow-y-auto transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex md:relative border-r border-[#B13BFF]/40 backdrop-blur-xl bg-opacity-80`}>
        <div className="hidden md:flex flex-col items-center gap-3 p-8 border-b border-[#B13BFF]/40">
          <div className="w-20 h-20 rounded-full border-4 border-[#B13BFF] shadow-xl flex items-center justify-center bg-black mb-2">
            <img src={logo} alt="STEAG Logo" className="w-16 h-16 object-contain rounded-full" />
          </div>
          <h1 className="text-[#B13BFF] text-2xl font-extrabold tracking-widest" style={{fontFamily: 'Poppins, sans-serif'}}>STEAG</h1>
          <span className="text-[#e9d5ff] text-xs tracking-wide">Bar Management</span>
        </div>
        <div className="border-b border-[#B13BFF]/40 mb-2 hidden md:block"></div>
        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onSectionChange(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left font-semibold tracking-wide text-base transform-gpu
                ${selectedSection === item.id
                  ? 'bg-[#B13BFF]/20 text-white border-l-4 border-[#B13BFF] shadow-md scale-110 ring-2 ring-[#B13BFF]/40'
                  : 'text-[#e9d5ff] hover:bg-[#B13BFF]/10 hover:text-white hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-[#B13BFF]/30'}
              `}
              style={{transition: 'all 0.3s cubic-bezier(.4,2,.6,1)'}}
            >
              <span className="text-xl w-6 flex justify-center">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </button>
          ))}
        </nav>
        {/* Footer Section - always visible at bottom */}
        <div className="mt-auto p-4 border-t border-[#B13BFF]/40 backdrop-blur-sm bg-black">
          <div className="flex items-center gap-3 p-3 mb-3 rounded-xl bg-black border border-[#B13BFF]/40 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-[#B13BFF]/10 border-2 border-[#B13BFF]">
              <span className="text-[#B13BFF] font-bold text-lg">S</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">STEAG</p>
              <p className="text-[#e9d5ff] text-xs">System Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl shadow-lg bg-gradient-to-r from-[#B13BFF] to-black hover:from-[#c45cff] hover:to-[#B13BFF] border-none"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="z-30 shadow-xl align-middle p-0 md:p-6 lg:p-4 xl:p-10 w-full flex-shrink-0 bg-black border-b-4 border-[#B13BFF]/60 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center px-2 sm:px-4 py-0 justify-between gap-4 w-full">
            <div className='flex justify-center items-center'>
              <h1 className="text-transparent bg-clip-text text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-widest drop-shadow-lg animate-shimmer"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  backgroundImage: 'linear-gradient(90deg, #B13BFF, #a78bfa, #f3e8ff, #fff)',
                  backgroundSize: '1000px 100%',
                  animation: 'shimmer 3s linear infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                  WELCOME TO BAR MANAGEMENT
              </h1>
            </div>
            <div>
              {/* <img src={logo1} alt="logo" className='w-14 h-10 object-contain' /> */}
            </div>
          </div>
        </header>
        {/* Main Content Area */}
        <main className="flex-1 p-2 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff]">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border-[#B13BFF]/20 p-2 sm:p-6 md:p-8 min-h-full transition-colors duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 