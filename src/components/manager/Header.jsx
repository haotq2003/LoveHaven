import React from 'react'
import { Search, Bell } from 'lucide-react'
import { useAuth } from "../../context/AuthContext";
const Header = () => {
  const { userEmail } = useAuth();
  return (
    <header className="">
      <div className=" ml-0.5 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Hello {userEmail} 👋</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm"
            />
          </div>
          
          {/* Notifications */}
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <span className="sr-only">View notifications</span>
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header