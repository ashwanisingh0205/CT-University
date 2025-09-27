import React, { useState } from 'react';
import { 
  MapPinIcon, 
  StarIcon, 
  UserGroupIcon, 
  EyeIcon,
  PhoneIcon,
  ClockIcon,
  HeartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  // 1. Data Definitions (moved inside the component)
  const hospitals = [
    {
      id: 1,
      name: "Community Health Center",
      rating: 4.8,
      location: "Downtown Medical District",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      specialties: ["Cardiology", "Neurology", "Orthopedics", "Emergency"],
      totalBeds: 250,
      availableBeds: 45,
      established: 1985,
      accreditation: "JCI Accredited",
      phone: "+91-98765-43210",
      email: "info@capitolhospital.com"
    },
    {
      id: 2,
      name: "Sacred Heart Hospital",
      rating: 4.9,
      location: "Westside Healthcare Center",
      image: "https://t3.ftcdn.net/jpg/02/11/15/66/360_F_211156620_CeBr5etdTNXLb231sFcQ8M9YD1OY5IW8.jpg",
      specialties: ["Pediatrics", "Maternity", "Oncology", "Surgery"],
      totalBeds: 180,
      availableBeds: 32,
      established: 1972,
      accreditation: "NABH Accredited",
      phone: "+91-98765-43211",
      email: "contact@sacredheart.com"
    },
    {
      id: 3,
      name: "Kamal Multispeciality Hospital",
      rating: 4.7,
      location: "Eastside Medical Complex",
      image: "https://media.istockphoto.com/id/1303278663/photo/modern-building-facade-with-hospital-word-signage.jpg?s=612x612&w=0&k=20&c=XGFotldYyNSURH2PnAIR9lE7gFGH0atHekaeX6A900I=",
      specialties: ["Dermatology", "ENT", "Gastroenterology", "Urology"],
      totalBeds: 200,
      availableBeds: 28,
      established: 1990,
      accreditation: "ISO Certified",
      phone: "+91-98765-43212",
      email: "admin@kamalhospital.com"
    },
    {
      id: 4,
      name: "Carebest Superspeciality Hospital",
      rating: 4.9,
      location: "Northside Health Plaza",
      image: "https://plus.unsplash.com/premium_photo-1672097247893-4f8660247b1f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWwlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      specialties: ["Cardiac Surgery", "Neurosurgery", "Transplant", "ICU"],
      totalBeds: 300,
      availableBeds: 52,
      established: 1988,
      accreditation: "NABH Accredited",
      phone: "+91-98765-43213",
      email: "info@carebest.com"
    },
    {
      id: 5,
      name: "Metro General Hospital",
      rating: 4.6,
      location: "Central Business District",
      image: "https://i.pinimg.com/736x/2f/63/5c/2f635cf35219c2607cd7a084da8999a7.jpg",
      specialties: ["Internal Medicine", "Radiology", "Pathology", "Anesthesia"],
      totalBeds: 220,
      availableBeds: 38,
      established: 1995,
      accreditation: "ISO Certified",
      phone: "+91-98765-43214",
      email: "info@metrogeneral.com"
    },
    {
      id: 6,
      name: "Sunrise Medical Center",
      rating: 4.8,
      location: "Riverside Health District",
      image: "https://media.istockphoto.com/id/1130389312/photo/building-with-large-h-sign-for-hospital.jpg?s=612x612&w=0&k=20&c=qn7-C6oblqEnGkmsOwAKVb25rJb9qA188heA14TyK9o=",
      specialties: ["Family Medicine", "Psychiatry", "Dermatology", "Ophthalmology"],
      totalBeds: 160,
      availableBeds: 25,
      established: 1980,
      accreditation: "NABH Accredited",
      phone: "+91-98765-43215",
      email: "contact@sunrisemedical.com"
    },
    {
      id: 7,
      name: "Elite Healthcare Institute",
      rating: 4.9,
      location: "Tech Park Medical Zone",
      image: "https://frontdesk.co.in/wp-content/uploads/2018/12/20180717_182111-e1546186709601.jpg",
      specialties: ["Robotic Surgery", "Telemedicine", "AI Diagnostics", "Precision Medicine"],
      totalBeds: 180,
      availableBeds: 42,
      established: 2010,
      accreditation: "JCI Accredited",
      phone: "+91-98765-43216",
      email: "info@elitehealthcare.com"
    },
    {
      id: 8,
      name: "Community Health Center",
      rating: 4.5,
      location: "Suburban Medical Plaza",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Front_Entrance_of_Massachusetts_General_Hospital.jpg",
      specialties: ["Community Health", "Preventive Care", "Chronic Disease Management", "Wellness Programs"],
      totalBeds: 120,
      availableBeds: 18,
      established: 1975,
      accreditation: "ISO Certified",
      phone: "+91-98765-43217",
      email: "admin@communityhealth.com"
    }
  ];

  const doctorsData = {
    1: [
      { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", experience: "15 years", rating: 4.9, available: true },
      { id: 2, name: "Dr. Michael Chen", specialty: "Neurology", experience: "12 years", rating: 4.8, available: true },
      { id: 3, name: "Dr. Emily Rodriguez", specialty: "Orthopedics", experience: "18 years", rating: 4.9, available: false },
      { id: 4, name: "Dr. David Kim", specialty: "Emergency Medicine", experience: "10 years", rating: 4.7, available: true }
    ],
    2: [
      { id: 5, name: "Dr. Lisa Thompson", specialty: "Pediatrics", experience: "20 years", rating: 4.9, available: true },
      { id: 6, name: "Dr. Robert Wilson", specialty: "Maternity", experience: "16 years", rating: 4.8, available: true },
      { id: 7, name: "Dr. Jennifer Davis", specialty: "Oncology", experience: "14 years", rating: 4.9, available: true },
      { id: 8, name: "Dr. Mark Anderson", specialty: "General Surgery", experience: "22 years", rating: 4.8, available: false }
    ],
    3: [
      { id: 9, name: "Dr. Amanda Lee", specialty: "Dermatology", experience: "11 years", rating: 4.7, available: true },
      { id: 10, name: "Dr. James Brown", specialty: "ENT", experience: "13 years", rating: 4.8, available: true },
      { id: 11, name: "Dr. Maria Garcia", specialty: "Gastroenterology", experience: "17 years", rating: 4.9, available: true },
      { id: 12, name: "Dr. Kevin Taylor", specialty: "Urology", experience: "15 years", rating: 4.7, available: false }
    ],
    4: [
      { id: 13, name: "Dr. Rachel Green", specialty: "Cardiac Surgery", experience: "25 years", rating: 4.9, available: true },
      { id: 14, name: "Dr. Thomas White", specialty: "Neurosurgery", experience: "19 years", rating: 4.8, available: true },
      { id: 15, name: "Dr. Susan Black", specialty: "Transplant Surgery", experience: "21 years", rating: 4.9, available: true },
      { id: 16, name: "Dr. Christopher Blue", specialty: "Critical Care", experience: "14 years", rating: 4.8, available: true }
    ],
    5: [
      { id: 17, name: "Dr. Patricia Martinez", specialty: "Internal Medicine", experience: "16 years", rating: 4.8, available: true },
      { id: 18, name: "Dr. Richard Clark", specialty: "Radiology", experience: "14 years", rating: 4.7, available: true },
      { id: 19, name: "Dr. Linda Adams", specialty: "Pathology", experience: "18 years", rating: 4.9, available: false },
      { id: 20, name: "Dr. Steven Wright", specialty: "Anesthesia", experience: "12 years", rating: 4.6, available: true }
    ],
    6: [
      { id: 21, name: "Dr. Michelle Foster", specialty: "Family Medicine", experience: "13 years", rating: 4.8, available: true },
      { id: 22, name: "Dr. Gregory Hill", specialty: "Psychiatry", experience: "15 years", rating: 4.7, available: true },
      { id: 23, name: "Dr. Nicole Turner", specialty: "Dermatology", experience: "11 years", rating: 4.9, available: true },
      { id: 24, name: "Dr. Daniel Parker", specialty: "Ophthalmology", experience: "17 years", rating: 4.8, available: false }
    ],
    7: [
      { id: 25, name: "Dr. Alexandra Reed", specialty: "Robotic Surgery", experience: "8 years", rating: 4.9, available: true },
      { id: 26, name: "Dr. Marcus Johnson", specialty: "Telemedicine", experience: "6 years", rating: 4.8, available: true },
      { id: 27, name: "Dr. Samantha Lee", specialty: "AI Diagnostics", experience: "5 years", rating: 4.9, available: true },
      { id: 28, name: "Dr. Benjamin Carter", specialty: "Precision Medicine", experience: "7 years", rating: 4.8, available: true }
    ],
    8: [
      { id: 29, name: "Dr. Victoria Moore", specialty: "Community Health", experience: "19 years", rating: 4.7, available: true },
      { id: 30, name: "Dr. Anthony Scott", specialty: "Preventive Care", experience: "14 years", rating: 4.6, available: true },
      { id: 31, name: "Dr. Jennifer Taylor", specialty: "Chronic Disease Management", experience: "16 years", rating: 4.8, available: false },
      { id: 32, name: "Dr. Michael Brown", specialty: "Wellness Programs", experience: "12 years", rating: 4.5, available: true }
    ]
  };

  // Bed availability data for each hospital
  const bedData = {
    1: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "General" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "General" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "General" },
      { floor: "Ground Floor", room: "102", bedNumber: "2", status: "Available", type: "General" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Occupied", type: "ICU" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Available", type: "ICU" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "Private" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Occupied", type: "General" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "General" },
      { floor: "2nd Floor", room: "302", bedNumber: "1", status: "Available", type: "Private" }
    ],
    2: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "Pediatric" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "Pediatric" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "Maternity" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Available", type: "Oncology" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Occupied", type: "Oncology" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "Surgery" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Available", type: "Private" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "Private" }
    ],
    3: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "General" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "General" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "Dermatology" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Available", type: "ENT" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Occupied", type: "ENT" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "Gastroenterology" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Available", type: "Urology" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "Urology" }
    ],
    4: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "Cardiac ICU" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "Cardiac ICU" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "Neurosurgery ICU" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Available", type: "Transplant ICU" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Occupied", type: "Transplant ICU" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "General ICU" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Available", type: "Private ICU" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "Private ICU" }
    ],
    5: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "General" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "General" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "Internal Medicine" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Available", type: "Radiology" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Occupied", type: "Radiology" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "Pathology" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Available", type: "Anesthesia" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "Anesthesia" }
    ],
    6: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "Family Medicine" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "Family Medicine" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "Psychiatry" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Available", type: "Dermatology" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Occupied", type: "Dermatology" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "Ophthalmology" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Available", type: "Private" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "Private" }
    ],
    7: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "Robotic Surgery" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "Robotic Surgery" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "Telemedicine" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Available", type: "AI Diagnostics" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Occupied", type: "AI Diagnostics" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "Precision Medicine" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Available", type: "Private" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "Private" }
    ],
    8: [
      { floor: "Ground Floor", room: "101", bedNumber: "1", status: "Available", type: "Community Health" },
      { floor: "Ground Floor", room: "101", bedNumber: "2", status: "Occupied", type: "Community Health" },
      { floor: "Ground Floor", room: "102", bedNumber: "1", status: "Available", type: "Preventive Care" },
      { floor: "1st Floor", room: "201", bedNumber: "1", status: "Available", type: "Chronic Disease" },
      { floor: "1st Floor", room: "201", bedNumber: "2", status: "Occupied", type: "Chronic Disease" },
      { floor: "1st Floor", room: "202", bedNumber: "1", status: "Available", type: "Wellness Programs" },
      { floor: "2nd Floor", room: "301", bedNumber: "1", status: "Available", type: "Private" },
      { floor: "2nd Floor", room: "301", bedNumber: "2", status: "Available", type: "Private" }
    ]
  };

  // 2. State Definitions (now using useState)
  const [activeView, setActiveView] = useState('hospitals');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [generatedUser, setGeneratedUser] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showScanResult, setShowScanResult] = useState(false);
  const [scannedUser, setScannedUser] = useState(null);
  const [showBedDetails, setShowBedDetails] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    diseases: '',
    medications: '',
    allergies: '',
    medicalHistory: '',
    bloodGroup: ''
  });

  // 3. Helper Functions (now inside the component scope)
  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setActiveView('hospital-details');
  };

  const generateQRCode = (data) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}`;
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation to ensure a hospital is selected if coming from details view
    let hospitalName = 'N/A';
    if (selectedHospital) {
      hospitalName = selectedHospital.name;
      } else {
      // If patient is created from the 'User Management' tab, we can default or prompt for hospital
      // For this example, we'll assign to the first hospital if none is selected for context.
      hospitalName = hospitals[0].name;
    }

    const userId = `PAT-${Date.now()}`;
    const qrCodeUrl = generateQRCode(userId);
    
    const newUser = {
      id: userId,
      ...userForm,
      qrCode: qrCodeUrl,
      createdAt: new Date().toISOString(),
      hospital: hospitalName
    };

    setGeneratedUser(newUser);
    // Reset form for next entry
    setUserForm({
      name: '', age: '', gender: '', phone: '', email: '', address: '',
      emergencyContact: '', diseases: '', medications: '', allergies: '',
      medicalHistory: '', bloodGroup: ''
    });

    setShowUserForm(false);
    setShowQRCode(true);
  };

  const handleQRScan = () => {
    // Simulate QR scan - in real app, this would use camera/QR scanner
    const mockScannedUser = {
      id: generatedUser?.id || 'PAT-1234567890',
      name: 'Hansraj',
      age: 25,
      gender: 'Male',
      phone: '+91-98765-43218',
      email: 'hansraj.doe@email.com',
      address: '123 Main St, City, State',
      emergencyContact: '+91-98765-43219',
      diseases: 'Diabetes Type 2, Hypertension',
      medications: 'Metformin 500mg, Lisinopril 10mg',
      allergies: 'Penicillin, Shellfish',
      medicalHistory: 'Previous heart surgery in 2020',
      bloodGroup: 'O+',
      previousTreatments: [
        { date: '2023-01-15', treatment: 'Cardiac Consultation', doctor: 'Dr. Sarah Johnson' },
        { date: '2023-03-22', treatment: 'Blood Sugar Monitoring', doctor: 'Dr. Michael Chen' },
        { date: '2023-06-10', treatment: 'Blood Pressure Check', doctor: 'Dr. Emily Rodriguez' }
      ],
      hospital: 'Capitol Hospital'
    };

    setScannedUser(mockScannedUser);
    setShowQRCode(false);
    setShowScanResult(true);
  };

  // 4. Return JSX (unchanged, but now uses defined state and functions)
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <div className="relative">
              {/* Medical Cross Icon */}
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  {/* Horizontal line */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hospital Management Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Comprehensive healthcare management system
            </p>
        </div>
        </div>
        </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex space-x-4 bg-white rounded-xl p-2 shadow-lg">
          <button
            onClick={() => {
              setActiveView('hospitals');
              setSelectedHospital(null); // Clear selected hospital on tab change
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'hospitals' || activeView === 'hospital-details'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            Hospitals
          </button>
          <button
            onClick={() => setActiveView('patient-search')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'patient-search'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            Patient Search
          </button>
          <button
            onClick={() => setActiveView('user-management')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'user-management'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            User Management
          </button>
      </div>
        </div>

      {/* Hospital Cards View */}
      {activeView === 'hospitals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hospitals.map((hospital, index) => (
            <div
              key={hospital.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => handleHospitalSelect(hospital)}
            >
              {/* Hospital Image */}
              <div className="h-40 bg-gradient-to-br from-emerald-400 to-cyan-400 relative overflow-hidden">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    // The next sibling logic relies on the structure below the img tag
                    const fallbackDiv = e.target.parentElement.querySelector('.fallback-icon');
                    if (fallbackDiv) {
                      fallbackDiv.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback Icon - Professional Medical Cross */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center fallback-icon" 
                  style={{ display: 'none' }}
                >
                  <div className="relative">
                    {/* Medical Cross Icon */}
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <div className="relative">
                        {/* Vertical line */}
                        <div className="w-1 h-8 bg-white rounded-full"></div>
                        {/* Horizontal line */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
                  <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">{hospital.rating}</span>
                </div>

                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Hospital Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{hospital.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPinIcon className="w-5 h-5 mr-2 text-emerald-500" />
                  <span>{hospital.location}</span>
        </div>

                {/* Bed Availability */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Bed Availability</span>
                    <span className="text-sm font-semibold text-emerald-600">
                      {hospital.availableBeds}/{hospital.totalBeds}
          </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(hospital.availableBeds / hospital.totalBeds) * 100}%` }}
                    ></div>
            </div>
        </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{hospital.specialties.length - 3} more
                      </span>
          )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>{hospital.phone}</span>
        </div>
                  <div className="flex items-center">
                    <ShieldCheckIcon className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>{hospital.accreditation}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hospital Details View */}
      {activeView === 'hospital-details' && selectedHospital && (
        <div>
          {/* Back Button */}
          <button
            onClick={() => setActiveView('hospitals')}
            className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center"
          >
            ← Back to Hospitals
          </button>

          {/* Hospital Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between">
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedHospital.name}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPinIcon className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="text-lg">{selectedHospital.location}</span>
                </div>
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span className="text-lg font-semibold">{selectedHospital.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-5 h-5 mr-1" />
                    <span>Est. {selectedHospital.established}</span>
                  </div>
                </div>
                <div className="flex items-center text-emerald-600">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{selectedHospital.accreditation}</span>
                                </div>
                              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  {selectedHospital.availableBeds}/{selectedHospital.totalBeds}
                </div>
                <div className="text-sm text-gray-600 mb-4">Available Beds</div>
                <button
                  onClick={() => setShowBedDetails(true)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  View Beds
                </button>
                      </div>
                    </div>
        </div>

          {/* Doctors Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <UserGroupIcon className="w-6 h-6 mr-3 text-emerald-500" />
              Medical Staff
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctorsData[selectedHospital.id]?.map((doctor) => (
                <div
                  key={doctor.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{doctor.name}</h4>
                      <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doctor.available 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {doctor.available ? 'Available' : 'Busy'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{doctor.experience}</span>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span>{doctor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Patient Button */}
          <div className="text-center">
            <button
              onClick={() => setShowUserForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <div className="w-6 h-6 mr-2 flex items-center justify-center">
                <div className="relative">
                  {/* Medical Plus Icon */}
                  <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="w-0.5 h-3 bg-white rounded-full"></div>
                      {/* Horizontal line */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              Add New Patient
            </button>
          </div>
        </div>
      )}

      {/* Patient Search View */}
      {activeView === 'patient-search' && (
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <div className="relative">
                  <div className="w-5 h-5 bg-white/30 rounded flex items-center justify-center">
                    <div className="relative">
                      <div className="w-0.5 h-3 bg-white rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              Search Patient Medical History
            </h3>
            <div className="text-right">
              <div className="text-sm text-gray-500">Quick Patient Lookup</div>
              <div className="text-xs text-gray-400">Enter Patient ID to retrieve records</div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Patient ID</label>
                  <div className="relative">
              <input
                type="text"
                      placeholder="Enter Patient ID (e.g., PAT-1234567890)"
                      className="w-full px-6 py-4 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm pr-32"
                    />
            <button
                      onClick={handleQRScan} 
                      className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                  Search
            </button>
                  </div>
          </div>

                <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl p-6 border border-emerald-200/50">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Search Instructions</h4>
                      <p className="text-sm text-gray-600">
                        Enter a valid Patient ID to retrieve their complete medical history, including previous treatments, medications, and all medical records.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Medical Records</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Prescriptions</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Test Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          )}

      {/* User Management View */}
      {activeView === 'user-management' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">User Management</h3>
          <div className="text-center">
                    <button
              onClick={() => {
                setSelectedHospital(null); // Ensure no hospital is pre-selected
                setShowUserForm(true);
              }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <div className="w-6 h-6 mr-2 flex items-center justify-center">
                <div className="relative">
                  {/* Medical Plus Icon */}
                  <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="w-0.5 h-3 bg-white rounded-full"></div>
                      {/* Horizontal line */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full"></div>
                  </div>
                </div>
                </div>
              </div>
              Create New Patient Profile
            </button>
          </div>
        </div>
      )}

      {/* User Form Modal */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-slideInFromBottom">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <div className="relative">
                    <div className="w-5 h-5 bg-white/30 rounded flex items-center justify-center">
                      <div className="relative">
                        <div className="w-0.5 h-3 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                Create New Patient Profile
            </h3>
              <div className="text-right">
                <div className="text-sm text-gray-500">Complete Medical Registration</div>
                <div className="text-xs text-gray-400">All fields are required</div>
              </div>
            </div>
            <form onSubmit={handleUserSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={userForm.name}
                      onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter patient's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      required
                      value={userForm.age}
                      onChange={(e) => setUserForm({...userForm, age: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter age"
                      min="0"
                      max="120"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select
                      required
                      value={userForm.gender}
                      onChange={(e) => setUserForm({...userForm, gender: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
                    <select
                      required
                      value={userForm.bloodGroup}
                      onChange={(e) => setUserForm({...userForm, bloodGroup: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={userForm.phone}
                      onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={userForm.email}
                      onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="patient@email.com"
                    />
                  </div>
                </div>
              </div>
              
              {/* Contact Information Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
                  Contact Information
                </h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <textarea
                      required
                      value={userForm.address}
                      onChange={(e) => setUserForm({...userForm, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      rows="3"
                      placeholder="Enter complete address"
                    />
                </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
                    <input
                      type="tel"
                      required
                      value={userForm.emergencyContact}
                      onChange={(e) => setUserForm({...userForm, emergencyContact: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                                </div>
              
              {/* Medical Information Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                  Medical Information
                </h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Diseases/Conditions</label>
                    <textarea
                      value={userForm.diseases}
                      onChange={(e) => setUserForm({...userForm, diseases: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      rows="3"
                      placeholder="e.g., Diabetes, Hypertension, Asthma"
                    />
                              </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Medications</label>
                    <textarea
                      value={userForm.medications}
                      onChange={(e) => setUserForm({...userForm, medications: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      rows="3"
                      placeholder="e.g., Metformin 500mg, Lisinopril 10mg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Allergies</label>
                    <textarea
                      value={userForm.allergies}
                      onChange={(e) => setUserForm({...userForm, allergies: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      rows="3"
                      placeholder="e.g., Penicillin, Shellfish, Latex"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Medical History</label>
                    <textarea
                      value={userForm.medicalHistory}
                      onChange={(e) => setUserForm({...userForm, medicalHistory: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      rows="4"
                      placeholder="Previous surgeries, treatments, family history, etc."
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-6 pt-8 border-t border-gray-200/50">
                <button
                  type="button"
                  onClick={() => setShowUserForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300/50 text-gray-700 font-semibold rounded-xl hover:bg-gray-50/80 hover:border-gray-400/50 transition-all duration-300 backdrop-blur-sm"
                >
                  Cancel
                    </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <div className="w-5 h-5 mr-2 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                        <div className="relative">
                          <div className="w-0.5 h-3 bg-white rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  Create Patient Profile
                </button>
              </div>
            </form>
                      </div>
                    </div>
                  )}

      {/* QR Code Modal */}
      {showQRCode && generatedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full mx-4 text-center shadow-2xl border border-white/20 animate-slideInFromBottom">
            <div className="flex items-center justify-center mb-8 pb-6 border-b border-gray-200/50">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <div className="relative">
                    <div className="w-5 h-5 bg-white/30 rounded flex items-center justify-center">
                      <div className="relative">
                        <div className="w-0.5 h-3 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                Patient Profile Created!
              </h3>
        </div>

            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8 mb-8 border border-emerald-200/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-emerald-600 mb-3">{generatedUser.id}</div>
              <div className="text-xl font-semibold text-gray-800 mb-2">{generatedUser.name}</div>
              <div className="text-gray-600 mb-4">{generatedUser.age} years • {generatedUser.gender}</div>
              <div className="text-sm text-gray-500">Patient ID Generated Successfully</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200/50">
              <img
                src={generatedUser.qrCode}
                alt="Patient QR Code"
                className="w-48 h-48 mx-auto border-4 border-emerald-200/50 rounded-xl shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-4 mb-2 font-medium">
                Scan this QR code to retrieve patient information
              </p>
              <p className="text-xs text-gray-500">
                QR code contains complete medical profile
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleQRScan}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Simulate QR Scan
              </button>
              <button
                onClick={() => setShowQRCode(false)}
                className="w-full px-6 py-3 border-2 border-gray-300/50 text-gray-700 font-semibold rounded-xl hover:bg-gray-50/80 hover:border-gray-400/50 transition-all duration-300 backdrop-blur-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scan Result Modal */}
      {showScanResult && scannedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-slideInFromBottom">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <EyeIcon className="w-5 h-5 text-white" />
                </div>
                Patient Information Retrieved
            </h3>
              <div className="text-right">
                <div className="text-sm text-gray-500">QR Code Scan Successful</div>
                <div className="text-xs text-gray-400">Complete medical profile loaded</div>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Basic Information</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Full Name</div>
                    <div className="text-lg font-bold text-gray-800">{scannedUser.name}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Age & Gender</div>
                    <div className="text-lg font-bold text-gray-800">{scannedUser.age} years • {scannedUser.gender}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Blood Group</div>
                    <div className="text-lg font-bold text-gray-800">{scannedUser.bloodGroup}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Phone Number</div>
                    <div className="text-lg font-bold text-gray-800">{scannedUser.phone}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 md:col-span-2">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Email Address</div>
                    <div className="text-lg font-bold text-gray-800">{scannedUser.email}</div>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <HeartIcon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Medical Information</h4>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Current Diseases/Conditions</div>
                    <div className="text-gray-800 leading-relaxed">{scannedUser.diseases}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Current Medications</div>
                    <div className="text-gray-800 leading-relaxed">{scannedUser.medications}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Allergies</div>
                    <div className="text-gray-800 leading-relaxed">{scannedUser.allergies}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Medical History</div>
                    <div className="text-gray-800 leading-relaxed">{scannedUser.medicalHistory}</div>
                  </div>
                </div>
              </div>

              {/* Previous Treatments */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Previous Treatments</h4>
                </div>
            <div className="space-y-4">
                  {scannedUser.previousTreatments?.map((treatment, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                    <div>
                          <h5 className="text-lg font-semibold text-gray-800">{treatment.treatment}</h5>
                          <p className="text-sm text-gray-600">Doctor: {treatment.doctor}</p>
                    </div>
                    <div className="text-right">
                          <div className="text-sm font-semibold text-gray-700">{treatment.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

              {/* Emergency Contact */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mr-3">
                    <PhoneIcon className="w-4 h-4 text-white" />
                    </div>
                  <h4 className="text-xl font-bold text-gray-800">Emergency Contact</h4>
                  </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                  <div className="text-sm font-semibold text-gray-600 mb-2">Emergency Contact Number</div>
                  <div className="text-xl font-bold text-gray-800">{scannedUser.emergencyContact}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-8 border-t border-gray-200/50">
                    <button
                onClick={() => setShowScanResult(false)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
                    </button>
                      </div>
                </div>
        </div>
      )}

      {/* Bed Details Modal */}
      {showBedDetails && selectedHospital && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-slideInFromBottom">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <div className="relative">
                    <div className="w-5 h-5 bg-white/30 rounded flex items-center justify-center">
                      <div className="relative">
                        <div className="w-0.5 h-3 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                Bed Availability
              </h3>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-700">{selectedHospital.name}</div>
                <div className="text-sm text-gray-500">{selectedHospital.location}</div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-emerald-700 mb-1">{selectedHospital.availableBeds}</div>
                  <div className="text-sm font-medium text-emerald-600">Available Beds</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-red-700 mb-1">{selectedHospital.totalBeds - selectedHospital.availableBeds}</div>
                  <div className="text-sm font-medium text-red-600">Occupied Beds</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">{selectedHospital.totalBeds}</div>
                  <div className="text-sm font-medium text-blue-600">Total Beds</div>
                </div>
              </div>

              {/* Bed Details Table */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Bed Details by Floor</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200/50">
                        <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Floor</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Room</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Bed</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Type</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bedData[selectedHospital.id]?.map((bed, index) => (
                        <tr key={index} className="hover:bg-gray-50/80 transition-colors duration-200">
                          <td className="py-4 px-6 text-gray-800 font-medium">{bed.floor}</td>
                          <td className="py-4 px-6 text-gray-800 font-semibold">{bed.room}</td>
                          <td className="py-4 px-6 text-gray-800 font-medium">{bed.bedNumber}</td>
                          <td className="py-4 px-6 text-gray-800">{bed.type}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                              bed.status === 'Available' 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                bed.status === 'Available' ? 'bg-emerald-500' : 'bg-red-500'
                              }`}></div>
                              {bed.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
            </div>
          </div>
        </div>
            
            <div className="flex justify-end pt-8 border-t border-gray-200/50">
              <button
                onClick={() => setShowBedDetails(false)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
          </button>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}