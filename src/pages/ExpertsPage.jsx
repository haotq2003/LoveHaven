import React from 'react'

const ExpertsPage = () => {
  // Mảng chứa thông tin các chuyên gia
  const experts = [
    {
      id: 1,
      name: "TS. Nguyễn Văn An",
      role: "Chuyên gia Tâm lý học",
      image: "/experts/expert1.jpg", // Đường dẫn hình ảnh (cần thêm hình thực tế)
      description: "Tiến sĩ Tâm lý học với hơn 15 năm kinh nghiệm tư vấn các vấn đề tình cảm và hôn nhân.",
      specialties: ["Tâm lý tình yêu", "Xung đột cặp đôi", "Tư vấn tiền hôn nhân"],
      education: "Tiến sĩ Tâm lý học, Đại học Harvard"
    },
    {
      id: 2,
      name: "ThS. Trần Thị Bình",
      role: "Chuyên gia Quan hệ cá nhân",
      image: "/experts/expert2.jpg",
      description: "Chuyên gia hàng đầu về xây dựng và phát triển mối quan hệ cá nhân với phương pháp tiếp cận hiện đại.",
      specialties: ["Kỹ năng giao tiếp", "Xây dựng lòng tin", "Phát triển mối quan hệ"],
      education: "Thạc sĩ Tâm lý học Ứng dụng, Đại học Stanford"
    },
    {
      id: 3,
      name: "PGS.TS. Lê Minh Cường",
      role: "Chuyên gia Hôn nhân gia đình",
      image: "/experts/expert3.jpg",
      description: "Với hơn 20 năm nghiên cứu và giảng dạy về hôn nhân gia đình, PGS.TS Cường đã giúp hàng nghìn cặp đôi xây dựng hạnh phúc bền vững.",
      specialties: ["Tư vấn hôn nhân", "Giải quyết xung đột", "Nuôi dạy con cái"],
      education: "Phó Giáo sư Tâm lý học, Đại học Quốc gia Hà Nội"
    },
    {
      id: 4,
      name: "ThS. Phạm Hoàng Dung",
      role: "Chuyên gia Trị liệu tình cảm",
      image: "/experts/expert4.jpg",
      description: "Chuyên gia trị liệu tình cảm với phương pháp độc đáo kết hợp giữa tâm lý học phương Đông và phương Tây.",
      specialties: ["Chữa lành tổn thương", "Vượt qua chia tay", "Xây dựng tình yêu mới"],
      education: "Thạc sĩ Tâm lý Trị liệu, Đại học Melbourne"
    },
    {
      id: 5,
      name: "TS. Hoàng Thị Lan",
      role: "Chuyên gia Tâm lý giới tính",
      image: "/experts/expert5.jpg",
      description: "Tiến sĩ chuyên nghiên cứu về tâm lý giới tính và vai trò của nó trong các mối quan hệ tình cảm hiện đại.",
      specialties: ["Tâm lý giới tính", "Hòa hợp vợ chồng", "Giáo dục giới tính"],
      education: "Tiến sĩ Tâm lý học Giới tính, Đại học Columbia"
    },
    {
      id: 6,
      name: "ThS. Ngô Quang Minh",
      role: "Chuyên gia Kết nối đôi",
      image: "/experts/expert6.jpg",
      description: "Chuyên gia với hơn 10 năm kinh nghiệm trong lĩnh vực kết nối đôi và tổ chức sự kiện hẹn hò.",
      specialties: ["Phân tích tính cách", "Kết nối tương thích", "Tư vấn hẹn hò"],
      education: "Thạc sĩ Tâm lý học Xã hội, Đại học Sydney"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Đội Ngũ Chuyên Gia</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Gặp gỡ những chuyên gia hàng đầu của Love Haven - những người sẽ đồng hành cùng bạn trên hành trình tìm kiếm tình yêu đích thực
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {experts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gray-300 relative">
              {/* Thay thế bằng hình ảnh thực tế */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                Hình ảnh chuyên gia
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-pink-600 mb-1">{expert.name}</h3>
              <p className="text-pink-500 font-medium mb-3">{expert.role}</p>
              <p className="text-gray-700 mb-4">{expert.description}</p>
              
              <div className="mb-4">
                <h4 className="text-lg font-medium text-pink-500 mb-2">Chuyên môn:</h4>
                <div className="flex flex-wrap gap-2">
                  {expert.specialties.map((specialty, index) => (
                    <span key={index} className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-gray-700">
                <strong className="text-pink-500">Học vấn:</strong> {expert.education}
              </div>
            </div>
            <div className="bg-pink-50 p-4 flex justify-between">
              <button className="bg-white text-pink-500 border border-pink-500 font-medium py-2 px-4 rounded-md hover:bg-pink-50 transition-colors duration-300">
                Xem hồ sơ
              </button>
              <button className="bg-pink-500 text-white font-medium py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300">
                Đặt lịch hẹn
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-20 bg-pink-50 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6">Trở thành chuyên gia của Love Haven</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Nếu bạn là chuyên gia trong lĩnh vực tâm lý, tư vấn tình cảm hoặc hôn nhân gia đình, hãy tham gia đội ngũ của chúng tôi để giúp đỡ nhiều người hơn nữa tìm thấy hạnh phúc.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md">
          Ứng tuyển ngay
        </button>
      </section>
    </div>
  )
}

export default ExpertsPage