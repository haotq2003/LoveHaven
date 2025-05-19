import React from 'react'

const ServicesPage = () => {
  // Mảng chứa thông tin các dịch vụ
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
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Dịch Vụ Của Chúng Tôi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Love Haven cung cấp đa dạng dịch vụ chuyên nghiệp giúp bạn tìm kiếm và xây dựng mối quan hệ hạnh phúc
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="text-4xl mb-4 text-pink-500">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-medium text-pink-500 mb-2">Đặc điểm nổi bật:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-pink-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-pink-50 p-4">
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6">Bạn cần hỗ trợ?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Đội ngũ tư vấn viên của chúng tôi luôn sẵn sàng giúp bạn lựa chọn dịch vụ phù hợp nhất với nhu cầu của bạn.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md">
          Liên hệ ngay
        </button>
      </section>
    </div>
  )
}

export default ServicesPage