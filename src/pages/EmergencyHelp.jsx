import React, { useState } from 'react';

const EmergencyHelp = () => {
  const [activeTab, setActiveTab] = useState('ambulance');
  const [emergencyCall, setEmergencyCall] = useState({
    patientId: '',
    patientName: '',
    emergencyType: '',
    location: '',
    description: '',
    contactNumber: '',
    priority: 'High'
  });
  
  const [isCalling, setIsCalling] = useState(false);
  const [showCallSuccess, setShowCallSuccess] = useState(false);
  const [callDetails, setCallDetails] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [callHistory, setCallHistory] = useState([]);
  
  const [ambulanceServices] = useState([
    {
      id: 'AMB001',
      name: 'Arogya Emergency Ambulance',
      phone: '+91-98765-43210',
      location: 'Main Hospital',
      status: 'Available',
      eta: '5-8 minutes',
      specialties: ['General Emergency', 'Cardiac', 'Trauma'],
      driver: 'Rajesh Kumar',
      vehicle: 'Tata Winger'
    },
    {
      id: 'AMB002',
      name: 'City Emergency Services',
      phone: '+91-98765-43211',
      location: 'Downtown',
      status: 'Available',
      eta: '10-15 minutes',
      specialties: ['General Emergency', 'Pediatric'],
      driver: 'Priya Sharma',
      vehicle: 'Mahindra Bolero'
    },
    {
      id: 'AMB003',
      name: 'Critical Care Ambulance',
      phone: '+91-98765-43212',
      location: 'Medical District',
      status: 'Busy',
      eta: '20-25 minutes',
      specialties: ['ICU Transport', 'Cardiac', 'Neurological'],
      driver: 'Amit Singh',
      vehicle: 'Force Traveller'
    },
    {
      id: 'AMB004',
      name: 'Rapid Response Unit',
      phone: '+91-98765-43213',
      location: 'North Side',
      status: 'Available',
      eta: '7-12 minutes',
      specialties: ['Trauma', 'Emergency Surgery'],
      driver: 'Sunita Devi',
      vehicle: 'Tata Winger'
    }
  ]);

  const [emergencyContacts] = useState([
    {
      id: 'EC001',
      name: 'Emergency Department',
      phone: '+91-11-2345-6789',
      extension: '001',
      location: 'Ground Floor',
      available: '24/7',
      specialties: ['General Emergency', 'Trauma', 'Cardiac']
    },
    {
      id: 'EC002',
      name: 'ICU Department',
      phone: '+91-11-2345-6790',
      extension: '002',
      location: 'Floor 5',
      available: '24/7',
      specialties: ['Critical Care', 'Life Support']
    },
    {
      id: 'EC003',
      name: 'Cardiology Emergency',
      phone: '+91-11-2345-6791',
      extension: '003',
      location: 'Floor 2',
      available: '24/7',
      specialties: ['Heart Attack', 'Cardiac Arrest', 'Arrhythmia']
    },
    {
      id: 'EC004',
      name: 'Neurology Emergency',
      phone: '+91-11-2345-6792',
      extension: '004',
      location: 'Floor 3',
      available: '24/7',
      specialties: ['Stroke', 'Seizure', 'Head Injury']
    },
    {
      id: 'EC005',
      name: 'Pediatric Emergency',
      phone: '+91-11-2345-6793',
      extension: '005',
      location: 'Floor 1',
      available: '24/7',
      specialties: ['Child Emergency', 'Pediatric Trauma']
    }
  ]);

  const [recentCalls] = useState([
    {
      id: 'CALL001',
      patientId: 'P001',
      patientName: 'Rajesh Kumar',
      emergencyType: 'Cardiac Emergency',
      time: '2024-01-15 14:30',
      status: 'Completed',
      ambulance: 'AMB001',
      eta: '6 minutes'
    },
    {
      id: 'CALL002',
      patientId: 'P002',
      patientName: 'Priya Sharma',
      emergencyType: 'Trauma',
      time: '2024-01-15 13:45',
      status: 'In Progress',
      ambulance: 'AMB004',
      eta: '8 minutes'
    },
    {
      id: 'CALL003',
      patientId: 'P003',
      patientName: 'Amit Singh',
      emergencyType: 'Pediatric Emergency',
      time: '2024-01-15 12:20',
      status: 'Completed',
      ambulance: 'AMB002',
      eta: '12 minutes'
    }
  ]);

  const emergencyTypes = [
    'Cardiac Emergency', 'Trauma', 'Stroke', 'Respiratory Emergency',
    'Pediatric Emergency', 'Neurological Emergency', 'General Emergency',
    'Accident', 'Fall', 'Burns', 'Poisoning', 'Other'
  ];

  const priorityLevels = ['Critical', 'High', 'Medium', 'Low'];

  // Call functionality
  const initiateCall = async (phoneNumber, contactName, contactType = 'ambulance') => {
    if (activeCall) {
      alert('Another call is already in progress. Please end the current call first.');
      return;
    }

    setIsCalling(true);
    
    const callId = `CALL${Date.now().toString().slice(-6)}`;
    const newCall = {
      id: callId,
      phoneNumber,
      contactName,
      contactType,
      startTime: new Date(),
      status: 'ringing',
      duration: 0
    };

    setActiveCall(newCall);
    
    // Simulate call ringing
    setTimeout(() => {
      // Simulate call being answered (80% success rate)
      const isAnswered = Math.random() > 0.2;
      
      if (isAnswered) {
        setActiveCall(prev => ({
          ...prev,
          status: 'connected',
          connectTime: new Date()
        }));
        
        // Start call duration timer
        const callTimer = setInterval(() => {
          setActiveCall(prev => {
            if (prev && prev.status === 'connected') {
              const duration = Math.floor((new Date() - prev.connectTime) / 1000);
              return { ...prev, duration };
            }
            return prev;
          });
        }, 1000);

        // Store timer reference for cleanup
        newCall.timer = callTimer;
      } else {
        // Call not answered
        setActiveCall(prev => ({
          ...prev,
          status: 'missed',
          endTime: new Date()
        }));
        
        setTimeout(() => {
          endCall();
        }, 2000);
      }
      
      setIsCalling(false);
    }, 2000);

    // Add to call history
    setCallHistory(prev => [newCall, ...prev.slice(0, 9)]); // Keep last 10 calls
  };

  const endCall = () => {
    if (!activeCall) return;

    const endTime = new Date();
    const duration = activeCall.connectTime ? 
      Math.floor((endTime - activeCall.connectTime) / 1000) : 0;

    // Clear timer if exists
    if (activeCall.timer) {
      clearInterval(activeCall.timer);
    }

    // Update call history with final details
    setCallHistory(prev => 
      prev.map(call => 
        call.id === activeCall.id 
          ? { ...call, status: 'ended', endTime, duration }
          : call
      )
    );

    setActiveCall(null);
    setIsCalling(false);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmergencyCall = async (e) => {
    e.preventDefault();
    if (!emergencyCall.patientId || !emergencyCall.emergencyType || !emergencyCall.location) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCalling(true);

    // Simulate emergency call process
    setTimeout(() => {
      const availableAmbulance = ambulanceServices.find(amb => amb.status === 'Available');
      const callId = `CALL${Date.now().toString().slice(-6)}`;
      
      setCallDetails({
        callId,
        ...emergencyCall,
        ambulance: availableAmbulance,
        estimatedArrival: availableAmbulance.eta,
        timestamp: new Date().toLocaleString()
      });
      
      setShowCallSuccess(true);
      setIsCalling(false);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setEmergencyCall({
          patientId: '',
          patientName: '',
          emergencyType: '',
          location: '',
          description: '',
          contactNumber: '',
          priority: 'High'
        });
        setShowCallSuccess(false);
        setCallDetails(null);
      }, 5000);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Busy': return 'bg-red-100 text-red-700 border-red-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };


  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
        activeTab === id
          ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg'
          : 'text-emerald-600 hover:bg-emerald-50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-emerald-200/50 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 stat-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex-1">
          <p className="text-emerald-600 text-xs sm:text-sm font-medium">{title}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{value}</p>
          {change && (
            <p className={`text-xs sm:text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change} today
            </p>
          )}
        </div>
        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-xl sm:text-2xl md:text-3xl mt-2 sm:mt-0`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (showCallSuccess && callDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-emerald-200/50 text-center max-w-2xl mx-4 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-heartbeat">
            <span className="text-4xl">🚑</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Call Initiated!</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 text-left">
            <h3 className="text-lg font-bold text-red-700 mb-4">Emergency Call Details:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Call ID:</span>
                <span className="font-mono font-bold text-red-700">{callDetails.callId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-semibold">{callDetails.patientName} ({callDetails.patientId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Emergency Type:</span>
                <span className="font-semibold">{callDetails.emergencyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold">{callDetails.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ambulance:</span>
                <span className="font-semibold">{callDetails.ambulance.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ETA:</span>
                <span className="font-semibold">{callDetails.estimatedArrival}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Priority:</span>
                <span className="font-semibold">{callDetails.priority}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            Emergency services have been notified. The ambulance is on its way to the specified location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowCallSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105"
            >
              New Emergency Call
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
            >
              Print Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Emergency Help & Ambulance Services
          </span>
        </h1>
        <p className="text-gray-600 text-lg">24/7 emergency response and ambulance coordination</p>
      </div>

      {/* Active Call Status */}
      {activeCall && (
        <div className={`bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-lg text-white animate-fadeIn ${
          activeCall.status === 'ringing' ? 'animate-call-pulse' : ''
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-white/20 rounded-full flex items-center justify-center ${
                activeCall.status === 'ringing' ? 'animate-call-ring' : 
                activeCall.status === 'connected' ? 'animate-call-connected' : ''
              }`}>
                <span className="text-3xl">📞</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Active Call</h3>
                <p className="text-lg">{activeCall.contactName}</p>
                <p className="text-sm opacity-90">{activeCall.phoneNumber}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold">
                {activeCall.status === 'connected' ? formatDuration(activeCall.duration) : 'Ringing...'}
              </div>
              <div className="text-sm opacity-90">
                {activeCall.status === 'connected' ? 'Connected' : 
                 activeCall.status === 'ringing' ? 'Ringing' : 'Calling...'}
              </div>
            </div>
            
            <button
              onClick={endCall}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>📴</span>
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Emergency Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mobile-stats">
        <StatCard
          title="Available Ambulances"
          value={ambulanceServices.filter(amb => amb.status === 'Available').length}
          icon="🚑"
          color="from-green-500 to-emerald-500"
          change={2}
        />
        <StatCard
          title="Emergency Calls Today"
          value={recentCalls.length}
          icon="📞"
          color="from-red-500 to-pink-500"
          change={5}
        />
        <StatCard
          title="Response Time"
          value="6.5 min"
          icon="⏱️"
          color="from-blue-500 to-cyan-500"
          change={-0.5}
        />
        <StatCard
          title="Success Rate"
          value="98.5%"
          icon="✅"
          color="from-purple-500 to-indigo-500"
          change={1.2}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50">
        <div className="flex flex-wrap gap-4 justify-center">
          <TabButton id="ambulance" label="Ambulance Services" icon="🚑" />
          <TabButton id="emergency" label="Emergency Call" icon="📞" />
          <TabButton id="contacts" label="Emergency Contacts" icon="📋" />
          <TabButton id="recent" label="Call History" icon="📊" />
        </div>
      </div>

      {/* Ambulance Services Tab */}
      {activeTab === 'ambulance' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ambulanceServices.map((ambulance) => (
              <div key={ambulance.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{ambulance.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ambulance.status)}`}>
                    {ambulance.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Phone:</span>
                    <span className="text-gray-900 font-mono">{ambulance.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Location:</span>
                    <span className="text-gray-900">{ambulance.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">ETA:</span>
                    <span className="text-gray-900 font-bold">{ambulance.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Driver:</span>
                    <span className="text-gray-900">{ambulance.driver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Vehicle:</span>
                    <span className="text-gray-900">{ambulance.vehicle}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-emerald-600 font-semibold mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {ambulance.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => initiateCall(ambulance.phone, ambulance.name, 'ambulance')}
                    disabled={isCalling || ambulance.status === 'Busy'}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCalling && activeCall?.contactName === ambulance.name ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calling...
                      </>
                    ) : (
                      <>
                        <span>📞</span>
                        Call Now
                      </>
                    )}
                  </button>
                  {ambulance.status === 'Busy' && (
                    <span className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                      Busy
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Call Tab */}
      {activeTab === 'emergency' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                🚨
              </span>
              Emergency Call Form
            </h3>
            
            <form onSubmit={handleEmergencyCall} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">
                    Patient ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={emergencyCall.patientId}
                    onChange={(e) => setEmergencyCall({...emergencyCall, patientId: e.target.value.toUpperCase()})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Patient Name</label>
                  <input
                    type="text"
                    value={emergencyCall.patientName}
                    onChange={(e) => setEmergencyCall({...emergencyCall, patientName: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">
                    Emergency Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={emergencyCall.emergencyType}
                    onChange={(e) => setEmergencyCall({...emergencyCall, emergencyType: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select emergency type</option>
                    {emergencyTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={emergencyCall.location}
                    onChange={(e) => setEmergencyCall({...emergencyCall, location: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter exact location"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Contact Number</label>
                  <input
                    type="tel"
                    value={emergencyCall.contactNumber}
                    onChange={(e) => setEmergencyCall({...emergencyCall, contactNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="+91-98765-43210"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Priority Level</label>
                  <select
                    value={emergencyCall.priority}
                    onChange={(e) => setEmergencyCall({...emergencyCall, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    {priorityLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-emerald-600 font-semibold">Emergency Description</label>
                <textarea
                  value={emergencyCall.description}
                  onChange={(e) => setEmergencyCall({...emergencyCall, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Describe the emergency situation in detail"
                />
              </div>
              
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isCalling}
                  className="px-12 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isCalling ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Calling Emergency...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🚨</span>
                      Call Emergency Services
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Contacts Tab */}
      {activeTab === 'contacts' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg">
                    📞
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Phone:</span>
                    <span className="text-gray-900 font-mono">{contact.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Extension:</span>
                    <span className="text-gray-900">{contact.extension}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Location:</span>
                    <span className="text-gray-900">{contact.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Available:</span>
                    <span className="text-gray-900 font-bold">{contact.available}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-emerald-600 font-semibold mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {contact.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <button 
                    onClick={() => initiateCall(contact.phone, contact.name, 'emergency')}
                    disabled={isCalling}
                    className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCalling && activeCall?.contactName === contact.name ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calling...
                      </>
                    ) : (
                      <>
                        <span>📞</span>
                        Call Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call History Tab */}
      {activeTab === 'recent' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                📊
              </span>
              Call History
            </h3>
            
            {callHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-gray-400">📞</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-600 mb-2">No calls yet</h4>
                <p className="text-gray-500">Your call history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {callHistory.map((call) => (
                  <div key={call.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          call.status === 'ended' ? 'bg-green-100' :
                          call.status === 'missed' ? 'bg-red-100' :
                          'bg-yellow-100'
                        }`}>
                          <span className="text-xl">
                            {call.status === 'ended' ? '✅' :
                             call.status === 'missed' ? '❌' : '📞'}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{call.contactName}</h4>
                          <p className="text-gray-600">{call.phoneNumber}</p>
                          <p className="text-sm text-gray-500">
                            {call.startTime.toLocaleString()} • {call.contactType}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {call.duration > 0 ? formatDuration(call.duration) : '--:--'}
                        </div>
                        <div className={`text-sm font-medium ${
                          call.status === 'ended' ? 'text-green-600' :
                          call.status === 'missed' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {call.status === 'ended' ? 'Completed' :
                           call.status === 'missed' ? 'Missed' : 'In Progress'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-2xl animate-pulse">🚨</span>
          <h3 className="text-xl font-bold">Emergency Hotline</h3>
          <span className="text-2xl animate-pulse">🚨</span>
        </div>
        <p className="text-lg font-semibold">For immediate medical emergencies, call:</p>
        <p className="text-3xl font-bold mt-2">+91-11-108</p>
        <p className="text-sm mt-2 opacity-90">Available 24/7 for critical situations</p>
      </div>
    </div>
  );
};

export default EmergencyHelp;
