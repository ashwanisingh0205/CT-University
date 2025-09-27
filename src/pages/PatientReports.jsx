import React, { useState, useRef } from 'react';

const PatientReports = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [searchId, setSearchId] = useState('');
  const [patientReports, setPatientReports] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    patientId: '',
    patientName: '',
    reportType: '',
    doctorName: '',
    reportDate: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    file: null
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Mock patient reports data
  const mockReports = {
    'P001': [
      {
        id: 'R001',
        date: '2024-01-15',
        type: 'Blood Test',
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Hypertension',
        treatment: 'Lisinopril 10mg daily',
        file: 'blood_test_2024_01_15.pdf',
        status: 'Completed'
      },
      {
        id: 'R002',
        date: '2023-11-20',
        type: 'X-Ray Chest',
        doctor: 'Dr. Emily Rodriguez',
        diagnosis: 'Normal chest X-ray',
        treatment: 'No treatment required',
        file: 'xray_chest_2023_11_20.pdf',
        status: 'Completed'
      },
      {
        id: 'R003',
        date: '2024-01-10',
        type: 'MRI Brain',
        doctor: 'Dr. Sarah Johnson',
        diagnosis: 'Migraine',
        treatment: 'Pain management',
        file: 'mri_brain_2024_01_10.pdf',
        status: 'Completed'
      }
    ],
    'P002': [
      {
        id: 'R004',
        date: '2024-02-10',
        type: 'X-Ray Arm',
        doctor: 'Dr. Lisa Wang',
        diagnosis: 'Fractured Arm',
        treatment: 'Cast application, pain management',
        file: 'xray_arm_2024_02_10.pdf',
        status: 'Completed'
      }
    ]
  };

  const reportTypes = [
    'Blood Test', 'X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'ECG', 
    'Biopsy', 'Pathology Report', 'Surgery Report', 'Discharge Summary',
    'Consultation Report', 'Lab Results', 'Other'
  ];

  const handlePatientSearch = async () => {
    if (!searchId.trim()) {
      setSearchError('Please enter a patient ID');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    
    // Simulate API call
    setTimeout(() => {
      const reports = mockReports[searchId.toUpperCase()];
      if (reports) {
        setPatientReports(reports);
        setSearchError('');
      } else {
        setPatientReports(null);
        setSearchError('No reports found for this patient ID.');
      }
      setIsSearching(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadForm(prev => ({ ...prev, file }));
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.patientId || !uploadForm.file || !uploadForm.reportType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setShowUploadSuccess(true);
      setIsUploading(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setUploadForm({
          patientId: '',
          patientName: '',
          reportType: '',
          doctorName: '',
          reportDate: '',
          diagnosis: '',
          treatment: '',
          notes: '',
          file: null
        });
        setShowUploadSuccess(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    }, 2000);
  };

  const downloadReport = (report) => {
    // Simulate PDF download
    alert(`Downloading ${report.file}...`);
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

  if (showUploadSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-emerald-200/50 text-center max-w-2xl mx-4 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-heartbeat">
            <span className="text-4xl">📄</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Report Uploaded Successfully!</h2>
          <p className="text-gray-600 mb-6">
            The medical report has been uploaded and linked to patient {uploadForm.patientId}. 
            The report is now available in the patient's medical history.
          </p>
          <button
            onClick={() => setShowUploadSuccess(false)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105"
          >
            Upload Another Report
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
            Patient Reports Management
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Upload and manage medical reports for patients</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50">
        <div className="flex flex-wrap gap-4 justify-center">
          <TabButton id="upload" label="Upload Report" icon="📤" />
          <TabButton id="search" label="Search Reports" icon="🔍" />
        </div>
      </div>

      {/* Upload Report Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg">
                📤
              </span>
              Upload Medical Report
            </h3>
            
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">
                    Patient ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadForm.patientId}
                    onChange={(e) => setUploadForm({...uploadForm, patientId: e.target.value.toUpperCase()})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Patient Name</label>
                  <input
                    type="text"
                    value={uploadForm.patientName}
                    onChange={(e) => setUploadForm({...uploadForm, patientName: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter patient name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">
                    Report Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.reportType}
                    onChange={(e) => setUploadForm({...uploadForm, reportType: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select report type</option>
                    {reportTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Doctor Name</label>
                  <input
                    type="text"
                    value={uploadForm.doctorName}
                    onChange={(e) => setUploadForm({...uploadForm, doctorName: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Doctor's name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Report Date</label>
                  <input
                    type="date"
                    value={uploadForm.reportDate}
                    onChange={(e) => setUploadForm({...uploadForm, reportDate: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-emerald-600 font-semibold">Diagnosis</label>
                  <input
                    type="text"
                    value={uploadForm.diagnosis}
                    onChange={(e) => setUploadForm({...uploadForm, diagnosis: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Medical diagnosis"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-emerald-600 font-semibold">Treatment</label>
                <input
                  type="text"
                  value={uploadForm.treatment}
                  onChange={(e) => setUploadForm({...uploadForm, treatment: e.target.value})}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Treatment prescribed"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-emerald-600 font-semibold">Additional Notes</label>
                <textarea
                  value={uploadForm.notes}
                  onChange={(e) => setUploadForm({...uploadForm, notes: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Any additional notes or observations"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-emerald-600 font-semibold">
                  Upload PDF Report <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-all duration-300">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    required
                  />
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl text-white">📄</span>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">Click to upload PDF file</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300"
                      >
                        Choose File
                      </button>
                    </div>
                    {uploadForm.file && (
                      <p className="text-emerald-600 font-semibold">
                        Selected: {uploadForm.file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isUploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading Report...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">📤</span>
                      Upload Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Reports Tab */}
      {activeTab === 'search' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Patient Search */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                🔍
              </span>
              Search Patient Reports
            </h3>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                    placeholder="Enter Patient ID (e.g., P001, P002)"
                    className="w-full px-6 py-4 text-lg border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    onKeyPress={(e) => e.key === 'Enter' && handlePatientSearch()}
                  />
                </div>
                <button
                  onClick={handlePatientSearch}
                  disabled={isSearching}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      Search
                    </>
                  )}
                </button>
              </div>

              {searchError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                  {searchError}
                </div>
              )}
            </div>
          </div>

          {/* Patient Reports Display */}
          {patientReports && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                    📋
                  </span>
                  Medical Reports for Patient {searchId}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {patientReports.map((report, index) => (
                    <div key={index} className="border border-emerald-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{report.type}</h4>
                          <p className="text-emerald-600">Dr. {report.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 text-sm">{report.date}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div>
                          <span className="text-emerald-600 font-semibold">Diagnosis:</span>
                          <p className="text-gray-900">{report.diagnosis}</p>
                        </div>
                        <div>
                          <span className="text-emerald-600 font-semibold">Treatment:</span>
                          <p className="text-gray-900">{report.treatment}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-mono text-sm">{report.file}</span>
                        <button
                          onClick={() => downloadReport(report)}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                          <span>📥</span>
                          Download PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Total Reports</h3>
          <p className="text-3xl font-bold text-emerald-600">1,247</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📤</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Uploaded Today</h3>
          <p className="text-3xl font-bold text-cyan-600">23</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Searches Today</h3>
          <p className="text-3xl font-bold text-purple-600">156</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/50 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📥</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Downloads Today</h3>
          <p className="text-3xl font-bold text-red-600">89</p>
        </div>
      </div>
    </div>
  );
};

export default PatientReports;
