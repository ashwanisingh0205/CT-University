import React, { useState, useCallback } from 'react';

const InputField = ({ label, name, type = 'text', required = false, options = null, placeholder = '', value, onChange }) => (
  <div className="space-y-2">
    <label className="text-emerald-600 font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {options ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
      />
    )}
  </div>
);

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    insuranceProvider: '',
    insuranceNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  
  // Indian insurance providers
  const insuranceProviders = [
    'Star Health Insurance',
    'HDFC ERGO General Insurance',
    'ICICI Lombard General Insurance',
    'Bajaj Allianz General Insurance',
    'New India Assurance',
    'Oriental Insurance Company',
    'United India Insurance',
    'National Insurance Company',
    'Reliance General Insurance',
    'Future Generali India Insurance',
    'Tata AIG General Insurance',
    'Cholamandalam MS General Insurance',
    'Royal Sundaram General Insurance',
    'SBI General Insurance',
    'Liberty General Insurance'
  ];

  // Indian States and Union Territories
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
    'Lakshadweep', 'Puducherry'
  ];

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const generatePatientId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `P${timestamp}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newPatientId = generatePatientId();
      setGeneratedId(newPatientId);
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          phone: '',
          email: '',
          address: '',
          state: '',
          city: '',
          pincode: '',
          emergencyContact: '',
          emergencyPhone: '',
          bloodType: '',
          allergies: '',
          medicalConditions: '',
          insuranceProvider: '',
          insuranceNumber: ''
        });
        setShowSuccess(false);
        setGeneratedId('');
      }, 5000);
    }, 2000);
  };


  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-emerald-200/50 text-center max-w-2xl mx-4 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-heartbeat">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Registered Successfully!</h2>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
            <p className="text-emerald-600 font-semibold mb-2">Patient ID Generated:</p>
            <p className="text-3xl font-mono font-bold text-emerald-700 bg-white px-4 py-2 rounded-lg inline-block">
              {generatedId}
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            This ID can now be used for bed booking, medical reports, and all hospital services. 
            Registration completed at {new Date().toLocaleString('en-IN', { 
              timeZone: 'Asia/Kolkata',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })} IST.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105"
            >
              Register Another Patient
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
            >
              Print ID Card
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
            Patient Registration
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Register new patients and generate unique patient IDs</p>
      </div>

      {/* Registration Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg">
                👤
              </span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                name="firstName"
                required
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                required
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              <InputField
                label="Gender"
                name="gender"
                required
                options={genders}
                value={formData.gender}
                onChange={handleInputChange}
              />
              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                required
                placeholder="+91-98765-43210"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="patient@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-6">
              <InputField
                label="Address"
                name="address"
                placeholder="House No., Street, Area"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="City"
                name="city"
                required
                placeholder="Enter city name"
                value={formData.city}
                onChange={handleInputChange}
              />
              <InputField
                label="State"
                name="state"
                required
                options={indianStates}
                value={formData.state}
                onChange={handleInputChange}
              />
              <InputField
                label="Pincode"
                name="pincode"
                type="number"
                required
                placeholder="110001"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                🚨
              </span>
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Emergency Contact Name"
                name="emergencyContact"
                required
                placeholder="Emergency contact person"
                value={formData.emergencyContact}
                onChange={handleInputChange}
              />
              <InputField
                label="Emergency Contact Phone"
                name="emergencyPhone"
                type="tel"
                required
                placeholder="+91-98765-43210"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                🏥
              </span>
              Medical Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Blood Type"
                name="bloodType"
                options={bloodTypes}
                value={formData.bloodType}
                onChange={handleInputChange}
              />
              <InputField
                label="Insurance Provider"
                name="insuranceProvider"
                options={insuranceProviders}
                placeholder="Select insurance provider"
                value={formData.insuranceProvider}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Allergies"
                name="allergies"
                placeholder="List any known allergies"
                value={formData.allergies}
                onChange={handleInputChange}
              />
              <InputField
                label="Medical Conditions"
                name="medicalConditions"
                placeholder="List any existing medical conditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-6">
              <InputField
                label="Insurance Number"
                name="insuranceNumber"
                placeholder="Policy Number (e.g., POL123456789)"
                value={formData.insuranceNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Registering Patient...
                </>
              ) : (
                <>
                  <span className="text-2xl">👤</span>
                  Register Patient & Generate ID
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🆔</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Unique Patient ID</h3>
          <p className="text-gray-600 text-sm">Each patient gets a unique identifier for all hospital services</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛏️</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Bed Booking Ready</h3>
          <p className="text-gray-600 text-sm">Use the generated ID to book hospital beds and rooms</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Medical Records</h3>
          <p className="text-gray-600 text-sm">All medical reports and history will be linked to this ID</p>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;
