import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Users, MessageSquare, BarChart3, FileText, Calendar, Settings, LogOut } from 'lucide-react'
import logo from '../../assets/logo.jpg'
import { useAuth } from "../../context/AuthContext";
const Sidebar = () => {
  const location = useLocation()
  const { userEmail ,logout} = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const menuItems = [
    { name: 'Dashboard', icon: <BarChart3 size={20} />, path: '/manager' },
    { name: 'Dịch vụ', icon: <MessageSquare size={20} />, path: '/manager/services' },
    { name: 'Khách hàng', icon: <Users size={20} />, path: '/manager/users' },
    { name: 'Doanh thu', icon: <BarChart3 size={20} />, path: '/manager/revenue' },
    { name: 'Chuyên gia', icon: <Users size={20} />, path: '/manager/consultant-accounts' },
    { name: 'Tin tức', icon: <FileText size={20} />, path: '/manager/blog' },
    { name: 'Nguồn chi', icon: <BarChart3 size={20} />, path: '/manager/appointments' },
  ]
 
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <img src={logo} alt="Love Haven" className="w-10 h-10 rounded-full" />
        <span className="ml-2 text-xl font-semibold text-[#FF6B6B]">Dashboard</span>
        <span className="text-xs text-gray-400 ml-1">(β)</span>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  isActive 
                    ? 'bg-[#FFE2E2] text-[#FF6B6B]' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className={`${isActive ? 'text-[#FF6B6B]' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span className="ml-3">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Manager"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{userEmail}</p>
            <button onClick={handleLogout} className="text-xs flex items-center text-gray-500 hover:text-[#FF6B6B]">
              <LogOut size={14} className="mr-1"  />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar