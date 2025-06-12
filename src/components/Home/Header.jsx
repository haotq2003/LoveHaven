import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, userEmail, logout } = useAuth();

  const login = () => navigate("/login");
  const register = () => navigate("/register");

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#2E8B57]">
          <img src={logo} className="w-24 h-24 rounded-full" />
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-800 hover:text-[#3CB371]">Trang chủ</Link>
          <Link to="/services" className="text-gray-600 hover:text-teal-600">Dịch vụ</Link>
          <Link to="/experts" className="text-gray-600 hover:text-teal-600">Chuyên gia</Link>
          {/* <Link to="/reviews" className="text-gray-600 hover:text-teal-600">Tư vấn</Link> */}
          <Link to="/about" className="text-gray-600 hover:text-teal-600">Giới thiệu</Link>
          <Link to="/contact" className="text-gray-600 hover:text-teal-600">Liên hệ</Link>
          <Link to="/blog" className="text-gray-600 hover:text-teal-600">Blog</Link>
          <Link to="/booking-history" className="text-gray-600 hover:text-teal-600">Lịch sử đặt lịch</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button onClick={login} className="px-5 py-2.5 border border-[#F48BA1] text-[#F48BA1] font-medium rounded-xl shadow-sm transition duration-300">
                Đăng nhập
              </button>
              <button onClick={register} className="px-5 py-2.5 bg-[#F48BA1] text-white font-medium rounded-xl shadow-sm transition duration-300 ml-3">
                Đăng ký
              </button>
            </>
          ) : (
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100" onClick={toggleDropdown}>
                <span className="text-[#F48BA1] font-medium">Welcome, {userEmail}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                    <User size={16} className="mr-2" />
                    Trang cá nhân
                  </Link>
                  <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut size={16} className="mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
