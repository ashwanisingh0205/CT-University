import React, { useState, useEffect } from 'react';

const BedBooking = () => {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBed, setSelectedBed] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [estimatedStay, setEstimatedStay] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Mock patient data
  const mockPatients = {
    'P001': { name: 'Hansraj', age: 35, gender: 'Female', phone: '+1-555-0123' },
    'P002': { name: 'Ankit Kalia', age: 42, gender: 'Male', phone: '+1-555-0456' },
    'P003': { name: 'Ayush ananad', age: 28, gender: 'Female', phone: '+1-555-0789' }
  };

  // Mock room and bed data
  const rooms = [
    { id: 'R101', type: 'General Ward', beds: ['B1', 'B2', 'B3', 'B4'], available: 2, price: 150 },
    { id: 'R102', type: 'General Ward', beds: ['B1', 'B2', 'B3', 'B4'], available: 1, price: 150 },
    { id: 'R201', type: 'Private Room', beds: ['B1'], available: 1, price: 300 },
    { id: 'R202', type: 'Private Room', beds: ['B1'], available: 0, price: 300 },
    { id: 'R301', type: 'ICU', beds: ['B1'], available: 1, price: 500 },
    { id: 'R302', type: 'ICU', beds: ['B1'], available: 0, price: 500 },
    { id: 'R401', type: 'Emergency Ward', beds: ['B1', 'B2'], available: 1, price: 200 }
  ];

  const stayOptions = ['1-2 days', '3-5 days', '1 week', '2 weeks', '1 month', 'Long term'];

  useEffect(() => {
    if (patientId && mockPatients[patientId]) {
      setPatientData(mockPatients[patientId]);
    } else {
      setPatientData(null);
    }
  }, [patientId]);

  const handlePatientSearch = () => {
    if (patientId && mockPatients[patientId]) {
      setPatientData(mockPatients[patientId]);
    } else {
      setPatientData(null);
    }
  };

  const handleBooking = async () => {
    console.log('Booking attempt:', { patientId, selectedRoom, selectedBed, bookingDate, patientData });
    
    if (!patientId || !selectedRoom || !selectedBed || !bookingDate) {
      alert(`Please fill in all required fields:\n- Patient ID: ${patientId ? '✓' : '✗'}\n- Room: ${selectedRoom ? '✓' : '✗'}\n- Bed: ${selectedBed ? '✓' : '✗'}\n- Date: ${bookingDate ? '✓' : '✗'}`);
      return;
    }

    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      const bookingId = `BK${Date.now().toString().slice(-6)}`;
      const room = rooms.find(r => r.id === selectedRoom);
      
      setBookingDetails({
        bookingId,
        patientId,
        patientName: patientData.name,
        roomId: selectedRoom,
        bedId: selectedBed,
        roomType: room.type,
        bookingDate,
        estimatedStay,
        specialRequirements,
        price: room.price
      });
      
      setShowSuccess(true);
      setIsBooking(false);
      console.log('Booking successful!');
    }, 2000);
  };

  const getAvailableBeds = () => {
    if (!selectedRoom) return [];
    const room = rooms.find(r => r.id === selectedRoom);
    return room ? room.beds : [];
  };

  const getRoomStatusColor = (available) => {
    if (available === 0) return 'bg-red-100 text-red-700 border-red-200';
    if (available === 1) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getRoomStatusText = (available) => {
    if (available === 0) return 'Fully Occupied';
    if (available === 1) return 'Limited Availability';
    return 'Available';
  };

  if (showSuccess && bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-emerald-200/50 text-center max-w-2xl mx-4 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-heartbeat">
            <span className="text-4xl">🛏️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bed Booking Confirmed!</h2>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6 text-left">
            <h3 className="text-lg font-bold text-emerald-700 mb-4">Booking Details:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono font-bold text-emerald-700">{bookingDetails.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-semibold">{bookingDetails.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-semibold">{bookingDetails.roomId} ({bookingDetails.roomType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bed:</span>
                <span className="font-semibold">{bookingDetails.bedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in Date:</span>
                <span className="font-semibold">{bookingDetails.bookingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Stay:</span>
                <span className="font-semibold">{bookingDetails.estimatedStay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Rate:</span>
                <span className="font-semibold">${bookingDetails.price}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105"
            >
              New Booking
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
            >
              Print Confirmation
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
            Hospital Bed Booking
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Book hospital beds using patient ID for seamless admission</p>
      </div>

      {/* Patient Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg">
            👤
          </span>
          Patient Verification
        </h3>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value.toUpperCase())}
                placeholder="Enter Patient ID (e.g., P001, P002, P003)"
                className="w-full px-6 py-4 text-lg border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handlePatientSearch()}
              />
            </div>
            <button
              onClick={handlePatientSearch}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>🔍</span>
              Verify
            </button>
          </div>

          {patientData && (
            <div className="mt-6 p-6 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h4 className="text-lg font-bold text-emerald-700 mb-3">Patient Verified ✅</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-emerald-600 font-semibold">Name:</span>
                  <p className="text-gray-900">{patientData.name}</p>
                </div>
                <div>
                  <span className="text-emerald-600 font-semibold">Age & Gender:</span>
                  <p className="text-gray-900">{patientData.age} years, {patientData.gender}</p>
                </div>
                <div>
                  <span className="text-emerald-600 font-semibold">Phone:</span>
                  <p className="text-gray-900">{patientData.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Room Selection */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg">
            🏥
          </span>
          Available Rooms & Beds
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                selectedRoom === room.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300'
              } ${room.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => room.available > 0 && setSelectedRoom(room.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{room.id}</h4>
                  <p className="text-emerald-600 font-semibold">{room.type}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoomStatusColor(room.available)}`}>
                  {getRoomStatusText(room.available)}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available Beds:</span>
                  <span className="font-semibold">{room.available}/{room.beds.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Daily Rate:</span>
                  <span className="font-semibold text-emerald-600">${room.price}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {room.beds.map((bed) => (
                  <span
                    key={bed}
                    className={`px-2 py-1 text-xs rounded ${
                      room.available === 0
                        ? 'bg-red-100 text-red-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    {bed}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Details */}
      {selectedRoom && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50 animate-fadeIn">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
              📋
            </span>
            Booking Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-emerald-600 font-semibold">Select Bed</label>
              <select
                value={selectedBed}
                onChange={(e) => setSelectedBed(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Choose a bed</option>
                {getAvailableBeds().map((bed) => (
                  <option key={bed} value={bed}>{bed}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-emerald-600 font-semibold">Check-in Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-emerald-600 font-semibold">Estimated Stay</label>
              <select
                value={estimatedStay}
                onChange={(e) => setEstimatedStay(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select duration</option>
                {stayOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-emerald-600 font-semibold">Special Requirements</label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="Any special medical requirements"
                className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center pt-8">
            <button
              onClick={handleBooking}
              disabled={isBooking || !patientId || !selectedRoom || !selectedBed || !bookingDate}
              className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {isBooking ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Booking Bed...
                </>
              ) : (
                <>
                  <span className="text-2xl">🛏️</span>
                  Confirm Bed Booking
                </>
              )}
            </button>
            
            {/* Missing Fields Indicator */}
            {(!patientId || !selectedRoom || !selectedBed || !bookingDate) && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700 font-medium">Complete these steps to enable booking:</p>
                <ul className="text-xs text-orange-600 mt-1 space-y-1">
                  {!patientId && <li>• Verify patient ID</li>}
                  {!selectedRoom && <li>• Select a room</li>}
                  {!selectedBed && <li>• Choose a bed</li>}
                  {!bookingDate && <li>• Select check-in date</li>}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏥</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Total Rooms</h3>
          <p className="text-3xl font-bold text-emerald-600">{rooms.length}</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛏️</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Available Beds</h3>
          <p className="text-3xl font-bold text-cyan-600">{rooms.reduce((sum, room) => sum + room.available, 0)}</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-purple-600">78%</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚨</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Emergency Beds</h3>
          <p className="text-3xl font-bold text-red-600">2</p>
        </div>
      </div>
    </div>
  );
};

export default BedBooking;
