import React, { useState } from 'react';

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample HR data with Indian names and format
  const hrData = {
    doctors: [
      {
        id: 'DOC001',
        name: 'Dr. Rajesh Kumar Verma',
        role: 'Senior Cardiologist',
        department: 'Cardiology',
        phone: '+91-98765-43210',
        email: 'rajesh.verma@hospital.com',
        address: '123 MG Road, Mumbai, Maharashtra 400001',
        salary: '₹2,50,000',
        experience: '15 years',
        qualification: 'MD Cardiology',
        joiningDate: '2010-03-15',
        status: 'Active'
      },
      {
        id: 'DOC002',
        name: 'Dr. Priya Sharma',
        role: 'Pediatrician',
        department: 'Pediatrics',
        phone: '+91-98765-43211',
        email: 'priya.sharma@hospital.com',
        address: '456 Park Street, Delhi, Delhi 110001',
        salary: '₹1,80,000',
        experience: '12 years',
        qualification: 'MD Pediatrics',
        joiningDate: '2012-07-20',
        status: 'Active'
      },
      {
        id: 'DOC003',
        name: 'Dr. Amit Singh',
        role: 'Orthopedic Surgeon',
        department: 'Orthopedics',
        phone: '+91-98765-43212',
        email: 'amit.singh@hospital.com',
        address: '789 Brigade Road, Bangalore, Karnataka 560001',
        salary: '₹2,20,000',
        experience: '18 years',
        qualification: 'MS Orthopedics',
        joiningDate: '2008-11-10',
        status: 'Active'
      },
      {
        id: 'DOC004',
        name: 'Dr. Sunita Agarwal',
        role: 'Gynecologist',
        department: 'Gynecology',
        phone: '+91-98765-43213',
        email: 'sunita.agarwal@hospital.com',
        address: '321 Commercial Street, Chennai, Tamil Nadu 600001',
        salary: '₹1,95,000',
        experience: '14 years',
        qualification: 'MD Gynecology',
        joiningDate: '2011-05-25',
        status: 'Active'
      },
      {
        id: 'DOC005',
        name: 'Dr. Vikram Patel',
        role: 'Neurologist',
        department: 'Neurology',
        phone: '+91-98765-43214',
        email: 'vikram.patel@hospital.com',
        address: '654 Residency Road, Ahmedabad, Gujarat 380001',
        salary: '₹2,35,000',
        experience: '16 years',
        qualification: 'DM Neurology',
        joiningDate: '2009-09-12',
        status: 'Active'
      }
    ],
    staff: [
      {
        id: 'STF001',
        name: 'Anjali Gupta',
        role: 'Head Nurse',
        department: 'ICU',
        phone: '+91-98765-43215',
        email: 'anjali.gupta@hospital.com',
        address: '987 Linking Road, Mumbai, Maharashtra 400050',
        salary: '₹45,000',
        experience: '8 years',
        qualification: 'B.Sc Nursing',
        joiningDate: '2016-02-14',
        status: 'Active'
      },
      {
        id: 'STF002',
        name: 'Suresh Kumar',
        role: 'Lab Technician',
        department: 'Pathology',
        phone: '+91-98765-43216',
        email: 'suresh.kumar@hospital.com',
        address: '147 Sector 17, Chandigarh, Punjab 160017',
        salary: '₹35,000',
        experience: '6 years',
        qualification: 'B.Sc Medical Technology',
        joiningDate: '2018-06-10',
        status: 'Active'
      },
      {
        id: 'STF003',
        name: 'Kavita Joshi',
        role: 'Pharmacist',
        department: 'Pharmacy',
        phone: '+91-98765-43217',
        email: 'kavita.joshi@hospital.com',
        address: '258 Nehru Place, Delhi, Delhi 110019',
        salary: '₹40,000',
        experience: '7 years',
        qualification: 'B.Pharm',
        joiningDate: '2017-03-22',
        status: 'Active'
      },
      {
        id: 'STF004',
        name: 'Ramesh Yadav',
        role: 'Radiology Technician',
        department: 'Radiology',
        phone: '+91-98765-43218',
        email: 'ramesh.yadav@hospital.com',
        address: '369 Banjara Hills, Hyderabad, Telangana 500034',
        salary: '₹38,000',
        experience: '5 years',
        qualification: 'Diploma in Radiology',
        joiningDate: '2019-01-15',
        status: 'Active'
      },
      {
        id: 'STF005',
        name: 'Deepika Sharma',
        role: 'Receptionist',
        department: 'Administration',
        phone: '+91-98765-43219',
        email: 'deepika.sharma@hospital.com',
        address: '741 Salt Lake, Kolkata, West Bengal 700064',
        salary: '₹25,000',
        experience: '4 years',
        qualification: 'B.Com',
        joiningDate: '2020-08-05',
        status: 'Active'
      },
      {
        id: 'STF006',
        name: 'Manish Kumar',
        role: 'Security Guard',
        department: 'Security',
        phone: '+91-98765-43220',
        email: 'manish.kumar@hospital.com',
        address: '852 Indiranagar, Bangalore, Karnataka 560038',
        salary: '₹20,000',
        experience: '3 years',
        qualification: '10th Pass',
        joiningDate: '2021-04-12',
        status: 'Active'
      }
    ],
    admin: [
      {
        id: 'ADM001',
        name: 'Rajesh Malhotra',
        role: 'Hospital Administrator',
        department: 'Administration',
        phone: '+91-98765-43221',
        email: 'rajesh.malhotra@hospital.com',
        address: '963 CP Market, Delhi, Delhi 110001',
        salary: '₹1,20,000',
        experience: '20 years',
        qualification: 'MBA Healthcare',
        joiningDate: '2005-01-10',
        status: 'Active'
      },
      {
        id: 'ADM002',
        name: 'Priya Khanna',
        role: 'HR Manager',
        department: 'Human Resources',
        phone: '+91-98765-43222',
        email: 'priya.khanna@hospital.com',
        address: '741 Koramangala, Bangalore, Karnataka 560034',
        salary: '₹85,000',
        experience: '12 years',
        qualification: 'MBA HR',
        joiningDate: '2012-08-15',
        status: 'Active'
      },
      {
        id: 'ADM003',
        name: 'Amit Jain',
        role: 'Finance Manager',
        department: 'Finance',
        phone: '+91-98765-43223',
        email: 'amit.jain@hospital.com',
        address: '852 Andheri West, Mumbai, Maharashtra 400058',
        salary: '₹95,000',
        experience: '15 years',
        qualification: 'CA',
        joiningDate: '2009-11-20',
        status: 'Active'
      }
    ]
  };

  const TabButton = ({ id, label, icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
        activeTab === id
          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
          : 'text-purple-600 hover:bg-purple-50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
      <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
        {count}
      </span>
    </button>
  );

  const filteredData = hrData[activeTab]?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
            HR Management System
          </span>
        </h1>
        <p className="text-gray-600 text-lg">Manage doctors, staff, and administrative personnel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
          <div className="text-3xl font-bold text-blue-700 mb-2">{hrData.doctors.length}</div>
          <div className="text-sm font-medium text-blue-600">Total Doctors</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border border-green-200">
          <div className="text-3xl font-bold text-green-700 mb-2">{hrData.staff.length}</div>
          <div className="text-sm font-medium text-green-600">Support Staff</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
          <div className="text-3xl font-bold text-purple-700 mb-2">{hrData.admin.length}</div>
          <div className="text-sm font-medium text-purple-600">Administrative</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200/50">
        <div className="flex flex-wrap gap-4 justify-center">
          <TabButton id="doctors" label="Doctors" icon="👨‍⚕️" count={hrData.doctors.length} />
          <TabButton id="staff" label="Support Staff" icon="👩‍⚕️" count={hrData.staff.length} />
          <TabButton id="admin" label="Administration" icon="👨‍💼" count={hrData.admin.length} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200/50">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, role, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-200/50">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {activeTab === 'doctors' ? 'Medical Doctors' : 
           activeTab === 'staff' ? 'Support Staff' : 'Administrative Staff'}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-purple-200">
                <th className="text-left py-4 px-6 font-bold text-gray-700">Employee ID</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Name</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Role</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Department</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Phone</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Address</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Salary</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Experience</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6 font-mono text-gray-800">{employee.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-600">{employee.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{employee.role}</div>
                      <div className="text-sm text-gray-600">{employee.qualification}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800">{employee.department}</td>
                  <td className="py-4 px-6 text-gray-800">{employee.phone}</td>
                  <td className="py-4 px-6 text-gray-800 max-w-xs truncate">{employee.address}</td>
                  <td className="py-4 px-6 font-semibold text-green-600">{employee.salary}</td>
                  <td className="py-4 px-6 text-gray-800">{employee.experience}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">👥</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No employees found</h4>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRManagement;
