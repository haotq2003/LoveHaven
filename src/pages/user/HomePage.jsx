import React from 'react'
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
import video1 from '../../assets/video1.mp4'
import ScrollFadeInSection from '../../common/ScrollFadeInSection'

const HomePage = () => {
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
    className="absolute inset-0 w-full h-full object-cover  z-0"
  >
    <source src={video1} type="video/mp4" />
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


      {/* Hiểu Biết Bản Thân Section */}
     <ScrollFadeInSection>
     <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#FF6B6B] mb-4">Hiểu Biết Bản Thân Qua Tư Vấn Tâm Lý</h2>
            <p className=" mb-6">Tâm Lý Học Giúp Bạn Sống Tích Cực Hơn Thế Nào?</p>
            <Link to="/about" className="bg-[#FF6B6B] text-white px-6 py-2 rounded-full inline-block hover:bg-[#FF5252] transition-all duration-300">
              Xem ngay
            </Link>
          </div>
          <div className=" p-4 rounded-lg flex justify-center">
            <img src={anh1} alt="Tư vấn tâm lý" className="rounded-lg w-96 h-64 object-cover" />
          </div>
        </div>
      </div>
     </ScrollFadeInSection>

      {/* Hành Trang Cho Hạnh Phúc Section */}
     <ScrollFadeInSection>
     <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 p-4 rounded-lg flex justify-center">
            <img src={anh1} alt="Cặp đôi hạnh phúc" className="rounded-lg w-96 h-64 object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-[#FF6B6B] mb-4">Hành Trang Cho Hạnh Phúc</h2>
            <p className=" mb-6">Giúp bạn vượt qua những khó khăn trong giai đoạn khủng hoảng</p>
            <Link to="/services" className="bg-[#FF6B6B] text-white px-6 py-2 rounded-full inline-block hover:bg-[#FF5252] transition-all duration-300">
              Xem ngay
            </Link>
          </div>
        </div>
      </div>
     </ScrollFadeInSection>

      {/* Tư Vấn Tâm Lý Chuyên Sâu Section */}
     <ScrollFadeInSection>
     <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#FF6B6B] mb-4">Tư Vấn Tâm Lý Chuyên Sâu</h2>
            <p className=" mb-6">
              Bạn đang cảm thấy căng thẳng, mệt mỏi, phương hướng hay đối mặt người mà mình yêu? Đội ngũ chuyên gia tâm lý của chúng tôi sẽ giúp bạn vượt qua mọi khó khăn, tìm lại cân bằng và niềm vui trong cuộc sống.
            </p>
            <Link to="/experts" className="bg-[#FF6B6B] text-white px-6 py-2 rounded-full inline-block hover:bg-[#FF5252] transition-all duration-300">
              Xem ngay
            </Link>
          </div>
          <div className=" p-4 rounded-lg flex justify-center">
            <img src={anh1} alt="Tư vấn tâm lý" className="rounded-lg w-96 h-64 object-cover" />
          </div>
        </div>
      </div>

</ScrollFadeInSection>
      {/* Newsletter Section */}
    

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
     
 
     
    </div>
  )
}

export default HomePage
