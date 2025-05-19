import React from 'react'
import { UserCircle, MessageCircle, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Tư vấn cá nhân',
      icon: <UserCircle size={32} className="text-pink-500" />,
      description: 'Giải quyết các vấn đề tâm lý cá nhân với chuyên gia hàng đầu.',
      link: '/services/personal'
    },
    {
      id: 2,
      title: 'Tư vấn trực tuyến',
      icon: <MessageCircle size={32} className="text-pink-500" />,
      description: 'Kết nối với chuyên gia tâm lý mọi lúc mọi nơi thông qua nền tảng trực tuyến.',
      link: '/services/online'
    },
    {
      id: 3,
      title: 'Đặt lịch hẹn',
      icon: <Calendar size={32} className="text-pink-500" />,
      description: 'Đặt lịch gặp trực tiếp hoặc online với chuyên gia tâm lý chỉ trong vài phút.',
      link: '/booking'
    },
  ]

  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center  mb-12">Dịch vụ của chúng tôi</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link to={service.link} className="text-pink-600 font-medium flex items-center">
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
