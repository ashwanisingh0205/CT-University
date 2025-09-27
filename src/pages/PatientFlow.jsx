import React, { useState, useEffect } from 'react';

const PatientFlow = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    totalPatients: 247,
    inEmergency: 8,
    inSurgery: 12,
    inRecovery: 23,
    discharged: 45,
    waiting: 15
  });

  const [patients, setPatients] = useState([
    {
      id: 'P001',
      name: 'Dr. Sarah Johnson',
      age: 35,
      status: 'In Treatment',
      department: 'Cardiology',
      room: 'R201',
      bed: 'B1',
      admissionTime: '2024-01-15 09:30',
      estimatedDischarge: '2024-01-17 14:00',
      priority: 'High',
      condition: 'Stable'
    },
    {
      id: 'P002',
      name: 'John Smith',
      age: 42,
      status: 'Emergency',
      department: 'Emergency Medicine',
      room: 'R401',
      bed: 'B1',
      admissionTime: '2024-01-15 11:45',
      estimatedDischarge: '2024-01-16 08:00',
      priority: 'Critical',
      condition: 'Critical'
    },
    {
      id: 'P003',
      name: 'Emily Davis',
      age: 28,
      status: 'Recovery',
      department: 'Orthopedics',
      room: 'R102',
      bed: 'B2',
      admissionTime: '2024-01-14 16:20',
      estimatedDischarge: '2024-01-18 10:00',
      priority: 'Medium',
      condition: 'Improving'
    },
    {
      id: 'P004',
      name: 'Michael Brown',
      age: 55,
      status: 'Surgery',
      department: 'Neurology',
      room: 'Surgery Suite 1',
      bed: 'N/A',
      admissionTime: '2024-01-15 13:00',
      estimatedDischarge: '2024-01-16 18:00',
      priority: 'High',
      condition: 'Under Surgery'
    },
    {
      id: 'P005',
      name: 'Lisa Wilson',
      age: 31,
      status: 'Waiting',
      department: 'Pediatrics',
      room: 'Waiting Area',
      bed: 'N/A',
      admissionTime: '2024-01-15 14:30',
      estimatedDischarge: 'TBD',
      priority: 'Low',
      condition: 'Stable'
    }
  ]);

  const [departments, setDepartments] = useState([
    { name: 'Emergency Medicine', patients: 8, capacity: 20, occupancy: 40 },
    { name: 'Cardiology', patients: 15, capacity: 25, occupancy: 60 },
    { name: 'Neurology', patients: 12, capacity: 20, occupancy: 60 },
    { name: 'Orthopedics', patients: 18, capacity: 30, occupancy: 60 },
    { name: 'Pediatrics', patients: 22, capacity: 35, occupancy: 63 },
    { name: 'ICU', patients: 8, capacity: 12, occupancy: 67 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalPatients: prev.totalPatients + Math.floor(Math.random() * 3) - 1,
        inEmergency: prev.inEmergency + Math.floor(Math.random() * 2) - Math.floor(Math.random() * 2),
        inSurgery: prev.inSurgery + Math.floor(Math.random() * 2) - Math.floor(Math.random() * 2),
        inRecovery: prev.inRecovery + Math.floor(Math.random() * 3) - 1,
        discharged: prev.discharged + Math.floor(Math.random() * 2),
        waiting: prev.waiting + Math.floor(Math.random() * 3) - 1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Emergency': return 'bg-red-100 text-red-700 border-red-200';
      case 'Surgery': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'In Treatment': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Recovery': return 'bg-green-100 text-green-700 border-green-200';
      case 'Waiting': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Critical': return 'text-red-600';
      case 'Stable': return 'text-green-600';
      case 'Improving': return 'text-blue-600';
      case 'Under Surgery': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-emerald-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change} in last hour
            </p>
          )}
        </div>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Patient Flow Monitoring
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Real-time patient status tracking and hospital flow management</p>
      </div>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Patients"
          value={realTimeData.totalPatients}
          icon="👥"
          color="from-emerald-500 to-teal-500"
          change={Math.floor(Math.random() * 5) - 2}
        />
        <StatCard
          title="Emergency Cases"
          value={realTimeData.inEmergency}
          icon="🚨"
          color="from-red-500 to-pink-500"
          change={Math.floor(Math.random() * 3) - 1}
        />
        <StatCard
          title="In Surgery"
          value={realTimeData.inSurgery}
          icon="⚕️"
          color="from-purple-500 to-indigo-500"
          change={Math.floor(Math.random() * 2)}
        />
        <StatCard
          title="Recovery"
          value={realTimeData.inRecovery}
          icon="🏥"
          color="from-green-500 to-emerald-500"
          change={Math.floor(Math.random() * 4) - 1}
        />
        <StatCard
          title="Discharged Today"
          value={realTimeData.discharged}
          icon="✅"
          color="from-blue-500 to-cyan-500"
          change={Math.floor(Math.random() * 3)}
        />
        <StatCard
          title="Waiting"
          value={realTimeData.waiting}
          icon="⏳"
          color="from-yellow-500 to-orange-500"
          change={Math.floor(Math.random() * 3) - 1}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50">
        <div className="flex flex-wrap gap-4 justify-center">
          <TabButton id="overview" label="Patient Overview" icon="📊" />
          <TabButton id="departments" label="Department Status" icon="🏢" />
          <TabButton id="detailed" label="Detailed View" icon="🔍" />
        </div>
      </div>

      {/* Patient Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg">
                👥
              </span>
              Current Patient Status
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-200">
                    <th className="text-left py-4 px-6 text-emerald-600 font-semibold">Patient</th>
                    <th className="text-left py-4 px-6 text-emerald-600 font-semibold">Status</th>
                    <th className="text-left py-4 px-6 text-emerald-600 font-semibold">Department</th>
                    <th className="text-left py-4 px-6 text-emerald-600 font-semibold">Location</th>
                    <th className="text-left py-4 px-6 text-emerald-600 font-semibold">Priority</th>
                    <th className="text-left py-4 px-6 text-emerald-600 font-semibold">Condition</th>
                    <th className="text-left py-4 px-6 text-emerald-600 font-semibold">Admission Time</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-b border-emerald-100 hover:bg-emerald-50 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">ID: {patient.id}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{patient.department}</td>
                      <td className="py-4 px-6 text-gray-900">{patient.room} - {patient.bed}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(patient.priority)}`}></div>
                          <span className="text-gray-900">{patient.priority}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-semibold ${getConditionColor(patient.condition)}`}>
                          {patient.condition}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{patient.admissionTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Department Status Tab */}
      {activeTab === 'departments' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg ${
                    dept.occupancy > 80 ? 'bg-red-500' :
                    dept.occupancy > 60 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}>
                    🏥
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Current Patients:</span>
                    <span className="text-gray-900 font-bold">{dept.patients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Capacity:</span>
                    <span className="text-gray-900">{dept.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Occupancy:</span>
                    <span className={`font-bold ${
                      dept.occupancy > 80 ? 'text-red-600' :
                      dept.occupancy > 60 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {dept.occupancy}%
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        dept.occupancy > 80 ? 'bg-red-500' :
                        dept.occupancy > 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${dept.occupancy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed View Tab */}
      {activeTab === 'detailed' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                🔍
              </span>
              Detailed Patient Information
            </h3>
            
            <div className="space-y-6">
              {patients.map((patient) => (
                <div key={patient.id} className="border border-emerald-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{patient.name}</h4>
                      <p className="text-emerald-600 font-semibold">ID: {patient.id}</p>
                      <p className="text-gray-600">{patient.age} years old</p>
                    </div>
                    
                    <div>
                      <p className="text-emerald-600 font-semibold mb-2">Status & Priority</p>
                      <div className="space-y-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(patient.priority)}`}></div>
                          <span className="text-gray-900">{patient.priority} Priority</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-emerald-600 font-semibold mb-2">Location</p>
                      <p className="text-gray-900">{patient.department}</p>
                      <p className="text-gray-900">{patient.room} - {patient.bed}</p>
                    </div>
                    
                    <div>
                      <p className="text-emerald-600 font-semibold mb-2">Timeline</p>
                      <p className="text-gray-900 text-sm">Admitted: {patient.admissionTime}</p>
                      <p className="text-gray-900 text-sm">Est. Discharge: {patient.estimatedDischarge}</p>
                      <span className={`font-semibold ${getConditionColor(patient.condition)}`}>
                        {patient.condition}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Real-time Status Indicator */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-emerald-600 font-semibold">Live Data Updates</span>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-600">Patient flow data is updated in real-time every 5 seconds</p>
      </div>
    </div>
  );
};

export default PatientFlow;
