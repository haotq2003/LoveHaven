import React from 'react'
import { Link } from 'react-router-dom'
import anhtuvan from '../../assets/anhtuvan.jpg'
const HeroSection = () => {
  return (
     <section className="relative bg-pink-100 text-gray-800 py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={anhtuvan} 
          alt="Therapy Illustration"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative container mx-auto px-4 text-center z-10">
      
        <h1 className="text-4xl  md:text-5xl font-bold mb-4">Chữa lành tâm hồn, tìm lại chính mình</h1>
        <p className="text-lg md:text-xl mb-6">Love Haven giúp bạn kết nối với chuyên gia tâm lý để đồng hành và lắng nghe.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/booking" className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600">Đặt lịch tư vấn</Link>
          <Link to="/services" className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50">Tìm hiểu thêm</Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
