import React from 'react'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section với gradient background */}
      <section className="text-center mb-20 py-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl shadow-lg">
        <h1 className="text-5xl font-bold text-pink-600 mb-6">Về Love Haven</h1>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto">Tạo nên những kết nối ý nghĩa thông qua tình yêu và sự thấu hiểu</p>
      </section>

      {/* Mission Section với card design */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold text-pink-500 mb-8 text-center">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
            Tại Love Haven, chúng tôi tin vào sức mạnh của những kết nối chân thành. Nền tảng của chúng tôi được thiết kế để giúp mọi người tìm thấy những mối quan hệ ý nghĩa trong một môi trường an toàn, tôn trọng và chân thật.
          </p>
        </div>
      </section>

      {/* Values Section với card design cải tiến */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-pink-500 mb-10 text-center">Giá Trị Cốt Lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-pink-400">
            <div className="text-pink-500 text-4xl mb-4">❤️</div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-4">Tính Xác Thực</h3>
            <p className="text-gray-700 text-lg">Chúng tôi khuyến khích các kết nối chân thành và giao tiếp trung thực giữa tất cả thành viên.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-pink-400">
            <div className="text-pink-500 text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-4">An Toàn</h3>
            <p className="text-gray-700 text-lg">Sự bảo mật và quyền riêng tư của bạn là ưu tiên hàng đầu trong mọi hoạt động của chúng tôi.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-pink-400">
            <div className="text-pink-500 text-4xl mb-4">🤝</div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-4">Tôn Trọng</h3>
            <p className="text-gray-700 text-lg">Chúng tôi nuôi dưỡng một môi trường tôn trọng lẫn nhau và thấu hiểu cho tất cả người dùng.</p>
          </div>
        </div>
      </section>

      {/* Team Section với thiết kế card cải tiến */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-pink-500 mb-10 text-center">Đội Ngũ Của Chúng Tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden border-4 border-pink-200"></div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">Nguyễn Văn An</h3>
            <p className="text-gray-600 mb-4">Nhà Sáng Lập & CEO</p>
            <p className="text-gray-700">Đam mê kết nối mọi người và tạo nên những mối quan hệ ý nghĩa.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden border-4 border-pink-200"></div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">Trần Thị Bình</h3>
            <p className="text-gray-600 mb-4">Giám Đốc Sản Phẩm</p>
            <p className="text-gray-700">Chuyên gia trong việc tạo ra trải nghiệm người dùng trực quan và hấp dẫn.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden border-4 border-pink-200"></div>
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">Lê Minh Cường</h3>
            <p className="text-gray-600 mb-4">Trưởng Nhóm Phát Triển</p>
            <p className="text-gray-700">Xây dựng những giải pháp sáng tạo để giúp mọi người tìm thấy tình yêu.</p>
          </div>
        </div>
      </section>

      {/* Contact Section với thiết kế cải tiến */}
      <section className="text-center py-12 px-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-semibold text-pink-500 mb-6">Liên Hệ Với Chúng Tôi</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">Bạn có thắc mắc hoặc muốn tìm hiểu thêm về dịch vụ của chúng tôi? Chúng tôi rất mong được nghe từ bạn!</p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md transform hover:scale-105">
          Liên Hệ Ngay
        </button>
      </section>
    </div>
  )
}

export default AboutPage