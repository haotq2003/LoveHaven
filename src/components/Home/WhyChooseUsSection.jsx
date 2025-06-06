import React from 'react'

const benefits = [
  'Chuyên gia có chứng chỉ quốc tế',
  'Bảo mật tuyệt đối',
  'Đặt lịch linh hoạt theo thời gian bạn rảnh',
  'Nền tảng dễ sử dụng, tư vấn trực tuyến tiện lợi'
]

const WhyChooseUsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-[#ff6b6b]  font-bold text-center mb-12">
          VÌ SAO CHỌN LOVE HAVEN ?
        </h2>
        <ul className="grid md:grid-cols-2 gap-8 text-lg max-w-4xl mx-auto">
          {benefits.map((item, index) => (
            <li 
              key={index} 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#98D4BB]/30 flex items-start space-x-4"
            >
              <span className="text-[#F48BA1] flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhyChooseUsSection