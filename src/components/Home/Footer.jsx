import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white-100 text-gray-800 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Cột 1: Logo & giới thiệu */}
        <div>
          <h3 className="text-2xl font-bold text-pink-600 mb-4">LoveHaven</h3>
          <p className="text-gray-600 mb-4">
            Nền tảng tư vấn tâm lý trực tuyến hàng đầu Việt Nam, nơi bạn tìm thấy sự lắng nghe và thấu hiểu.
          </p>
          <div className="flex space-x-4">
            {/* Facebook */}
            <a href="#" className="text-pink-600 hover:text-pink-800 transition duration-200" aria-label="Facebook">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-pink-600 hover:text-pink-800 transition duration-200" aria-label="Instagram">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.75 2C5.679 2 4 3.679 4 5.75v12.5C4 20.321 5.679 22 7.75 22h8.5C18.321 22 20 20.321 20 18.25V5.75C20 3.679 18.321 2 16.25 2h-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.8a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zm4.75-.75a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="text-pink-600 hover:text-pink-800 transition duration-200" aria-label="YouTube">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 15l5-3-5-3v6zm12-3s0-3.255-.418-4.814a2.504 2.504 0 00-1.768-1.768C18.254 5 12 5 12 5s-6.254 0-7.814.418a2.505 2.505 0 00-1.768 1.768C2 8.745 2 12 2 12s0 3.255.418 4.814a2.505 2.505 0 001.768 1.768C5.746 19 12 19 12 19s6.254 0 7.814-.418a2.504 2.504 0 001.768-1.768C22 15.255 22 12 22 12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Cột 2: Dịch vụ */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-pink-600">Dịch vụ</h4>
          <ul className="space-y-2">
            <li><Link to="/services/personal" className="hover:text-pink-700">Tư vấn cá nhân</Link></li>
            <li><Link to="/services/online" className="hover:text-pink-700">Tư vấn trực tuyến</Link></li>
            <li><Link to="/services/family" className="hover:text-pink-700">Tư vấn gia đình</Link></li>
            <li><Link to="/services/children" className="hover:text-pink-700">Tâm lý trẻ em</Link></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-pink-600">Hỗ trợ</h4>
          <ul className="space-y-2">
            <li><Link to="/faqs" className="hover:text-pink-700">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-pink-700">Điều khoản sử dụng</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-700">Chính sách bảo mật</Link></li>
            <li><Link to="/help" className="hover:text-pink-700">Trung tâm trợ giúp</Link></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-pink-600">Liên hệ</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>123 Đường ABC, Quận X, TP. Hồ Chí Minh</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H17C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>0123 456 789</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@lovehaven.vn</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-500">
        © 2025 LoveHaven. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  )
}

export default Footer
