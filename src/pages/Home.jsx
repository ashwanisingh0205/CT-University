import React, { useState } from 'react'
import Dashboard from './Dashboard'

import Inventory from './Inventory'

import Layout from '../ui/Layout'
import Orders from './Orders'
import Users from './Users'
import Settings from './Settings'

export default function Home() {

    const [selectedSection, setSelectedSection] = useState('dashboard')

   const renderSection=()=>{
    switch(selectedSection){
      case 'dashboard':
        return <Dashboard />
      case 'orders':
        return <Orders />
      case 'inventory':
        return <Inventory />
      
      case 'users':
        return <Users />
        case 'analytics':
        return <Analytics />
        case 'settings':
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