import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function ClaimManagement() {
  const [activeTab, setActiveTab] = useState('all-claims');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showClaimDetails, setShowClaimDetails] = useState(false);

  // Sample claims data
  const claimsData = [
    {
      id: 'CLM-001',
      patientId: 'PAT-1234567890',
      patientName: 'Rajesh Kumar',
      policyNumber: 'POL-2024-001',
      insuranceCompany: 'Bajaj Allianz',
      claimAmount: 45000,
      approvedAmount: 42000,
      submittedDate: '2024-01-15',
      processedDate: '2024-01-18',
      status: 'Approved',
      claimType: 'Hospitalization',
      diagnosis: 'Cardiac Surgery',
      hospital: 'Community Health Center',
      documents: ['Medical Report', 'Bill Summary', 'Discharge Summary'],
      remarks: 'Claim processed successfully'
    },
    {
      id: 'CLM-002',
      patientId: 'PAT-1234567891',
      patientName: 'Priya Sharma',
      policyNumber: 'POL-2024-002',
      insuranceCompany: 'ICICI Lombard',
      claimAmount: 25000,
      approvedAmount: 0,
      submittedDate: '2024-01-16',
      processedDate: null,
      status: 'Pending',
      claimType: 'OPD Treatment',
      diagnosis: 'Diabetes Management',
      hospital: 'Sacred Heart Hospital',
      documents: ['Prescription', 'Lab Reports'],
      remarks: 'Under review'
    },
    {
      id: 'CLM-003',
      patientId: 'PAT-1234567892',
      patientName: 'Amit Singh',
      policyNumber: 'POL-2024-003',
      insuranceCompany: 'HDFC ERGO',
      claimAmount: 18000,
      approvedAmount: 0,
      submittedDate: '2024-01-17',
      processedDate: '2024-01-20',
      status: 'Rejected',
      claimType: 'Emergency Treatment',
      diagnosis: 'Appendicitis',
      hospital: 'Kamal Multispeciality Hospital',
      documents: ['Emergency Report', 'Surgery Report'],
      remarks: 'Pre-existing condition not covered'
    },
    {
      id: 'CLM-004',
      patientId: 'PAT-1234567893',
      patientName: 'Sunita Devi',
      policyNumber: 'POL-2024-004',
      insuranceCompany: 'Star Health',
      claimAmount: 75000,
      approvedAmount: 70000,
      submittedDate: '2024-01-18',
      processedDate: '2024-01-22',
      status: 'Approved',
      claimType: 'Critical Illness',
      diagnosis: 'Heart Attack',
      hospital: 'Carebest Superspeciality Hospital',
      documents: ['Cardiology Report', 'Angiography Report', 'Treatment Summary'],
      remarks: 'Approved with minor deductions'
    },
    {
      id: 'CLM-005',
      patientId: 'PAT-1234567894',
      patientName: 'Vikram Patel',
      policyNumber: 'POL-2024-005',
      insuranceCompany: 'New India Assurance',
      claimAmount: 32000,
      approvedAmount: 0,
      submittedDate: '2024-01-19',
      processedDate: null,
      status: 'Under Review',
      claimType: 'Surgery',
      diagnosis: 'Fracture Treatment',
      hospital: 'Metro General Hospital',
      documents: ['X-Ray Report', 'Surgery Report', 'Physiotherapy Report'],
      remarks: 'Additional documents required'
    },
    {
      id: 'CLM-006',
      patientId: 'PAT-1234567895',
      patientName: 'Anjali Gupta',
      policyNumber: 'POL-2024-006',
      insuranceCompany: 'Oriental Insurance',
      claimAmount: 15000,
      approvedAmount: 15000,
      submittedDate: '2024-01-20',
      processedDate: '2024-01-23',
      status: 'Approved',
      claimType: 'Maternity',
      diagnosis: 'Normal Delivery',
      hospital: 'Sunrise Medical Center',
      documents: ['Delivery Report', 'Baby Records', 'Discharge Summary'],
      remarks: 'Full amount approved'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'Pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'Rejected':
        return <XCircleIcon className="w-4 h-4" />;
      case 'Under Review':
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      default:
        return <DocumentTextIcon className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
    setShowClaimDetails(true);
  };

  const filteredClaims = claimsData.filter(claim => {
    if (activeTab === 'all-claims') return true;
    return claim.status.toLowerCase().replace(' ', '-') === activeTab;
  });

  const TabButton = ({ id, label, icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 text-sm mobile-touch-target ${
        activeTab === id
          ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg'
          : 'text-teal-600 hover:bg-teal-50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
      <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
        {count}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <DocumentTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
              Claim Management System
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Insurance Claims Processing & Management
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mobile-stats mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-teal-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-700 mb-1 sm:mb-2">{claimsData.length}</div>
          <div className="text-xs sm:text-sm font-medium text-teal-600">Total Claims</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-green-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-1 sm:mb-2">{claimsData.filter(c => c.status === 'Approved').length}</div>
          <div className="text-xs sm:text-sm font-medium text-green-600">Approved</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-yellow-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700 mb-1 sm:mb-2">{claimsData.filter(c => c.status === 'Pending' || c.status === 'Under Review').length}</div>
          <div className="text-xs sm:text-sm font-medium text-yellow-600">Pending</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-red-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700 mb-1 sm:mb-2">{claimsData.filter(c => c.status === 'Rejected').length}</div>
          <div className="text-xs sm:text-sm font-medium text-red-600">Rejected</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-teal-200/50 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mobile-nav">
          <TabButton id="all-claims" label="All Claims" icon="📄" count={claimsData.length} />
          <TabButton id="approved" label="Approved" icon="✅" count={claimsData.filter(c => c.status === 'Approved').length} />
          <TabButton id="pending" label="Pending" icon="⏳" count={claimsData.filter(c => c.status === 'Pending').length} />
          <TabButton id="under-review" label="Under Review" icon="🔍" count={claimsData.filter(c => c.status === 'Under Review').length} />
          <TabButton id="rejected" label="Rejected" icon="❌" count={claimsData.filter(c => c.status === 'Rejected').length} />
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-8 shadow-lg border border-teal-200/50">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Claims Management
        </h3>

        <div className="overflow-x-auto mobile-table">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-teal-200">
                <th className="text-left py-4 px-6 font-bold text-gray-700">Claim ID</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Patient</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Insurance Company</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Claim Amount</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Submitted Date</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono text-gray-800">{claim.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-800">{claim.patientName}</div>
                      <div className="text-sm text-gray-600">{claim.patientId}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800">{claim.insuranceCompany}</td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-800">₹{claim.claimAmount.toLocaleString()}</div>
                      {claim.approvedAmount > 0 && (
                        <div className="text-sm text-green-600">Approved: ₹{claim.approvedAmount.toLocaleString()}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(claim.status)}`}>
                      {getStatusIcon(claim.status)}
                      <span className="ml-1">{claim.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-800">{claim.submittedDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(claim)}
                        className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors duration-200 mobile-touch-target"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 mobile-touch-target"
                        title="Edit Claim"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 mobile-touch-target"
                        title="Delete Claim"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Details Modal */}
      {showClaimDetails && selectedClaim && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-slideInFromBottom">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
                <DocumentTextIcon className="w-8 h-8 mr-3 text-teal-600" />
                Claim Details - {selectedClaim.id}
              </h3>
              <button
                onClick={() => setShowClaimDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Patient Name</label>
                    <p className="text-lg font-bold text-gray-800">{selectedClaim.patientName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Patient ID</label>
                    <p className="text-lg font-bold text-gray-800">{selectedClaim.patientId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Policy Number</label>
                    <p className="text-lg font-bold text-gray-800">{selectedClaim.policyNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Insurance Company</label>
                    <p className="text-lg font-bold text-gray-800">{selectedClaim.insuranceCompany}</p>
                  </div>
                </div>
              </div>

              {/* Claim Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Claim Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Claim Type</label>
                    <p className="text-lg font-bold text-gray-800">{selectedClaim.claimType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Diagnosis</label>
                    <p className="text-lg font-bold text-gray-800">{selectedClaim.diagnosis}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Hospital</label>
                    <p className="text-lg font-bold text-gray-800">{selectedClaim.hospital}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedClaim.status)}`}>
                      {getStatusIcon(selectedClaim.status)}
                      <span className="ml-1">{selectedClaim.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Financial Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Claim Amount</label>
                    <p className="text-2xl font-bold text-gray-800">₹{selectedClaim.claimAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Approved Amount</label>
                    <p className="text-2xl font-bold text-green-600">₹{selectedClaim.approvedAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Deduction</label>
                    <p className="text-2xl font-bold text-red-600">₹{(selectedClaim.claimAmount - selectedClaim.approvedAmount).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedClaim.documents.map((doc, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <DocumentTextIcon className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-gray-800">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Remarks</h4>
                <p className="text-gray-800">{selectedClaim.remarks}</p>
              </div>
            </div>

            <div className="flex justify-end pt-8 border-t border-gray-200/50">
              <button
                onClick={() => setShowClaimDetails(false)}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <XCircleIcon className="w-5 h-5 mr-2" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
