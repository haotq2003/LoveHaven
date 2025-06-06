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
     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {experts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#FFB6C1]/30 overflow-hidden group">
            <div className="h-64 bg-[#E6F7FF] relative">  {/* Thay đổi từ #FFE2E2 sang #E6F7FF (xanh dương nhạt) */}
              {/* Thay thế bằng hình ảnh thực tế */}
              <div className="absolute inset-0 flex items-center justify-center text-[#4A90E2] text-lg">  {/* Thay đổi từ #FF6B6B sang #4A90E2 */}
                Hình ảnh chuyên gia
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-black mb-1">{expert.name}</h3>
              <p className="text-[#6B7280] font-medium mb-4">{expert.role}</p>  {/* Thay đổi từ #FF8C94 sang #6B7280 (xám) */}
              <p className="text-gray-700 mb-6 leading-relaxed">{expert.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-black mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">  {/* Thay đổi từ #FFB6C1 sang #4A90E2 */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Chuyên môn:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expert.specialties.map((specialty, index) => (
                    <span key={index} className="bg-[#F0F7FF] text-[#4A90E2] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#D9ECFF] transition-all duration-300">  {/* Thay đổi từ #FFE2E2/#FF6B6B sang #F0F7FF/#4A90E2 */}
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <span className="text-[#9061F9]">  {/* Thay đổi từ #FF8C94 sang #9061F9 (tím) */}
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  </svg>
                </span>
                <strong className="text-black mr-2">Học vấn:</strong> 
                {expert.education}
              </div>
            </div>
            <div className="bg-[#F0FFF4] p-6 flex justify-between gap-4">  {/* Thay đổi từ #FFE2E2 sang #F0FFF4 (xanh lá nhạt) */}
              <button className="flex-1 bg-white text-[#2E8B57] border border-[#2E8B57] font-medium py-2.5 px-4 rounded-xl hover:bg-[#E6F7EE] transition-all duration-300">  {/* Thay đổi từ #FF6B6B sang #2E8B57 */}
                Xem hồ sơ
              </button>
              <button className="flex-1 bg-[#FF6B6B] text-white font-medium py-2.5 px-4 rounded-xl hover:bg-[#FF5252] transition-all duration-300">  {/* Giữ nguyên màu hồng */}
                Đặt lịch hẹn
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-20 bg-[#FFF0F5] rounded-2xl p-12 text-center">  {/* Thay đổi từ #FFE2E2 sang #FFF0F5 (hồng nhạt khác) */}
        <h2 className="text-3xl font-semibold text-black mb-6">
          Trở thành chuyên gia của Love Haven
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          Nếu bạn là chuyên gia trong lĩnh vực tâm lý, tư vấn tình cảm hoặc hôn nhân gia đình, hãy tham gia đội ngũ của chúng tôi để giúp đỡ nhiều người hơn nữa tìm thấy hạnh phúc.
        </p>
        <button className="bg-gradient-to-r from-[#FF6B6B] to-[#9061F9] hover:from-[#FF5252] hover:to-[#7C4DEF] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:scale-105">  {/* Thêm gradient từ hồng sang tím */}
          Ứng tuyển ngay
        </button>
      </section>
    </div>
  )
}

export default ExpertsPage