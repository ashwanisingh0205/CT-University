import React, { useState } from 'react';

const BloodBank = () => {
  const [activeTab, setActiveTab] = useState('bloodPackages');
  const [requestData, setRequestData] = useState({
    patientId: '',
    patientName: '',
    bloodType: '',
    bloodPackage: '',
    units: '',
    urgency: 'Normal',
    reason: '',
    doctorName: '',
    contactNumber: '',
    ward: '',
    bedNumber: '',
    estimatedTime: ''
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [showRequestSuccess, setShowRequestSuccess] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  const [showExternalRequest, setShowExternalRequest] = useState(false);
  const [externalRequestData, setExternalRequestData] = useState({
    patientId: '',
    patientName: '',
    bloodType: '',
    bloodPackage: '',
    units: '',
    urgency: 'Normal',
    reason: '',
    doctorName: '',
    contactNumber: '',
    ward: '',
    bedNumber: '',
    requestingHospital: '',
    externalHospital: ''
  });
  const [isExternalRequesting, setIsExternalRequesting] = useState(false);
  const [recentRequests, setRecentRequests] = useState([
    {
      id: 'BR001',
      patientId: 'P001',
      patientName: 'Rajesh Kumar',
      bloodType: 'O+',
      bloodPackage: 'Whole Blood',
      units: 2,
      urgency: 'Urgent',
      status: 'Processing',
      requestTime: '2024-12-19 14:30',
      estimatedDelivery: '1 hour'
    },
    {
      id: 'BR002',
      patientId: 'P002',
      patientName: 'Priya Sharma',
      bloodType: 'A+',
      bloodPackage: 'Red Blood Cells',
      units: 1,
      urgency: 'Critical',
      status: 'Delivered',
      requestTime: '2024-12-19 13:15',
      estimatedDelivery: '30 minutes'
    },
    {
      id: 'BR003',
      patientId: 'P003',
      patientName: 'Amit Singh',
      bloodType: 'B+',
      bloodPackage: 'Platelets',
      units: 3,
      urgency: 'Emergency',
      status: 'In Transit',
      requestTime: '2024-12-19 12:45',
      estimatedDelivery: '15 minutes'
    }
  ]);

  // Blood packages data
  const bloodPackages = [
    { type: 'Whole Blood', units: 45, expiry: '2024-12-25', bloodGroup: 'O+', status: 'Available', price: 2500 },
    { type: 'Red Blood Cells', units: 32, expiry: '2024-12-20', bloodGroup: 'A+', status: 'Available', price: 3000 },
    { type: 'Platelets', units: 18, expiry: '2024-12-18', bloodGroup: 'B+', status: 'Low Stock', price: 4000 },
    { type: 'Plasma', units: 28, expiry: '2024-12-22', bloodGroup: 'AB+', status: 'Available', price: 3500 },
    { type: 'Cryoprecipitate', units: 12, expiry: '2024-12-15', bloodGroup: 'O-', status: 'Critical', price: 5000 },
    { type: 'Fresh Frozen Plasma', units: 25, expiry: '2024-12-21', bloodGroup: 'A-', status: 'Available', price: 3200 },
    { type: 'Packed Red Cells', units: 35, expiry: '2024-12-23', bloodGroup: 'B-', status: 'Available', price: 2800 },
    { type: 'Platelet Concentrate', units: 22, expiry: '2024-12-19', bloodGroup: 'AB-', status: 'Low Stock', price: 4500 },
    { type: 'Whole Blood', units: 38, expiry: '2024-12-24', bloodGroup: 'A+', status: 'Available', price: 2500 },
    { type: 'Red Blood Cells', units: 29, expiry: '2024-12-21', bloodGroup: 'B+', status: 'Available', price: 3000 },
    { type: 'Plasma', units: 31, expiry: '2024-12-23', bloodGroup: 'O-', status: 'Available', price: 3500 },
    { type: 'Fresh Frozen Plasma', units: 19, expiry: '2024-12-20', bloodGroup: 'AB+', status: 'Low Stock', price: 3200 }
  ];

  // Injections & Medicines data
  const medicines = [
    { name: 'Insulin', type: 'Injection', stock: 150, expiry: '2025-06-15', category: 'Diabetes', price: 120 },
    { name: 'Morphine', type: 'Injection', stock: 45, expiry: '2024-12-30', category: 'Pain Relief', price: 85 },
    { name: 'Adrenaline', type: 'Injection', stock: 80, expiry: '2025-03-20', category: 'Emergency', price: 95 },
    { name: 'Penicillin', type: 'Injection', stock: 120, expiry: '2025-01-10', category: 'Antibiotic', price: 75 },
    { name: 'Paracetamol', type: 'Tablet', stock: 500, expiry: '2025-08-15', category: 'Pain Relief', price: 25 },
    { name: 'Aspirin', type: 'Tablet', stock: 300, expiry: '2025-07-20', category: 'Cardiac', price: 35 },
    { name: 'Metformin', type: 'Tablet', stock: 200, expiry: '2025-05-25', category: 'Diabetes', price: 45 },
    { name: 'Atorvastatin', type: 'Tablet', stock: 180, expiry: '2025-04-30', category: 'Cardiac', price: 55 },
    { name: 'Dexamethasone', type: 'Injection', stock: 60, expiry: '2025-02-15', category: 'Anti-inflammatory', price: 65 },
    { name: 'Furosemide', type: 'Injection', stock: 90, expiry: '2025-03-10', category: 'Diuretic', price: 40 },
    { name: 'Omeprazole', type: 'Tablet', stock: 250, expiry: '2025-06-30', category: 'Gastro', price: 30 },
    { name: 'Amlodipine', type: 'Tablet', stock: 220, expiry: '2025-05-15', category: 'Cardiac', price: 50 }
  ];

  // Hospital details
  const hospitalInfo = {
    name: 'Arogya Multispeciality Hospital',
    address: '123 Medical District, New Delhi - 110001',
    phone: '+91-11-2345-6789',
    emergency: '+91-11-108',
    email: 'info@arogyahospital.com',
    bloodBankPhone: '+91-11-2345-6790',
    bloodBankEmail: 'bloodbank@arogyahospital.com'
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = ['Normal', 'Urgent', 'Critical', 'Emergency'];
  const wardOptions = ['ICU', 'General Ward', 'Emergency Ward', 'Cardiology Ward', 'Neurology Ward', 'Pediatric Ward', 'Surgery Ward', 'Oncology Ward'];
  const bloodPackageTypes = ['Whole Blood', 'Red Blood Cells', 'Platelets', 'Plasma', 'Cryoprecipitate', 'Fresh Frozen Plasma', 'Packed Red Cells', 'Platelet Concentrate'];
  
  // External hospitals data
  const externalHospitals = [
    {
      id: 'EH001',
      name: 'Apollo Hospitals',
      address: 'Delhi - NCR',
      phone: '+91-11-2987-1000',
      bloodBankPhone: '+91-11-2987-1001',
      distance: '5.2 km',
      rating: 4.8,
      specialties: ['Cardiology', 'Neurology', 'Oncology'],
      bloodAvailability: ['O+', 'A+', 'B+', 'AB+']
    },
    {
      id: 'EH002',
      name: 'Fortis Healthcare',
      address: 'Gurgaon, Haryana',
      phone: '+91-124-496-2000',
      bloodBankPhone: '+91-124-496-2001',
      distance: '8.7 km',
      rating: 4.6,
      specialties: ['Emergency Medicine', 'Trauma', 'ICU'],
      bloodAvailability: ['O-', 'A-', 'B-', 'AB-']
    },
    {
      id: 'EH003',
      name: 'Max Super Speciality Hospital',
      address: 'Saket, New Delhi',
      phone: '+91-11-4055-4000',
      bloodBankPhone: '+91-11-4055-4001',
      distance: '12.3 km',
      rating: 4.7,
      specialties: ['Pediatrics', 'Gynecology', 'Orthopedics'],
      bloodAvailability: ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-']
    },
    {
      id: 'EH004',
      name: 'Medanta - The Medicity',
      address: 'Gurgaon, Haryana',
      phone: '+91-124-414-1414',
      bloodBankPhone: '+91-124-414-1415',
      distance: '15.8 km',
      rating: 4.9,
      specialties: ['Cardiac Surgery', 'Transplant', 'Cancer Care'],
      bloodAvailability: ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-']
    },
    {
      id: 'EH005',
      name: 'BLK Super Speciality Hospital',
      address: 'Rajinder Nagar, New Delhi',
      phone: '+91-11-3040-3040',
      bloodBankPhone: '+91-11-3040-3041',
      distance: '18.5 km',
      rating: 4.5,
      specialties: ['Neurology', 'Spine Surgery', 'Urology'],
      bloodAvailability: ['O+', 'A+', 'B+', 'AB+']
    }
  ];

  const handleBloodRequest = async (e) => {
    e.preventDefault();
    if (!requestData.patientId || !requestData.bloodType || !requestData.units || !requestData.bloodPackage) {
      alert('Please fill in all required fields: Patient ID, Blood Type, Blood Package, and Units');
      return;
    }

    setIsRequesting(true);

    // Simulate blood request process
    setTimeout(() => {
      const requestId = `BR${Date.now().toString().slice(-6)}`;
      const selectedBlood = bloodPackages.find(b => b.bloodGroup === requestData.bloodType && b.type === requestData.bloodPackage);
      
      // Calculate estimated delivery time based on urgency
      let estimatedDelivery;
      switch(requestData.urgency) {
        case 'Emergency': estimatedDelivery = '15-30 minutes'; break;
        case 'Critical': estimatedDelivery = '30-45 minutes'; break;
        case 'Urgent': estimatedDelivery = '1-2 hours'; break;
        default: estimatedDelivery = '2-4 hours'; break;
      }

      const newRequest = {
        requestId,
        ...requestData,
        bloodPackage: selectedBlood,
        timestamp: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        estimatedDelivery,
        status: 'Processing',
        totalCost: selectedBlood ? selectedBlood.price * parseInt(requestData.units) : 0
      };
      
      setRequestDetails(newRequest);
      setShowRequestSuccess(true);
      setIsRequesting(false);
      
      // Add to recent requests
      setRecentRequests(prev => [newRequest, ...prev.slice(0, 9)]);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setRequestData({
          patientId: '',
          patientName: '',
          bloodType: '',
          bloodPackage: '',
          units: '',
          urgency: 'Normal',
          reason: '',
          doctorName: '',
          contactNumber: '',
          ward: '',
          bedNumber: '',
          estimatedTime: ''
        });
        setShowRequestSuccess(false);
        setRequestDetails(null);
      }, 5000);
    }, 2000);
  };

  const handleExternalBloodRequest = async (e) => {
    e.preventDefault();
    if (!externalRequestData.patientId || !externalRequestData.bloodType || !externalRequestData.units || !externalRequestData.bloodPackage || !externalRequestData.externalHospital) {
      alert('Please fill in all required fields: Patient ID, Blood Type, Blood Package, Units, and External Hospital');
      return;
    }

    setIsExternalRequesting(true);

    // Simulate external blood request process
    setTimeout(() => {
      const requestId = `EBR${Date.now().toString().slice(-6)}`;
      const selectedHospital = externalHospitals.find(h => h.id === externalRequestData.externalHospital);
      
      // Calculate estimated delivery time based on urgency and distance
      let estimatedDelivery;
      const distance = parseFloat(selectedHospital.distance);
      switch(externalRequestData.urgency) {
        case 'Emergency': estimatedDelivery = `${Math.ceil(distance * 2)}-${Math.ceil(distance * 3)} minutes`; break;
        case 'Critical': estimatedDelivery = `${Math.ceil(distance * 3)}-${Math.ceil(distance * 4)} minutes`; break;
        case 'Urgent': estimatedDelivery = `${Math.ceil(distance * 4)}-${Math.ceil(distance * 6)} minutes`; break;
        default: estimatedDelivery = `${Math.ceil(distance * 6)}-${Math.ceil(distance * 8)} minutes`; break;
      }

      const newExternalRequest = {
        requestId,
        ...externalRequestData,
        requestingHospital: 'Arogya Multispeciality Hospital',
        externalHospitalName: selectedHospital.name,
        externalHospitalPhone: selectedHospital.phone,
        externalHospitalBloodBank: selectedHospital.bloodBankPhone,
        distance: selectedHospital.distance,
        timestamp: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        estimatedDelivery,
        status: 'Processing',
        totalCost: 0, // External requests may have different pricing
        isExternal: true
      };
      
      setRequestDetails(newExternalRequest);
      setShowRequestSuccess(true);
      setIsExternalRequesting(false);
      setShowExternalRequest(false);
      
      // Add to recent requests
      setRecentRequests(prev => [newExternalRequest, ...prev.slice(0, 9)]);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setExternalRequestData({
          patientId: '',
          patientName: '',
          bloodType: '',
          bloodPackage: '',
          units: '',
          urgency: 'Normal',
          reason: '',
          doctorName: '',
          contactNumber: '',
          ward: '',
          bedNumber: '',
          requestingHospital: '',
          externalHospital: ''
        });
        setShowRequestSuccess(false);
        setRequestDetails(null);
      }, 5000);
    }, 3000); // Longer processing time for external requests
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRequestStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Transit': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
        activeTab === id
          ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
          : 'text-red-600 hover:bg-red-50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200/50 hover:shadow-red-500/20 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-red-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change} today
            </p>
          )}
        </div>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (showRequestSuccess && requestDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-200/50 text-center max-w-2xl mx-4 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-heartbeat">
            <span className="text-4xl">🩸</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {requestDetails.isExternal ? 'External Blood Request Submitted!' : 'Blood Request Submitted!'}
          </h2>
          
          <div className={`${requestDetails.isExternal ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'} border rounded-xl p-6 mb-6 text-left`}>
            <h3 className={`text-lg font-bold ${requestDetails.isExternal ? 'text-orange-700' : 'text-red-700'} mb-4`}>
              {requestDetails.isExternal ? 'External Blood Request Details:' : 'Blood Request Details:'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Request ID:</span>
                <span className="font-mono font-bold text-red-700">{requestDetails.requestId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient ID:</span>
                <span className="font-semibold">{requestDetails.patientId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient Name:</span>
                <span className="font-semibold">{requestDetails.patientName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Blood Type:</span>
                <span className="font-semibold">{requestDetails.bloodType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Blood Package:</span>
                <span className="font-semibold">{requestDetails.bloodPackage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Units Required:</span>
                <span className="font-semibold">{requestDetails.units}</span>
              </div>
              {requestDetails.isExternal && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requesting Hospital:</span>
                    <span className="font-semibold">{requestDetails.requestingHospital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">External Hospital:</span>
                    <span className="font-semibold">{requestDetails.externalHospitalName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-semibold">{requestDetails.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">External Hospital Phone:</span>
                    <span className="font-semibold">{requestDetails.externalHospitalPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">External Blood Bank:</span>
                    <span className="font-semibold">{requestDetails.externalHospitalBloodBank}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Ward:</span>
                <span className="font-semibold">{requestDetails.ward || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bed Number:</span>
                <span className="font-semibold">{requestDetails.bedNumber || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Urgency:</span>
                <span className="font-semibold">{requestDetails.urgency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold">{requestDetails.estimatedDelivery}</span>
              </div>
              {!requestDetails.isExternal && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="font-semibold text-red-600">₹{requestDetails.totalCost}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Request Time:</span>
                <span className="font-semibold">{requestDetails.timestamp} IST</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            {requestDetails.isExternal 
              ? `Your external blood request has been submitted successfully. The blood bank team will coordinate with ${requestDetails.externalHospitalName} to arrange blood delivery.`
              : 'Your blood request has been submitted successfully. The blood bank team will process your request and deliver the blood to the specified location.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowRequestSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
            >
              New Blood Request
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              Print Request
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
          <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Blood Bank & Medical Supplies
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Manage blood packages, medicines, and medical supplies</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Blood Units Available"
          value={bloodPackages.reduce((sum, blood) => sum + blood.units, 0)}
          icon="🩸"
          color="from-red-500 to-pink-500"
          change={12}
        />
        <StatCard
          title="Medicine Stock"
          value={medicines.reduce((sum, med) => sum + med.stock, 0)}
          icon="💊"
          color="from-blue-500 to-cyan-500"
          change={8}
        />
        <StatCard
          title="Critical Stock"
          value={bloodPackages.filter(b => b.status === 'Critical').length}
          icon="⚠️"
          color="from-orange-500 to-red-500"
          change={-2}
        />
        <StatCard
          title="Requests Today"
          value="24"
          icon="📋"
          color="from-purple-500 to-indigo-500"
          change={5}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200/50">
        <div className="flex flex-wrap gap-4 justify-center">
          <TabButton id="bloodPackages" label="Blood Packages" icon="🩸" />
          <TabButton id="medicines" label="Medicines" icon="💉" />
          <TabButton id="request" label="Blood Request" icon="📋" />
          {/* <TabButton id="recentRequests" label="Recent Requests" icon="📊" /> */}
          <TabButton id="hospital" label="Hospital Info" icon="🏥" />
        </div>
      </div>

      {/* Blood Packages Tab */}
      {activeTab === 'bloodPackages' && (
        <div className="space-y-6 animate-fadeIn">
          {/* External Request Button */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Need Blood from Another Hospital?</h3>
                <p className="text-gray-600">Request blood from external hospitals when not available locally</p>
              </div>
              <button
                onClick={() => setShowExternalRequest(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span className="text-lg">🏥</span>
                Request from External Hospital
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodPackages.map((blood, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200/50 hover:shadow-red-500/20 transition-all duration-300 hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{blood.type}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(blood.status)}`}>
                    {blood.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-red-600 font-semibold">Blood Group:</span>
                    <span className="font-semibold">{blood.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600 font-semibold">Units Available:</span>
                    <span className="font-semibold">{blood.units}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600 font-semibold">Expiry Date:</span>
                    <span className="font-semibold">{blood.expiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600 font-semibold">Price per Unit:</span>
                    <span className="font-semibold">₹{blood.price}</span>
                  </div>
                </div>
                
                {/* <button className="w-full px-4 py-2 bg-gradient-to-r from-red-300 to-pink-400 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105">
                  Request Blood
                </button> */}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicines.map((medicine, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/50 hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{medicine.name}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {medicine.type}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Category:</span>
                    <span className="font-semibold">{medicine.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Stock:</span>
                    <span className="font-semibold">{medicine.stock} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Expiry:</span>
                    <span className="font-semibold">{medicine.expiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Price:</span>
                    <span className="font-semibold">₹{medicine.price}</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105">
                  Request Medicine
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blood Request Tab */}
      {activeTab === 'request' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                🩸
              </span>
              Blood Request Form
            </h3>
            
            <form onSubmit={handleBloodRequest} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">
                    Patient ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={requestData.patientId}
                    onChange={(e) => setRequestData({...requestData, patientId: e.target.value.toUpperCase()})}
                    required
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient ID (e.g., P001)"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">Patient Name</label>
                  <input
                    type="text"
                    value={requestData.patientName}
                    onChange={(e) => setRequestData({...requestData, patientName: e.target.value})}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">
                    Blood Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requestData.bloodType}
                    onChange={(e) => setRequestData({...requestData, bloodType: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select blood type</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">
                    Blood Package <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requestData.bloodPackage}
                    onChange={(e) => setRequestData({...requestData, bloodPackage: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select blood package</option>
                    {bloodPackageTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">
                    Units Required <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={requestData.units}
                    onChange={(e) => setRequestData({...requestData, units: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Number of units"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">Urgency Level</label>
                  <select
                    value={requestData.urgency}
                    onChange={(e) => setRequestData({...requestData, urgency: e.target.value})}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    {urgencyLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">Ward</label>
                  <select
                    value={requestData.ward}
                    onChange={(e) => setRequestData({...requestData, ward: e.target.value})}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select ward</option>
                    {wardOptions.map((ward) => (
                      <option key={ward} value={ward}>{ward}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">Bed Number</label>
                  <input
                    type="text"
                    value={requestData.bedNumber}
                    onChange={(e) => setRequestData({...requestData, bedNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter bed number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">Doctor Name</label>
                  <input
                    type="text"
                    value={requestData.doctorName}
                    onChange={(e) => setRequestData({...requestData, doctorName: e.target.value})}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Attending doctor name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">Contact Number</label>
                  <input
                    type="tel"
                    value={requestData.contactNumber}
                    onChange={(e) => setRequestData({...requestData, contactNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="+91-98765-43210"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-red-600 font-semibold">Reason for Blood Request</label>
                <textarea
                  value={requestData.reason}
                  onChange={(e) => setRequestData({...requestData, reason: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Describe the medical condition requiring blood transfusion"
                />
              </div>
              
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isRequesting}
                  className="px-12 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isRequesting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🩸</span>
                      Submit Blood Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recent Requests Tab */}
      {activeTab === 'recentRequests' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                📊
              </span>
              Recent Blood Requests
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Request ID</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Patient</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Blood Type</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Package</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Units</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Urgency</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Status</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">Request Time</th>
                    <th className="text-left py-4 px-6 text-red-600 font-semibold">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request) => (
                    <tr key={request.id} className="border-b border-red-100 hover:bg-red-50 transition-colors duration-200">
                      <td className="py-4 px-6 font-mono text-gray-900">
                        {request.id}
                        {request.isExternal && <span className="ml-2 text-orange-600 text-xs">(EXT)</span>}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{request.patientName}</p>
                          <p className="text-sm text-gray-600">ID: {request.patientId}</p>
                          {request.isExternal && (
                            <p className="text-xs text-orange-600 font-medium">
                              External: {request.externalHospitalName}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{request.bloodType}</td>
                      <td className="py-4 px-6 text-gray-900">{request.bloodPackage}</td>
                      <td className="py-4 px-6 text-gray-900">{request.units}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.urgency === 'Emergency' ? 'bg-red-100 text-red-700' :
                          request.urgency === 'Critical' ? 'bg-orange-100 text-orange-700' :
                          request.urgency === 'Urgent' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRequestStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{request.requestTime}</td>
                      <td className="py-4 px-6 text-gray-900">{request.estimatedDelivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Info Tab */}
      {activeTab === 'hospital' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg">
                🏥
              </span>
              Hospital Details & Services
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hospital Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-emerald-600">🏥</span>
                  Hospital Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-emerald-600 font-semibold">Name:</span>
                    <p className="text-gray-900">{hospitalInfo.name}</p>
                  </div>
                  <div>
                    <span className="text-emerald-600 font-semibold">Address:</span>
                    <p className="text-gray-900">{hospitalInfo.address}</p>
                  </div>
                  <div>
                    <span className="text-emerald-600 font-semibold">Phone:</span>
                    <p className="text-gray-900">{hospitalInfo.phone}</p>
                  </div>
                  <div>
                    <span className="text-emerald-600 font-semibold">Emergency:</span>
                    <p className="text-gray-900">{hospitalInfo.emergency}</p>
                  </div>
                  <div>
                    <span className="text-emerald-600 font-semibold">Email:</span>
                    <p className="text-gray-900">{hospitalInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Blood Bank Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-red-200/50">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-red-600">🩸</span>
                  Blood Bank Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-red-600 font-semibold">Blood Bank Phone:</span>
                    <p className="text-gray-900">{hospitalInfo.bloodBankPhone}</p>
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">Blood Bank Email:</span>
                    <p className="text-gray-900">{hospitalInfo.bloodBankEmail}</p>
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">Operating Hours:</span>
                    <p className="text-gray-900">24/7 Emergency Service</p>
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">Location:</span>
                    <p className="text-gray-900">Ground Floor, Block A</p>
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">License:</span>
                    <p className="text-gray-900">BB-2024-001</p>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-emerald-600">🕒</span>
                  Operating Hours
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Emergency:</span>
                    <span className="text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">OPD:</span>
                    <span className="text-gray-900">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">ICU:</span>
                    <span className="text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Pharmacy:</span>
                    <span className="text-gray-900">6:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Blood Bank:</span>
                    <span className="text-gray-900">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-semibold">Lab Services:</span>
                    <span className="text-gray-900">6:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <span>📞</span>
                Call Hospital
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <span>🩸</span>
                Call Blood Bank
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <span>📧</span>
                Send Email
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <span>🚨</span>
                Emergency Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* External Blood Request Dialog */}
      {showExternalRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-200/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xl">
                  🏥
                </span>
                External Hospital Blood Request
              </h2>
              <button
                onClick={() => setShowExternalRequest(false)}
                className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Available External Hospitals */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2">
                  <span>🏥</span>
                  Available External Hospitals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {externalHospitals.map((hospital) => (
                    <div key={hospital.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-gray-900">{hospital.name}</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-semibold">{hospital.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-orange-600 font-semibold">Distance:</span>
                          <span className="font-semibold">{hospital.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-600 font-semibold">Phone:</span>
                          <span className="font-semibold">{hospital.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-600 font-semibold">Blood Bank:</span>
                          <span className="font-semibold">{hospital.bloodBankPhone}</span>
                        </div>
                        <div>
                          <span className="text-orange-600 font-semibold">Available Blood Types:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hospital.bloodAvailability.map((bloodType) => (
                              <span key={bloodType} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                {bloodType}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Request Form */}
              <form onSubmit={handleExternalBloodRequest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">
                      Patient ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={externalRequestData.patientId}
                      onChange={(e) => setExternalRequestData({...externalRequestData, patientId: e.target.value.toUpperCase()})}
                      required
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter patient ID (e.g., P001)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">Patient Name</label>
                    <input
                      type="text"
                      value={externalRequestData.patientName}
                      onChange={(e) => setExternalRequestData({...externalRequestData, patientName: e.target.value})}
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter patient name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">
                      Blood Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={externalRequestData.bloodType}
                      onChange={(e) => setExternalRequestData({...externalRequestData, bloodType: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select blood type</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">
                      Blood Package <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={externalRequestData.bloodPackage}
                      onChange={(e) => setExternalRequestData({...externalRequestData, bloodPackage: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select blood package</option>
                      {bloodPackageTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">
                      Units Required <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={externalRequestData.units}
                      onChange={(e) => setExternalRequestData({...externalRequestData, units: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Number of units"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">
                      External Hospital <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={externalRequestData.externalHospital}
                      onChange={(e) => setExternalRequestData({...externalRequestData, externalHospital: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select external hospital</option>
                      {externalHospitals.map((hospital) => (
                        <option key={hospital.id} value={hospital.id}>
                          {hospital.name} ({hospital.distance})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">Urgency Level</label>
                    <select
                      value={externalRequestData.urgency}
                      onChange={(e) => setExternalRequestData({...externalRequestData, urgency: e.target.value})}
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    >
                      {urgencyLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">Ward</label>
                    <select
                      value={externalRequestData.ward}
                      onChange={(e) => setExternalRequestData({...externalRequestData, ward: e.target.value})}
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select ward</option>
                      {wardOptions.map((ward) => (
                        <option key={ward} value={ward}>{ward}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">Bed Number</label>
                    <input
                      type="text"
                      value={externalRequestData.bedNumber}
                      onChange={(e) => setExternalRequestData({...externalRequestData, bedNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter bed number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">Doctor Name</label>
                    <input
                      type="text"
                      value={externalRequestData.doctorName}
                      onChange={(e) => setExternalRequestData({...externalRequestData, doctorName: e.target.value})}
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Attending doctor name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-red-600 font-semibold">Contact Number</label>
                    <input
                      type="tel"
                      value={externalRequestData.contactNumber}
                      onChange={(e) => setExternalRequestData({...externalRequestData, contactNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="+91-98765-43210"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-red-600 font-semibold">Reason for External Blood Request</label>
                  <textarea
                    value={externalRequestData.reason}
                    onChange={(e) => setExternalRequestData({...externalRequestData, reason: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Describe why blood is needed from external hospital"
                  />
                </div>
                
                <div className="flex justify-center pt-6 gap-4">
                  <button
                    type="button"
                    onClick={() => setShowExternalRequest(false)}
                    className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isExternalRequesting}
                    className="px-12 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    {isExternalRequesting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing External Request...
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">🏥</span>
                        Submit External Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBank;
