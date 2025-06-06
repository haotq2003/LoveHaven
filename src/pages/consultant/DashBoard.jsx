import React, { useState } from 'react'
import { Clock, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const { userEmail } = useAuth()
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')

  // Mock data cho lịch hẹn sắp tới
  const upcomingAppointments = [
    {
      id: 1,
      title: 'Tư vấn tâm lý cá nhân',
      consultant: 'Chị Nguyễn Thị A',
      progress: 100,
      duration: '1 Hour',
      status: 'Đã xác nhận'
    },
    {
      id: 2,
      title: 'Hỗ trợ khủng hoảng tinh thần',
      consultant: 'Chị Nguyễn Thị A',
      progress: 100,
      duration: '2 Hour',
      status: 'Đã xác nhận'
    },
    {
      id: 3,
      title: 'Tư vấn tâm lý hôn nhân',
      consultant: 'Anh Nguyễn Văn B',
      progress: 100,
      duration: '1 Hour',
      status: 'Đã xác nhận'
    }
  ]

  // Mock data cho lịch hẹn mới
  const newAppointments = [
    {
      id: 4,
      title: 'Tư vấn tâm lý cặp đôi',
      progress: 75,
      daysLeft: 3,
      status: 'Chờ xác nhận'
    },
    {
      id: 5,
      title: 'Tư vấn tâm lý cặp đôi',
      progress: 85,
      daysLeft: 4,
      status: 'Chờ xác nhận'
    },
    {
      id: 6,
      title: 'Tư vấn tâm lý cặp đôi',
      progress: 65,
      daysLeft: 3,
      status: 'Chờ xác nhận'
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Công Việc</h1>
         
        </div>

        {/* Search bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        {/* <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border rounded-lg flex items-center space-x-2 bg-white">
            <span>Category</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div> */}

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort By:</span>
          <button className="px-4 py-2 border rounded-lg flex items-center space-x-2 bg-white">
            <span>Deadline</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lịch hẹn sắp tới</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <img 
                  src="/src/assets/anhtuvan.jpg" 
                  alt="Appointment" 
                  className="w-full h-40 object-cover rounded-lg mb-4" 
                />
                <h3 className="font-medium text-lg mb-1">{appointment.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{appointment.consultant}</p>
                
                <div className="mb-3">
                  <p className="text-right text-sm font-medium text-green-500 mb-1">{appointment.status}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6B6B] h-2 rounded-full" 
                      style={{ width: `${appointment.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{appointment.duration}</span>
                  </div>
                  <button className="px-3 py-1 bg-[#FF6B6B] text-white rounded-md text-sm hover:bg-[#FF5252] transition-colors">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Appointments Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lịch hẹn mới</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <img 
                  src="/src/assets/tuvan2.jpg" 
                  alt="Appointment" 
                  className="w-full h-40 object-cover rounded-lg mb-4" 
                />
                <h3 className="font-medium text-lg mb-3">{appointment.title}</h3>
                
                <div className="mb-3">
                  <p className="text-right text-sm font-medium text-orange-500 mb-1">{appointment.status}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6B6B] h-2 rounded-full" 
                      style={{ width: `${appointment.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <span className="text-sm">Còn {appointment.daysLeft} ngày</span>
                  </div>
                  <button className="px-3 py-1 bg-[#FF6B6B] text-white rounded-md text-sm hover:bg-[#FF5252] transition-colors">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

   
     
    </div>
  )
}

export default Dashboard
