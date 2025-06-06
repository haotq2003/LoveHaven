import React from 'react'
import ScrollFadeInSection from '../../common/ScrollFadeInSection'

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-black mb-4">
          <span className="text-black">
            LIÊN HỆ VỚI CHÚNG TÔI
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với Love Haven qua các kênh dưới đây
        </p>
      </section>

     <ScrollFadeInSection>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Form liên hệ */}
        <div className=" backdrop-blur-sm rounded-2xl shadow-sm border border-[#98D4BB]/30 p-8">
          <h2 className="text-2xl font-semibold text-[#FF6B6B] mb-6">Gửi tin nhắn cho chúng tôi</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Họ và tên</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 border border-[#98D4BB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 border border-[#98D4BB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Chủ đề</label>
              <select 
                id="subject" 
                className="w-full px-4 py-3 border border-[#98D4BB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
              >
                <option value="">Chọn chủ đề</option>
                <option value="service">Tư vấn dịch vụ</option>
                <option value="support">Hỗ trợ kỹ thuật</option>
                <option value="feedback">Góp ý, phản hồi</option>
                <option value="partnership">Hợp tác kinh doanh</option>
                <option value="other">Khác</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Nội dung tin nhắn</label>
              <textarea 
                id="message" 
                rows="5" 
                className="w-full px-4 py-3 border border-[#98D4BB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                placeholder="Nhập nội dung tin nhắn của bạn"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-[#FF6B6B] hover:from-[#1D6F42] hover:to-[#FF6B6B] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md transform hover:scale-[1.02]"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
        
        {/* Thông tin liên hệ */}
        <div>
          <div className="bg-[#] rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#FF6B6B] mb-6">Thông tin liên hệ</h2>
            
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="text-gray-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Địa chỉ</h3>
                  <p className="text-gray-700">Bcons Suối Tiên
                  VRG5+FCF, 45 Tân Lập, Đông Hoà, Dĩ An, Bình Dương 750000, Việt Nam</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="text-[#2E8B57] mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Điện thoại</h3>
                  <p className="text-gray-700">+84 (28) 3800 1234</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="text-[#2E8B57] mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Email</h3>
                  <p className="text-gray-700">contact@lovehaven.com</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="text-[#2E8B57] mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Giờ làm việc</h3>
                  <p className="text-gray-700">Thứ Hai - Thứ Sáu: 8:00 - 18:00<br />Thứ Bảy: 9:00 - 12:00<br />Chủ Nhật: Nghỉ</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#98D4BB]/30 p-8">
            <h2 className="text-2xl font-semibold text-[#FF6B6B] mb-6">Kết nối với chúng tôi</h2>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-[#98D4BB]/20 rounded-full flex items-center justify-center text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-[#98D4BB]/20 rounded-full flex items-center justify-center text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-[#98D4BB]/20 rounded-full flex items-center justify-center text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-[#98D4BB]/20 rounded-full flex items-center justify-center text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
     </ScrollFadeInSection>
      
      {/* Bản đồ */}
      <ScrollFadeInSection>
      <div className="rounded-2xl overflow-hidden shadow-lg h-96 bg-gradient-to-br from-[#F0F9FF] to-[#E8F5E9] flex items-center justify-center border border-[#98D4BB]/30">
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.153510225712!2d106.80446857805379!3d10.875926461635448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ffca97c26c9%3A0xa80eae63ed49c38f!2zQmNvbnMgU3Xhu5FpIFRpw6pu!5e0!3m2!1svi!2s!4v1747640142986!5m2!1svi!2s"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
      </div>
      </ScrollFadeInSection>
      
      {/* FAQ */}
     <ScrollFadeInSection>
     <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          <span className="bg-[#FF6B6B] bg-clip-text text-transparent">
            Câu hỏi thường gặp
          </span>
        </h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/90 to-[#E8F5E9]/90 backdrop-blur-sm rounded-2xl shadow-sm border border-[#98D4BB]/30 p-6 hover:from-[#F0F9FF] hover:to-[#E8F5E9] transition-all duration-300">
            <h3 className="text-xl font-medium text-[#2E8B57] mb-3">Làm thế nào để đăng ký dịch vụ tư vấn?</h3>
            <p className="text-gray-700 leading-relaxed">Bạn có thể đăng ký dịch vụ tư vấn bằng cách điền form trên trang web, gọi điện trực tiếp hoặc gửi email cho chúng tôi. Đội ngũ hỗ trợ sẽ liên hệ lại với bạn trong vòng 24 giờ.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#98D4BB]/30 p-6">
            <h3 className="text-xl font-medium text-[#2E8B57] mb-3">Chi phí cho các dịch vụ của Love Haven là bao nhiêu?</h3>
            <p className="text-gray-700 leading-relaxed">Chi phí dịch vụ sẽ tùy thuộc vào loại dịch vụ và gói bạn lựa chọn. Vui lòng liên hệ với chúng tôi để nhận báo giá chi tiết phù hợp với nhu cầu của bạn.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#98D4BB]/30 p-6">
            <h3 className="text-xl font-medium text-[#2E8B57] mb-3">Thông tin của tôi có được bảo mật không?</h3>
            <p className="text-gray-700 leading-relaxed">Tại Love Haven, chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Mọi thông tin bạn cung cấp sẽ chỉ được sử dụng cho mục đích tư vấn và không được chia sẻ với bất kỳ bên thứ ba nào.</p>
          </div>
        </div>
      </section>
     </ScrollFadeInSection>
    </div>
  )
}

export default ContactPage