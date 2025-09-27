import React, { useState } from 'react';

const HospitalDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [hospitalInfo, setHospitalInfo] = useState({
    name: 'Arogya Healthcare Center',
    address: '123 Medical District, Healthcare City, HC 12345',
    phone: '+1-555-HOSPITAL',
    email: 'info@Arogyahealthcare.com',
    website: 'www.Arogyahealthcare.com',
    established: '2010',
    accreditation: 'JCI Accredited',
    capacity: '500 beds',
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency Medicine'],
    facilities: ['MRI', 'CT Scan', 'Laboratory', 'Pharmacy', 'Cafeteria', 'Parking'],
    visitingHours: '9:00 AM - 6:00 PM',
    emergencyHours: '24/7'
  });

  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', head: 'Dr. Michael Chen', location: 'Floor 2', phone: 'Ext. 201', patients: 45 },
    { id: 2, name: 'Neurology', head: 'Dr. Sarah Johnson', location: 'Floor 3', phone: 'Ext. 301', patients: 32 },
    { id: 3, name: 'Orthopedics', head: 'Dr. David Wilson', location: 'Floor 4', phone: 'Ext. 401', patients: 28 },
    { id: 4, name: 'Pediatrics', head: 'Dr. Emily Rodriguez', location: 'Floor 1', phone: 'Ext. 101', patients: 67 },
    { id: 5, name: 'Emergency Medicine', head: 'Dr. Lisa Wang', location: 'Ground Floor', phone: 'Ext. 001', patients: 15 }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Michael Chen', position: 'Chief Cardiologist', department: 'Cardiology', experience: '15 years', phone: '+1-555-0101' },
    { id: 2, name: 'Dr. Sarah Johnson', position: 'Head of Neurology', department: 'Neurology', experience: '12 years', phone: '+1-555-0102' },
    { id: 3, name: 'Dr. David Wilson', position: 'Orthopedic Surgeon', department: 'Orthopedics', experience: '18 years', phone: '+1-555-0103' },
    { id: 4, name: 'Dr. Emily Rodriguez', position: 'Pediatrician', department: 'Pediatrics', experience: '10 years', phone: '+1-555-0104' },
    { id: 5, name: 'Dr. Lisa Wang', position: 'Emergency Physician', department: 'Emergency Medicine', experience: '8 years', phone: '+1-555-0105' }
  ]);

  const [referralForm, setReferralForm] = useState({
    patientName: '',
    patientId: '',
    referringDoctor: '',
    department: '',
    reason: '',
    urgency: 'Normal',
    notes: ''
  });

  const [showReferralSuccess, setShowReferralSuccess] = useState(false);

  const urgencyLevels = ['Normal', 'Urgent', 'Critical', 'Emergency'];

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    setShowReferralSuccess(true);
    setTimeout(() => {
      setShowReferralSuccess(false);
      setReferralForm({
        patientName: '',
        patientId: '',
        referringDoctor: '',
        department: '',
        reason: '',
        urgency: 'Normal',
        notes: ''
      });
    }, 3000);
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

  const InfoCard = ({ title, value, icon, color }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-emerald-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (showReferralSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-emerald-200/50 text-center max-w-2xl mx-4 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-heartbeat">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Referral Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            The patient referral has been sent to the appropriate department. 
            The medical team will review and contact you shortly.
          </p>
          <button
            onClick={() => setShowReferralSuccess(false)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105"
          >
            Submit Another Referral
          </button>
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
            Hospital Information & Referrals
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Comprehensive hospital details and patient referral system</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50">
        <div className="flex flex-wrap gap-4 justify-center">
          <TabButton id="overview" label="Hospital Overview" icon="🏥" />
          <TabButton id="departments" label="Departments" icon="🏢" />
          <TabButton id="staff" label="Medical Staff" icon="👨‍⚕️" />
          <TabButton id="referral" label="Patient Referral" icon="📋" />
        </div>
      </div>

      {/* Hospital Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hospital Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard
              title="Total Capacity"
              value={hospitalInfo.capacity}
              icon="🛏️"
              color="from-emerald-500 to-teal-500"
            />
            <InfoCard
              title="Specialties"
              value={hospitalInfo.specialties.length}
              icon="🏥"
              color="from-cyan-500 to-blue-500"
            />
            <InfoCard
              title="Departments"
              value={departments.length}
              icon="🏢"
              color="from-blue-500 to-indigo-500"
            />
            <InfoCard
              title="Years Established"
              value={new Date().getFullYear() - parseInt(hospitalInfo.established)}
              icon="📅"
              color="from-purple-500 to-pink-500"
            />
          </div>

          {/* Hospital Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg">
                🏥
              </span>
              Hospital Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-600 font-semibold">Hospital Name</label>
                  <p className="text-gray-900 text-lg">{hospitalInfo.name}</p>
                </div>
                <div>
                  <label className="text-emerald-600 font-semibold">Address</label>
                  <p className="text-gray-900">{hospitalInfo.address}</p>
                </div>
                <div>
                  <label className="text-emerald-600 font-semibold">Phone</label>
                  <p className="text-gray-900">{hospitalInfo.phone}</p>
                </div>
                <div>
                  <label className="text-emerald-600 font-semibold">Email</label>
                  <p className="text-gray-900">{hospitalInfo.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-600 font-semibold">Website</label>
                  <p className="text-gray-900">{hospitalInfo.website}</p>
                </div>
                <div>
                  <label className="text-emerald-600 font-semibold">Established</label>
                  <p className="text-gray-900">{hospitalInfo.established}</p>
                </div>
                <div>
                  <label className="text-emerald-600 font-semibold">Accreditation</label>
                  <p className="text-gray-900">{hospitalInfo.accreditation}</p>
                </div>
                <div>
                  <label className="text-emerald-600 font-semibold">Visiting Hours</label>
                  <p className="text-gray-900">{hospitalInfo.visitingHours}</p>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mt-8">
              <label className="text-emerald-600 font-semibold block mb-4">Medical Specialties</label>
              <div className="flex flex-wrap gap-3">
                {hospitalInfo.specialties.map((specialty, index) => (
                  <span key={index} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="mt-8">
              <label className="text-emerald-600 font-semibold block mb-4">Available Facilities</label>
              <div className="flex flex-wrap gap-3">
                {hospitalInfo.facilities.map((facility, index) => (
                  <span key={index} className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Departments Tab */}
      {activeTab === 'departments' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-lg">
                    🏢
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Head:</span>
                    <span className="text-gray-900">{dept.head}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Location:</span>
                    <span className="text-gray-900">{dept.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Phone:</span>
                    <span className="text-gray-900">{dept.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Patients:</span>
                    <span className="text-gray-900 font-bold">{dept.patients}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {activeTab === 'staff' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                👨‍⚕️
              </span>
              Medical Staff Directory
            </h3>
            
            <div className="space-y-4">
              {staff.map((member) => (
                <div key={member.id} className="border border-emerald-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                        <p className="text-emerald-600 font-semibold">{member.position}</p>
                        <p className="text-gray-600">{member.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{member.experience}</p>
                      <p className="text-emerald-600 font-semibold">{member.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Referral Tab */}
      {activeTab === 'referral' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                📋
              </span>
              Patient Referral Form
            </h3>
            
            <form onSubmit={handleReferralSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Patient Name</label>
                  <input
                    type="text"
                    value={referralForm.patientName}
                    onChange={(e) => setReferralForm({...referralForm, patientName: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Patient ID</label>
                  <input
                    type="text"
                    value={referralForm.patientId}
                    onChange={(e) => setReferralForm({...referralForm, patientId: e.target.value.toUpperCase()})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Referring Doctor</label>
                  <input
                    type="text"
                    value={referralForm.referringDoctor}
                    onChange={(e) => setReferralForm({...referralForm, referringDoctor: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Doctor's name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Department</label>
                  <select
                    value={referralForm.department}
                    onChange={(e) => setReferralForm({...referralForm, department: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Urgency Level</label>
                  <select
                    value={referralForm.urgency}
                    onChange={(e) => setReferralForm({...referralForm, urgency: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    {urgencyLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Reason for Referral</label>
                  <input
                    type="text"
                    value={referralForm.reason}
                    onChange={(e) => setReferralForm({...referralForm, reason: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Brief reason for referral"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-emerald-600 font-semibold">Additional Notes</label>
                <textarea
                  value={referralForm.notes}
                  onChange={(e) => setReferralForm({...referralForm, notes: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Any additional information or special requirements"
                />
              </div>
              
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-2xl">📋</span>
                  Submit Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetails;
