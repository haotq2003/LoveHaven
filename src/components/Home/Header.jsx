import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-pink-400">
              Love Haven
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-teal-600">
              Trang chủ
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-teal-600">
              Dịch vụ
            </Link>
            <Link to="/experts" className="text-gray-600 hover:text-teal-600">
              Chuyên gia
            </Link>
            <Link to="/reviews" className="text-gray-600 hover:text-teal-600">
              Đánh giá
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-teal-600">
              Giới thiệu
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-teal-600">
              Liên hệ
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2.5 border border-pink-300 text-pink-500 font-medium rounded-xl shadow-sm hover:bg-pink-100 transition duration-300">
              Đăng nhập
            </button>
            <button className="px-5 py-2.5 bg-pink-400 text-white font-medium rounded-xl shadow-sm hover:bg-pink-500 transition duration-300 ml-3">
              Đăng ký
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
