import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const ManagerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ManagerLayout