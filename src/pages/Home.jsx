import React, { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import PatientRegistration from './PatientRegistration'
import BedBooking from './BedBooking'
import HospitalDetails from './HospitalDetails'
import PatientFlow from './PatientFlow'
import PatientReports from './PatientReports'
import EmergencyHelp from './EmergencyHelp'
import BloodBank from './BloodBank'
import ChatBot from './ChatBot'
import Layout from '../ui/Layout'
import Settings from './Settings'
import HRManagement from './HRManagement'
import TPAManagement from './TPAManagement'
import ClaimManagement from './ClaimManagement'

export default function Home() {

    const [selectedSection, setSelectedSection] = useState('dashboard')

    // Event listener for navigation from Dashboard
    useEffect(() => {
        const handleNavigation = (event) => {
            const { section } = event.detail;
            setSelectedSection(section);
        };

        window.addEventListener('navigateToSection', handleNavigation);

        return () => {
            window.removeEventListener('navigateToSection', handleNavigation);
        };
    }, []);

   const renderSection=()=>{
    switch(selectedSection){
      case 'dashboard':
        return <Dashboard />
      case 'patient-registration':
        return <PatientRegistration />
      case 'bed-booking':
        return <BedBooking />
      case 'hospital-details':
        return <HospitalDetails />
      case 'patient-flow':
        return <PatientFlow />
      case 'patient-reports':
        return <PatientReports />
      case 'emergency-help':
        return <EmergencyHelp />
      case 'blood-bank':
        return <BloodBank />
      case 'chatbot':
        return <ChatBot />
      case 'orders':
        return <Orders />
      case 'inventory':
        return <Inventory />
      case 'users':
        return <Settings />
      case 'hr-management':
        return <HRManagement />
      case 'tpa-management':
        return <TPAManagement />
      case 'claim-management':
        return <ClaimManagement />
       
      default:
        return <Dashboard />
    }
   }

   return (
    <Layout selectedSection={selectedSection} onSectionChange={setSelectedSection}>
      {renderSection()}
    </Layout>
  );
}