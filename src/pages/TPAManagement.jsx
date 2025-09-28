import React, { useState } from 'react';

const TPAManagement = () => {
  const [activeTab, setActiveTab] = useState('sponsors');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample TPA data with Indian sponsors and format
  const tpaData = {
    sponsors: [
      {
        id: 'SPN001',
        name: 'Apollo Munich Health Insurance',
        type: 'Health Insurance',
        contactPerson: 'Rajesh Kumar',
        phone: '+91-98765-43210',
        email: 'rajesh.kumar@apollomunich.com',
        address: '123 MG Road, Mumbai, Maharashtra 400001',
        coverageLimit: '₹5,00,000',
        claimProcessingTime: '7-10 days',
        networkHospitals: '500+',
        status: 'Active',
        contractStartDate: '2023-01-01',
        contractEndDate: '2024-12-31',
        commissionRate: '12%'
      },
      {
        id: 'SPN002',
        name: 'Star Health Insurance',
        type: 'Health Insurance',
        contactPerson: 'Priya Sharma',
        phone: '+91-98765-43211',
        email: 'priya.sharma@starhealth.com',
        address: '456 Park Street, Delhi, Delhi 110001',
        coverageLimit: '₹3,00,000',
        claimProcessingTime: '5-7 days',
        networkHospitals: '300+',
        status: 'Active',
        contractStartDate: '2023-03-15',
        contractEndDate: '2025-03-14',
        commissionRate: '10%'
      },
      {
        id: 'SPN003',
        name: 'HDFC ERGO Health Insurance',
        type: 'Health Insurance',
        contactPerson: 'Amit Singh',
        phone: '+91-98765-43212',
        email: 'amit.singh@hdfcergo.com',
        address: '789 Brigade Road, Bangalore, Karnataka 560001',
        coverageLimit: '₹7,50,000',
        claimProcessingTime: '10-14 days',
        networkHospitals: '800+',
        status: 'Active',
        contractStartDate: '2022-11-20',
        contractEndDate: '2024-11-19',
        commissionRate: '15%'
      },
      {
        id: 'SPN004',
        name: 'ICICI Lombard Health Insurance',
        type: 'Health Insurance',
        contactPerson: 'Sunita Agarwal',
        phone: '+91-98765-43213',
        email: 'sunita.agarwal@icicilombard.com',
        address: '321 Commercial Street, Chennai, Tamil Nadu 600001',
        coverageLimit: '₹4,00,000',
        claimProcessingTime: '6-8 days',
        networkHospitals: '400+',
        status: 'Active',
        contractStartDate: '2023-06-01',
        contractEndDate: '2025-05-31',
        commissionRate: '11%'
      },
      {
        id: 'SPN005',
        name: 'Bajaj Allianz Health Insurance',
        type: 'Health Insurance',
        contactPerson: 'Vikram Patel',
        phone: '+91-98765-43214',
        email: 'vikram.patel@bajajallianz.com',
        address: '654 Residency Road, Ahmedabad, Gujarat 380001',
        coverageLimit: '₹6,00,000',
        claimProcessingTime: '8-12 days',
        networkHospitals: '600+',
        status: 'Active',
        contractStartDate: '2023-02-10',
        contractEndDate: '2025-02-09',
        commissionRate: '13%'
      },
      {
        id: 'SPN006',
        name: 'Reliance General Insurance',
        type: 'Health Insurance',
        contactPerson: 'Anjali Gupta',
        phone: '+91-98765-43215',
        email: 'anjali.gupta@reliancegeneral.com',
        address: '987 Linking Road, Mumbai, Maharashtra 400050',
        coverageLimit: '₹2,50,000',
        claimProcessingTime: '5-7 days',
        networkHospitals: '250+',
        status: 'Active',
        contractStartDate: '2023-08-15',
        contractEndDate: '2025-08-14',
        commissionRate: '9%'
      },
      {
        id: 'SPN007',
        name: 'New India Assurance',
        type: 'Health Insurance',
        contactPerson: 'Suresh Kumar',
        phone: '+91-98765-43216',
        email: 'suresh.kumar@newindia.com',
        address: '147 Sector 17, Chandigarh, Punjab 160017',
        coverageLimit: '₹3,50,000',
        claimProcessingTime: '7-10 days',
        networkHospitals: '350+',
        status: 'Active',
        contractStartDate: '2023-04-20',
        contractEndDate: '2025-04-19',
        commissionRate: '10%'
      },
      {
        id: 'SPN008',
        name: 'Oriental Insurance Company',
        type: 'Health Insurance',
        contactPerson: 'Kavita Joshi',
        phone: '+91-98765-43217',
        email: 'kavita.joshi@oriental.com',
        address: '258 Nehru Place, Delhi, Delhi 110019',
        coverageLimit: '₹4,50,000',
        claimProcessingTime: '6-9 days',
        networkHospitals: '450+',
        status: 'Active',
        contractStartDate: '2023-07-01',
        contractEndDate: '2025-06-30',
        commissionRate: '12%'
      }
    ],
    claims: [
      {
        id: 'CLM001',
        patientId: 'PAT-001',
        patientName: 'Rajesh Kumar',
        sponsorId: 'SPN001',
        sponsorName: 'Apollo Munich Health Insurance',
        claimAmount: '₹45,000',
        approvedAmount: '₹42,000',
        claimDate: '2024-01-15',
        status: 'Approved',
        diagnosis: 'Cardiac Surgery',
        hospitalName: 'Community Health Center'
      },
      {
        id: 'CLM002',
        patientId: 'PAT-002',
        patientName: 'Priya Sharma',
        sponsorId: 'SPN002',
        sponsorName: 'Star Health Insurance',
        claimAmount: '₹25,000',
        approvedAmount: '₹23,500',
        claimDate: '2024-01-14',
        status: 'Under Review',
        diagnosis: 'Pneumonia Treatment',
        hospitalName: 'Sacred Heart Hospital'
      },
      {
        id: 'CLM003',
        patientId: 'PAT-003',
        patientName: 'Amit Singh',
        sponsorId: 'SPN003',
        sponsorName: 'HDFC ERGO Health Insurance',
        claimAmount: '₹35,000',
        approvedAmount: '₹35,000',
        claimDate: '2024-01-13',
        status: 'Approved',
        diagnosis: 'Appendicitis Surgery',
        hospitalName: 'Kamal Multispeciality Hospital'
      }
    ],
    settlements: [
      {
        id: 'STL001',
        sponsorId: 'SPN001',
        sponsorName: 'Apollo Munich Health Insurance',
        settlementAmount: '₹2,50,000',
        settlementDate: '2024-01-10',
        claimsCount: '15',
        status: 'Completed',
        paymentMethod: 'NEFT'
      },
      {
        id: 'STL002',
        sponsorId: 'SPN002',
        sponsorName: 'Star Health Insurance',
        settlementAmount: '₹1,80,000',
        settlementDate: '2024-01-08',
        claimsCount: '12',
        status: 'Completed',
        paymentMethod: 'RTGS'
      },
      {
        id: 'STL003',
        sponsorId: 'SPN003',
        sponsorName: 'HDFC ERGO Health Insurance',
        settlementAmount: '₹3,20,000',
        settlementDate: '2024-01-05',
        claimsCount: '18',
        status: 'Pending',
        paymentMethod: 'NEFT'
      }
    ]
  };

  const TabButton = ({ id, label, icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base mobile-touch-target ${
        activeTab === id
          ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg'
          : 'text-orange-600 hover:bg-orange-50'
      }`}
    >
      <span className="text-sm sm:text-lg">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded-full text-xs">
        {count}
      </span>
    </button>
  );

  const filteredData = tpaData[activeTab]?.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sponsorName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            TPA Management System
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Third Party Administrator & Insurance Management</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mobile-stats">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-orange-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 mb-1 sm:mb-2">{tpaData.sponsors.length}</div>
          <div className="text-xs sm:text-sm font-medium text-orange-600">Active Sponsors</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-blue-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-1 sm:mb-2">{tpaData.claims.length}</div>
          <div className="text-xs sm:text-sm font-medium text-blue-600">Total Claims</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-green-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-1 sm:mb-2">{tpaData.settlements.length}</div>
          <div className="text-xs sm:text-sm font-medium text-green-600">Settlements</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border border-purple-200 stat-card">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 mb-1 sm:mb-2">₹7,50,000</div>
          <div className="text-xs sm:text-sm font-medium text-purple-600">Total Settlement</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-orange-200/50">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mobile-nav">
          <TabButton id="sponsors" label="Insurance Sponsors" icon="🏢" count={tpaData.sponsors.length} />
          <TabButton id="claims" label="Claims" icon="📋" count={tpaData.claims.length} />
          <TabButton id="settlements" label="Settlements" icon="💰" count={tpaData.settlements.length} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/50">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, contact person, or patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-8 shadow-lg border border-orange-200/50">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          {activeTab === 'sponsors' ? 'Insurance Sponsors' : 
           activeTab === 'claims' ? 'Insurance Claims' : 'Settlement Records'}
        </h3>
        
        <div className="overflow-x-auto mobile-table">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-orange-200">
                {activeTab === 'sponsors' && (
                  <>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Sponsor ID</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Company Name</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Contact Person</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Phone</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Coverage Limit</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Network Hospitals</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Commission Rate</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
                  </>
                )}
                {activeTab === 'claims' && (
                  <>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Claim ID</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Patient</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Sponsor</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Claim Amount</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Approved Amount</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Diagnosis</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Claim Date</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
                  </>
                )}
                {activeTab === 'settlements' && (
                  <>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Settlement ID</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Sponsor</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Settlement Amount</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Claims Count</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Settlement Date</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Payment Method</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6 font-mono text-gray-800">{item.id}</td>
                  
                  {activeTab === 'sponsors' && (
                    <>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.type}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-semibold text-gray-900">{item.contactPerson}</div>
                          <div className="text-sm text-gray-600">{item.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-800">{item.phone}</td>
                      <td className="py-4 px-6 font-semibold text-green-600">{item.coverageLimit}</td>
                      <td className="py-4 px-6 text-gray-800">{item.networkHospitals}</td>
                      <td className="py-4 px-6 font-semibold text-blue-600">{item.commissionRate}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}

                  {activeTab === 'claims' && (
                    <>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-semibold text-gray-900">{item.patientName}</div>
                          <div className="text-sm text-gray-600">ID: {item.patientId}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-semibold text-gray-900">{item.sponsorName}</div>
                          <div className="text-sm text-gray-600">ID: {item.sponsorId}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">{item.claimAmount}</td>
                      <td className="py-4 px-6 font-semibold text-green-600">{item.approvedAmount}</td>
                      <td className="py-4 px-6 text-gray-800">{item.diagnosis}</td>
                      <td className="py-4 px-6 text-gray-800">{item.claimDate}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Approved' 
                            ? 'bg-green-100 text-green-700' 
                            : item.status === 'Under Review'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}

                  {activeTab === 'settlements' && (
                    <>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-semibold text-gray-900">{item.sponsorName}</div>
                          <div className="text-sm text-gray-600">ID: {item.sponsorId}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-green-600">{item.settlementAmount}</td>
                      <td className="py-4 px-6 text-gray-800">{item.claimsCount}</td>
                      <td className="py-4 px-6 text-gray-800">{item.settlementDate}</td>
                      <td className="py-4 px-6 text-gray-800">{item.paymentMethod}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">🏢</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No records found</h4>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TPAManagement;