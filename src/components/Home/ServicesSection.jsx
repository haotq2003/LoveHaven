import React from 'react'
import { UserCircle, MessageCircle, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Tư vấn cá nhân',
      icon: <UserCircle size={32} className="text-[#2E8B57]" />,
      description: 'Giải quyết các vấn đề tâm lý cá nhân với chuyên gia hàng đầu.',
      link: '/services/personal'
    },
    {
      id: 2,
      title: 'Tư vấn trực tuyến',
      icon: <MessageCircle size={32} className="text-[#2E8B57]" />,
      description: 'Kết nối với chuyên gia tâm lý mọi lúc mọi nơi thông qua nền tảng trực tuyến.',
      link: '/services/online'
    },
    {
      id: 3,
      title: 'Đặt lịch hẹn',
      icon: <Calendar size={32} className="text-[#2E8B57]" />,
      description: 'Đặt lịch gặp trực tiếp hoặc online với chuyên gia tâm lý chỉ trong vài phút.',
      link: '/booking'
    },
  ]

  return (
    <section className="py-16 bg-[#98D4BB]/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center  mb-12">DỊCH VỤ CỦA CHÚNG TÔI</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#98D4BB]/30">
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#2E8B57]">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <Link 
                to={service.link} 
                className="text-[#2E8B57] font-medium flex items-center hover:text-[#1D6F42] transition-colors duration-300"
              >
                Tìm hiểu thêm <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
