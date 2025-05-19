// FaqSection.jsx
import React from 'react'

const faqs = [
  {
    question: 'Tư vấn có bảo mật không?',
    answer: 'Chúng tôi cam kết bảo mật thông tin tuyệt đối cho khách hàng.'
  },
  {
    question: 'Làm sao để đặt lịch?',
    answer: 'Bạn có thể nhấn nút “Đặt lịch tư vấn” và chọn thời gian phù hợp.'
  },
]

const FaqSection = () => {
  return (
    <section className="bg-pink-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Câu hỏi thường gặp</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">❓ {faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection