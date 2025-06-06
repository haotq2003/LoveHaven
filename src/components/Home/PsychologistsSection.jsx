import React from 'react'
import Thinh from '../../assets/thinhlike.jpg'
const experts = [
  { id: 1, name: 'TS. Trương Gia Thịnh', specialty: 'Trị liệu cá nhân', image: Thinh},
  { id: 2, name: 'ThS. Trương Gia Thịnh', specialty: 'Tư vấn gia đình', image: Thinh },
  { id: 3, name: 'BS. Trương Gia Thịnh', specialty: 'Tâm lý trẻ em', image: Thinh },
]

const PsychologistsSection = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-[#FF6B6B] font-bold text-center  mb-12">CHUYÊN GIA NỔI BẬT</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {experts.map(expert => (
            <div 
              key={expert.id} 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#ff5252]/30 group"
            >
              <div className="relative mb-6">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-[#ff5252]/20 group-hover:border-[#ff5252]/40 transition-all duration-300" 
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#f06666] text-white px-4 py-1 rounded-full text-sm">
                  Chuyên gia
                </div>
              </div>
              <h3 className="text-xl text-center font-semibold mb-2  group-hover:text-[#1D6F42] transition-colors duration-300">
                {expert.name}
              </h3>
              <p className="text-gray-600 font-medium text-center ">{expert.specialty}</p>
              <button className="mt-6 w-32 mx-auto block  bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-medium py-2 px-4 rounded-full transition-colors duration-300">
                Xem hồ sơ
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PsychologistsSection