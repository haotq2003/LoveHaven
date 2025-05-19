import React from 'react'
import Thinh from '../../assets/thinhlike.jpg'
const experts = [
  { id: 1, name: 'TS. Trương Gia Thịnh', specialty: 'Trị liệu cá nhân', image: Thinh},
  { id: 2, name: 'ThS. Trương Gia Thịnh', specialty: 'Tư vấn gia đình', image: Thinh },
  { id: 3, name: 'BS. Trương Gia Thịnh', specialty: 'Tâm lý trẻ em', image: Thinh },
]

const PsychologistsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center  mb-12">Chuyên gia nổi bật</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {experts.map(expert => (
            <div key={expert.id} className="bg-pink-50 p-6 rounded-xl shadow text-center">
              <img src={expert.image} alt={expert.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-1">{expert.name}</h3>
              <p className="text-gray-600">{expert.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PsychologistsSection