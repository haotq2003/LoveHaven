import React from 'react'
import { Link } from 'react-router-dom'

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Tư vấn tình cảm",
      description: "Đội ngũ chuyên gia tâm lý giàu kinh nghiệm sẽ giúp bạn giải quyết các vấn đề tình cảm, xây dựng mối quan hệ lành mạnh.",
      icon: "❤️",
      features: ["Tư vấn 1-1", "Phân tích tâm lý", "Giải pháp thực tế"]
    },
    {
      id: 2,
      title: "Kết nối đôi",
      description: "Dịch vụ kết nối những người có cùng sở thích, quan điểm sống và mục tiêu tương lai dựa trên thuật toán thông minh.",
      icon: "🔄",
      features: ["Hồ sơ được xác minh", "Kết nối chất lượng", "Bảo mật thông tin"]
    },
    {
      id: 3,
      title: "Hẹn hò an toàn",
      description: "Tổ chức các buổi hẹn hò an toàn, chuyên nghiệp tại những địa điểm được lựa chọn kỹ lưỡng.",
      icon: "🌹",
      features: ["Địa điểm sang trọng", "Không khí riêng tư", "Hỗ trợ 24/7"]
    },
    {
      id: 4,
      title: "Khóa học tình yêu",
      description: "Các khóa học trực tuyến và offline giúp nâng cao kỹ năng giao tiếp, thấu hiểu đối phương và xây dựng mối quan hệ bền vững.",
      icon: "📚",
      features: ["Giảng viên chuyên môn", "Tài liệu chất lượng", "Chứng chỉ hoàn thành"]
    },
    {
      id: 5,
      title: "Tổ chức sự kiện",
      description: "Tổ chức các sự kiện gặp gỡ, giao lưu cho những người độc thân muốn mở rộng mối quan hệ trong môi trường lành mạnh.",
      icon: "🎉",
      features: ["Không gian thoải mái", "Hoạt động thú vị", "Kết nối đa dạng"]
    },
    {
      id: 6,
      title: "Tư vấn hôn nhân",
      description: "Dịch vụ tư vấn cho các cặp đôi đang chuẩn bị kết hôn hoặc đã kết hôn nhằm xây dựng hôn nhân hạnh phúc, bền vững.",
      icon: "💍",
      features: ["Chuyên gia hôn nhân", "Giải quyết xung đột", "Kế hoạch tương lai"]
    },
    {
      id: 7,
      title: "Tư vấn tâm lý theo giờ",
      description: "Dịch vụ tư vấn tâm lý trực tiếp 1-1 với chuyên gia tâm lý hàng đầu. Chỉ 100.000đ/giờ, linh hoạt thời gian và địa điểm.",
      icon: "💬",
      features: ["100.000đ/giờ", "Linh hoạt thời gian", "Chuyên gia hàng đầu"],
      price: 100000,
      highlight: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Tiêu đề trang */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#111] mb-4">Dịch vụ của chúng tôi</h1>
        <p className="text-lg text-[#555] max-w-3xl mx-auto">
          Love Haven cung cấp đa dạng dịch vụ tư vấn tâm lý và hỗ trợ tình cảm, giúp bạn xây dựng mối quan hệ hạnh phúc và bền vững
        </p>
      </div>

      {/* Danh sách dịch vụ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className={`bg-[#FFF5F7] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border 
              ${service.highlight ? 'border-[#FF6B6B]/50 ring-2 ring-[#FF6B6B]/20' : 'border-[#FADADD]/30'} 
              flex flex-col h-full`}
          >
            <div className="p-8 flex-grow">
              <div className="text-4xl mb-6 text-[#FF6B6B]">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-[#111] mb-3">{service.title}</h3>
              
              {service.price && (
                <div className="mb-4 inline-block bg-[#FFE4E6] px-4 py-2 rounded-lg">
                  <span className="text-xl font-bold text-[#FF6B6B]">{service.price.toLocaleString()}đ</span>
                  <span className="text-[#666]"> / giờ</span>
                </div>
              )}

              <p className="text-[#555] mb-6 leading-relaxed">{service.description}</p>

              <div className="border-t border-[#FADADD]/30 pt-6">
                <h4 className="text-lg font-medium text-[#111] mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#FFB6C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Đặc điểm nổi bật
                </h4>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-[#FFB6C1] mr-3">•</span>
                      <span className="text-[#555]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6 mt-auto">
              <Link 
                to={`/services/${service.id}`} 
                className="block w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 text-center"
              >
                {service.highlight ? 'Đăng ký ngay' : 'Tìm hiểu thêm'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Section gọi hành động */}
      <section className="mt-20 text-center py-12 px-8 bg-[#FFE2E2] rounded-3xl shadow-lg border border-[#FFB6C1]/20">
        <h2 className="text-3xl font-semibold text-[#111] mb-6">Bạn cần hỗ trợ?</h2>
        <p className="text-lg text-[#555] max-w-3xl mx-auto mb-8">
          Đội ngũ tư vấn viên của chúng tôi luôn sẵn sàng giúp bạn lựa chọn dịch vụ phù hợp nhất với nhu cầu của bạn.
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-300 shadow-md"
        >
          Liên hệ ngay
        </Link>
      </section>
    </div>
  )
}

export default ServicesPage
