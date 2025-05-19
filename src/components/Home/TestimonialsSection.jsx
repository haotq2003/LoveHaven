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
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Khách hàng nói gì về chúng tôi</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <div key={t.id} className="bg-pink-50 p-6 rounded-xl shadow">
              <p className="italic text-gray-700 mb-4">“{t.content}”</p>
              <p className="font-semibold text-pink-600">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection