import React, { useEffect, useState } from 'react'
import Header from '../../components/Home/Header'
import Footer from '../../components/Home/Footer'
import HeroSection from '../../components/Home/HeroSection'
import ServicesSection from '../../components/Home/ServicesSection'
import PsychologistsSection from '../../components/Home/PsychologistsSection'
import WhyChooseUsSection from '../../components/Home/WhyChooseUsSection'
import TestimonialsSection from '../../components/Home/TestimonialsSection'
import FaqSection from '../../components/Home/FaqSection'
import CallToActionSection from '../../components/Home/CallToActionSection'
import { Link } from 'react-router-dom'
import anh1 from '../../assets/anhtuvan.jpg'

import ScrollFadeInSection from '../../common/ScrollFadeInSection'
import { consultantService } from '../../services/consultants.service'
import ChatBox from './ChatBox'
import ChatToggleBox from './ChatBox'
import { blogService } from '../../services/blog.service'

const HomePage = () => {
const [blog,setBlog] = useState([]);
const fetchBlog = async () =>{
  try {
    const response = await blogService.getAllBlogs();
    console.log(response.data)
        setBlog(response.data);
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }

}
useEffect(() => {
  fetchBlog();
}, [])


  
  return (
    <div className='bg-white min-h-screen'>
      {/* Hero Section - Banner chính */}
      <div className="relative bg-[#F48BA1] py-32 overflow-hidden">
  {/* Video nền */}
  <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover z-0"
>
  <source src="https://res.cloudinary.com/dturncvxv/video/upload/v1749477516/video1_wia6mz.mp4" type="video/mp4" />
  Trình duyệt của bạn không hỗ trợ video.
</video>


  {/* Nội dung text trên nền video */}
  <div className="relative z-10 container mx-auto px-4 max-w-6xl text-center">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hành Trình Sống Tích Cực - Đồng Hành Cùng Bạn Mọi Lúc!</h1>
    <p className="text-lg text-white mb-8">Tư Vấn Tâm Lý Chuyên Sâu</p>
    <Link
      to="/services"
      className="bg-[#FA3B64] text-white px-6 py-3 rounded-full hover:bg-[#e12b54] transition-all duration-300"
    >
      Xem ngay
    </Link>
  </div>
</div>


    {/* Blog Section */}
<ScrollFadeInSection>
  <div className="container mx-auto px-4 py-16 max-w-6xl">
    <h2 className="text-3xl font-bold text-[#FF6B6B] mb-8 text-center">Bài Viết Mới Nhất</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blog.slice(0, 3).map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
        >
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">{item.title}</h3>
            <p className="text-gray-700 mb-4 flex-1">{item.summary}</p>
            <Link
              to={`/blog/${item.id}`}
              className="bg-[#FF6B6B] text-white px-4 py-2 rounded-full text-center hover:bg-[#FF5252] transition-all duration-300"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</ScrollFadeInSection>

    

      {/* Các section khác từ components */}
      {/* <ServicesSection /> */}
      <ScrollFadeInSection>
      <PsychologistsSection />
      </ScrollFadeInSection>
      <ScrollFadeInSection>
      <WhyChooseUsSection />
        </ScrollFadeInSection>
        <ScrollFadeInSection>
          
      <TestimonialsSection />
        </ScrollFadeInSection>
        <ScrollFadeInSection>
        <FaqSection />
        </ScrollFadeInSection>
     <ChatToggleBox/>
 
     
    </div>
  )
}

export default HomePage
