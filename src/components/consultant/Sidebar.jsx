import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Users, MessageSquare, BarChart3, FileText, Calendar, Settings, LogOut } from 'lucide-react'
import logo from '../../assets/logo.jpg'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Dashboard', icon: <BarChart3 size={20} />, path: '/consultant' },
    { name: 'Lịch hẹn', icon: <Calendar size={20} />, path: '/consultant/appointments' },
    // { name: 'Khách hàng', icon: <Users size={20} />, path: '/consultant/clients' },
    { name: 'Tin nhắn', icon: <MessageSquare size={20} />, path: '/consultant/chat' },
  ]
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
        <span className="text-xl font-semibold text-[#2E8B57]">LoveHaven</span>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-[#F48BA1]/10 text-[#F48BA1]' : 'text-gray-600 hover:bg-[#F48BA1]/5 hover:text-[#F48BA1]'}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar