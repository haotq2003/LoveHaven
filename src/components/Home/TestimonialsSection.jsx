const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Mai',
    content: 'Tôi cảm thấy nhẹ nhõm hơn sau khi chia sẻ cùng chuyên gia. Cảm ơn Love Haven rất nhiều!',
  },
  {
    id: 2,
    name: 'Lê Tuấn',
    content: 'Chuyên gia rất lắng nghe và đưa ra lời khuyên đúng lúc. Tôi sẽ quay lại!',
  },
]

const TestimonialsSection = () => {
  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl  text-[#FF6B6B] font-bold text-center  mb-12">
        KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <div 
              key={t.id} 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#98D4BB]/30"
            >
              <div className="flex flex-col">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">"{t.content}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-[#FF6B6B]">- {t.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection