import React, { useState } from 'react'
import Dashboard from './Dashboard'
import PatientRegistration from './PatientRegistration'
import BedBooking from './BedBooking'
import HospitalDetails from './HospitalDetails'
import PatientFlow from './PatientFlow'
import PatientReports from './PatientReports'
import EmergencyHelp from './EmergencyHelp'
import BloodBank from './BloodBank'
import ChatBot from './ChatBot'
import Inventory from './Inventory'
import Layout from '../ui/Layout'
import Orders from './Orders'
import Settings from './Settings'

export default function Home() {

    const [selectedSection, setSelectedSection] = useState('dashboard')

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