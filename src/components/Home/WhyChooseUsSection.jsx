import React from 'react'

const benefits = [
  'Chuyên gia có chứng chỉ quốc tế',
  'Bảo mật tuyệt đối',
  'Đặt lịch linh hoạt theo thời gian bạn rảnh',
  'Nền tảng dễ sử dụng, tư vấn trực tuyến tiện lợi'
]

const WhyChooseUsSection = () => {
  return (
    <section className="bg-pink-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Vì sao chọn Love Haven?</h2>
        <ul className="grid md:grid-cols-2 gap-6 text-lg text-gray-700 max-w-4xl mx-auto">
          {benefits.map((item, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-sm">✅ {item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhyChooseUsSection