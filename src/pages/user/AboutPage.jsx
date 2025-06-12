import React from 'react'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
   
    

      {/* Giới thiệu chung */}
      <section className="mb-20">
        <div className=" ">
          <h2 className="text-3xl font-semibold text-black mb-8 text-center">VỀ CHÚNG TÔI</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
            Chúng tôi là tổ chức tư vấn tâm lý uy tín hàng đầu tại Việt Nam, với sứ mệnh đồng hành cùng bạn trong hành trình chữa lành và phát triển.
          </p>
        </div>
      </section>

      {/* Các mục dịch vụ */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-[#] p-4 rounded-lg overflow-hidden">
            <img  src="https://res.cloudinary.com/dturncvxv/image/upload/v1749478192/ChatGPT_Image_Jun_9_2025_09_09_29_PM_hol5c4.png" alt="Chúng tôi mang đến gì" className="rounded-lg w-full h-auto  object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-black mb-4">Chúng Tôi Mang Đến Gì Cho Bạn?</h2>
            <p className="text-gray-700 mb-6">
              Chúng tôi cung cấp các dịch vụ tư vấn tâm lý chuyên nghiệp, giúp bạn vượt qua khó khăn, tìm lại cân bằng và xây dựng cuộc sống hạnh phúc hơn. Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn.
            </p>
            <button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
              Tìm Hiểu Chúng Tôi
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-black mb-4">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-gray-700 mb-6">
              Chúng tôi cam kết mang đến các giải pháp tâm lý hiệu quả, giúp mọi người vượt qua khủng hoảng, phát triển bản thân và xây dựng các mối quan hệ lành mạnh. Chúng tôi tin rằng mỗi người đều xứng đáng có một cuộc sống hạnh phúc và ý nghĩa.
            </p>
            <button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
              Tìm Hiểu Thêm
            </button>
          </div>
          <div className="order-1 md:order-2 bg-[#] p-4 rounded-lg overflow-hidden">
            <img src="https://res.cloudinary.com/dturncvxv/image/upload/v1749478192/ChatGPT_Image_Jun_9_2025_09_09_29_PM_hol5c4.png" alt="Sứ mệnh của chúng tôi" className="rounded-lg w-full h-3/4  object-cover" />
          </div>
        </div>
      </section>

      {/* Các dịch vụ */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-[#] mb-10 text-center">DỊCH VỤ CHUYÊN GIA HÀNG ĐẦU</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <img src="https://res.cloudinary.com/dturncvxv/image/upload/v1749478793/OIP_m2xtsg.webp" alt="Dịch vụ" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">DỊCH VỤ CÁ NHÂN HÓA VÀ BẢO MẬT</h3>
            <p className="text-gray-700">
              Tất cả các buổi tư vấn đều được bảo mật tuyệt đối, đảm bảo quyền riêng tư của bạn được tôn trọng.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <img src="https://res.cloudinary.com/dturncvxv/image/upload/v1749479216/hotro_hknjfa.webp" alt="Dịch vụ" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">HỖ TRỢ TOÀN DIỆN</h3>
            <p className="text-gray-700">
              Chúng tôi cung cấp hỗ trợ toàn diện cho mọi vấn đề tâm lý, từ stress, lo âu đến các mối quan hệ.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <img src="https://res.cloudinary.com/dturncvxv/image/upload/v1749479216/chiphi_g6qcp0.jpg" alt="Dịch vụ" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">CHI PHÍ HỢP LÝ & MINH BẠCH</h3>
            <p className="text-gray-700">
              Chúng tôi cam kết mang đến dịch vụ chất lượng với chi phí hợp lý và minh bạch.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 px-8 bg-[#FFE2E2] rounded-3xl shadow-lg border border-[#FFB6C1]/20 mb-20">
        <h2 className="text-3xl font-semibold text-black mb-6">Chúng Tôi Có Thể Giúp Gì?</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Hãy để chúng tôi đồng hành cùng bạn vượt qua mọi khó khăn. Đội ngũ chuyên gia tâm lý của chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trên hành trình chữa lành và phát triển.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
            Liên Hệ Ngay
          </button>
          <button className="bg-white border border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FFE2E2] font-semibold py-3 px-8 rounded-full transition-colors duration-300">
            Tìm Hiểu Thêm
          </button>
        </div>
      </section>

      {/* Hình ảnh minh họa */}
      {/* <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FFE2E2] p-4 rounded-lg">
            <img src="https://res.cloudinary.com/dturncvxv/image/upload/v1749479216/doingu_d1wqgb.webp" alt="Đội ngũ chuyên gia" className="rounded-lg w-full h-auto" />
          </div>
          <div className="bg-[#FFE2E2] p-4 rounded-lg">
            <img src="https://res.cloudinary.com/dturncvxv/image/upload/v1749479217/vanphong_yudy8c.webp" alt="Văn phòng tư vấn" className="rounded-lg w-full h-auto" />
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default AboutPage