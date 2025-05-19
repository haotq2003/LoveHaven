import React from 'react'
import { Link } from 'react-router-dom'

const CallToActionSection = () => {
  return (
    <section className="bg-pink-200 text-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Sẵn sàng để bắt đầu hành trình chữa lành?</h2>
        <p className="mb-6 text-lg">Đặt lịch với chuyên gia của chúng tôi ngay hôm nay.</p>
        <Link to="/booking" className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-100">Đặt lịch ngay</Link>
      </div>
    </section>
  )
}

export default CallToActionSection