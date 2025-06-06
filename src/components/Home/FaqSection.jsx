import React, { useState } from 'react'

const faqs = [
  {
    question: 'Tư vấn có bảo mật không?',
    answer: 'Chúng tôi cam kết bảo mật thông tin tuyệt đối cho khách hàng.'
  },
  {
    question: 'Làm sao để đặt lịch?',
    answer: 'Bạn có thể nhấn nút "Đặt lịch tư vấn" và chọn thời gian phù hợp.'
  },
]

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-[#FF6B6B] font-bold text-center  mb-12">CÂU HỎI THƯỜNG GẶP</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#98D4BB]/30 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 flex justify-between items-center"
              >
                <h3 className="font-semibold text-lg  flex items-center">
                  <span className="text-[#FF5252] mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                  </span>
                  {faq.question}
                </h3>
                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-[#2E8B57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div className={`px-6 pb-6 transition-all duration-300 ${openIndex === index ? 'block' : 'hidden'}`}>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection