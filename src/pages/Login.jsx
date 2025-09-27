import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import pic from '../assets/logo/pic.jpg'
import bar from '../assets/logo/bar.jpg'
import image from '../assets/logo/gul.jpg'
import BackgroundBeams from '../components/ui/background-beams-with-collision';
import { useRef } from 'react';
import { Input, Button, Alert } from '../components/ui/index';


export default function Login() {
  const [username, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Register dialog state
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    dob: '',
    aadhaar: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const registerDialogRef = useRef(null);

 
  const handleLogin = async (e) => {
    console.log('ywas')
    navigate('/home');
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.post('api/admin/login', {
        username,
        password,
      });
      console.log('response',response)
      console.log('response',response.data.data.accessToken)
      
      if (response && response.data) {
        if (response.data.data.accessToken) {
          sessionStorage.setItem('token', response.data.data.accessToken);
          
          // No need to manually set Authorization header - axios interceptor handles this
          console.log('done')
          setuserId('');
          setPassword('');
          
          navigate('/home');
        } else {
          setError('Invalid response from server. Please try again.');
        }
      } else {
        setError('No response from server. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Login failed. Please check your credentials.');
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

 


  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterLoading(true);

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match');
      setRegisterLoading(false);
      return;
    }

    if (registerData.aadhaar.length !== 12) {
      setRegisterError('Aadhaar card number must be 12 digits');
      setRegisterLoading(false);
      return;
    }

   
      
        setShowRegister(false);
        alert('Registration successful! Please login with your credentials.');
    setRegisterLoading(false);
    
  };

  const handleRegisterInputChange = (field, value) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 backdrop-blur-xs">
          <img 
            src={image} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          {/* Enhanced overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-black/60"></div>
        </div>
        
        {/* Logo and content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-white text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Arogya
            </span>
          </div>
          
          <div className="text-white space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Empowering Health Care
                </span>
                <br />
                <span className="text-white">with AI Management</span>
              </h1>
              <p className="text-emerald-200 text-xl leading-relaxed">
              Empower your health journey with our comprehensive care management system
              </p>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3 text-emerald-200">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-400">🏥</span>
                </div>
                <span className="text-sm font-medium">Health Management</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-200">
                <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-teal-400">📊</span>
                </div>
                <span className="text-sm font-medium">Progress Tracking</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-200">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400">🧬</span>
                </div>
                <span className="text-sm font-medium">Smart Analytics</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-200">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400">⚡</span>
                </div>
                <span className="text-sm font-medium">Fast Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Beams */}
        <BackgroundBeams />

        {/* Login Form Content */}
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl">
              <span className="text-3xl text-white">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-emerald-200 text-lg">Sign in to your Arogya account</p>
          </div>

          {/* Error Message */}
          {error && (
            <Alert 
              type="error" 
              title="Login Failed" 
              className="mb-6"
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setuserId(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={loading}
              icon="👤"
              variant="glass"
              size="lg"
              className="text-white"
            />

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-emerald-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  icon="🔒"
                  variant="glass"
                  size="lg"
                  className="text-white pr-12"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-300 hover:text-emerald-200 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              loading={loading}
              className="w-full h-14 text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25"
            >
              {loading ? 'Signing in...' : 'Sign in to Arogya'}
            </Button>

            {/* Register Button */}
            <button
              type="button"
              className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              onClick={() => setShowRegister(true)}
            >
              Create New Account
            </button>
          </form>
        </div>
      </div>

      {/* Register Dialog */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div ref={registerDialogRef} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-emerald-500/20">
            <button
              className="absolute top-4 right-4 text-emerald-300 hover:text-white text-2xl font-bold transition-colors duration-200"
              onClick={() => setShowRegister(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-2xl text-white">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-emerald-200">Join the Arogya Healthcare community</p>
            </div>

            {/* Error Message */}
            {registerError && (
              <Alert 
                type="error" 
                title="Registration Failed" 
                className="mb-6"
              >
                {registerError}
              </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label="Username"
                type="text"
                value={registerData.username}
                onChange={(e) => handleRegisterInputChange('username', e.target.value)}
                placeholder="Enter username"
                required
                disabled={registerLoading}
                variant="glass"
                size="md"
                className="text-white"
              />
              <Input
                label="Password"
                type="password"
                value={registerData.password}
                onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                placeholder="Create a password"
                required
                disabled={registerLoading}
                variant="glass"
                size="md"
                className="text-white"
              />
              <Input
                label="Confirm Password"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                required
                disabled={registerLoading}
                variant="glass"
                size="md"
                className="text-white"
              />
              <Input
                label="Date of Birth"
                type="date"
                value={registerData.dob}
                onChange={(e) => handleRegisterInputChange('dob', e.target.value)}
                required
                disabled={registerLoading}
                variant="glass"
                size="md"
                className="text-white"
              />
              <Input
                label="Aadhaar Card Number"
                type="text"
                value={registerData.aadhaar}
                onChange={(e) => handleRegisterInputChange('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder="Enter 12-digit Aadhaar number"
                required
                disabled={registerLoading}
                variant="glass"
                size="md"
                className="text-white"
                maxLength="12"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={registerLoading}
                loading={registerLoading}
                className="w-full mt-6"
              >
                {registerLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
