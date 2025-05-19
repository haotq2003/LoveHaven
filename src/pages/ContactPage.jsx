import React from 'react'

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Liên Hệ Với Chúng Tôi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với Love Haven qua các kênh dưới đây
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Form liên hệ */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6">Gửi tin nhắn cho chúng tôi</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Họ và tên</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Chủ đề</label>
              <select 
                id="subject" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Nhập nội dung tin nhắn của bạn"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
        
        {/* Thông tin liên hệ */}
        <div>
          <div className="bg-pink-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-pink-600 mb-6">Thông tin liên hệ</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-pink-500 text-2xl mr-4">📍</div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Địa chỉ</h3>
                  <p className="text-gray-700">Tòa nhà Innovation, 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-pink-500 text-2xl mr-4">📞</div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Điện thoại</h3>
                  <p className="text-gray-700">+84 (28) 3800 1234</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-pink-500 text-2xl mr-4">✉️</div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-700">contact@lovehaven.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-pink-500 text-2xl mr-4">⏰</div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Giờ làm việc</h3>
                  <p className="text-gray-700">Thứ Hai - Thứ Sáu: 8:00 - 18:00<br />Thứ Bảy: 9:00 - 12:00<br />Chủ Nhật: Nghỉ</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-pink-600 mb-6">Kết nối với chúng tôi</h2>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300">
                <span className="text-xl">f</span>
              </a>
              <a href="#" className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300">
                <span className="text-xl">in</span>
              </a>
              <a href="#" className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300">
                <span className="text-xl">ig</span>
              </a>
              <a href="#" className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300">
                <span className="text-xl">tw</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bản đồ */}
      <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Bản đồ Google Maps sẽ được hiển thị ở đây</p>
        {/* Để tích hợp Google Maps, bạn cần thêm thư viện và API key */}
      </div>
      
      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-pink-600 mb-8 text-center">Câu hỏi thường gặp</h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium text-pink-500 mb-3">Làm thế nào để đăng ký dịch vụ tư vấn?</h3>
            <p className="text-gray-700">Bạn có thể đăng ký dịch vụ tư vấn bằng cách điền form trên trang web, gọi điện trực tiếp hoặc gửi email cho chúng tôi. Đội ngũ hỗ trợ sẽ liên hệ lại với bạn trong vòng 24 giờ.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium text-pink-500 mb-3">Chi phí cho các dịch vụ của Love Haven là bao nhiêu?</h3>
            <p className="text-gray-700">Chi phí dịch vụ sẽ tùy thuộc vào loại dịch vụ và gói bạn lựa chọn. Vui lòng liên hệ với chúng tôi để nhận báo giá chi tiết phù hợp với nhu cầu của bạn.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium text-pink-500 mb-3">Thông tin của tôi có được bảo mật không?</h3>
            <p className="text-gray-700">Tại Love Haven, chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Mọi thông tin bạn cung cấp sẽ chỉ được sử dụng cho mục đích tư vấn và không được chia sẻ với bất kỳ bên thứ ba nào.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage