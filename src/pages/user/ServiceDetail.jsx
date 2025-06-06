import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const ServiceDetail = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Dữ liệu mẫu cho dịch vụ tư vấn theo giờ
  const service = {
    id: 7,
    title: "Tư vấn tâm lý theo giờ",
    price: 100000,
    duration: 60, // phút
    description: "Dịch vụ tư vấn tâm lý trực tiếp 1-1 với chuyên gia tâm lý hàng đầu. Giải quyết các vấn đề tâm lý, tình cảm với chi phí hợp lý và linh hoạt theo thời gian.",
    longDescription: "Dịch vụ tư vấn tâm lý theo giờ của Love Haven cung cấp giải pháp tư vấn linh hoạt, phù hợp với nhu cầu và ngân sách của bạn. Với mức giá chỉ 100.000 đồng/giờ, bạn sẽ được tư vấn trực tiếp 1-1 với các chuyên gia tâm lý có trình độ chuyên môn cao và nhiều năm kinh nghiệm. Chúng tôi cam kết mang đến không gian riêng tư, an toàn để bạn có thể chia sẻ mọi vấn đề và nhận được lời khuyên, hướng dẫn phù hợp.",
    icon: "💬",
    features: [
      "Tư vấn 1-1 với chuyên gia", 
      "Chỉ 100.000đ/giờ", 
      "Linh hoạt thời gian", 
      "Bảo mật thông tin",
      "Không gian riêng tư",
      "Đặt lịch trực tuyến"
    ],
    benefits: [
      {
        title: "Tiết kiệm chi phí",
        description: "Chi phí hợp lý chỉ 100.000đ/giờ, phù hợp với mọi đối tượng"
      },
      {
        title: "Linh hoạt thời gian",
        description: "Đặt lịch theo thời gian phù hợp với bạn, kể cả buổi tối và cuối tuần"
      },
      {
        title: "Chuyên gia hàng đầu",
        description: "Đội ngũ chuyên gia tâm lý được đào tạo bài bản, có chứng chỉ hành nghề"
      },
      {
        title: "Bảo mật tuyệt đối",
        description: "Thông tin cá nhân và nội dung tư vấn được bảo mật 100%"
      }
    ],
    process: [
      {
        step: 1,
        title: "Đăng ký tư vấn",
        description: "Điền thông tin và chọn thời gian phù hợp"
      },
      {
        step: 2,
        title: "Xác nhận lịch hẹn",
        description: "Nhận email xác nhận và hướng dẫn chuẩn bị"
      },
      {
        step: 3,
        title: "Tham gia buổi tư vấn",
        description: "Gặp gỡ chuyên gia tại địa điểm đã chọn hoặc trực tuyến"
      },
      {
        step: 4,
        title: "Nhận kết quả tư vấn",
        description: "Nhận báo cáo và kế hoạch hành động sau buổi tư vấn"
      }
    ],
    faqs: [
      {
        question: "Tôi có thể hủy hoặc đổi lịch hẹn không?",
        answer: "Bạn có thể hủy hoặc đổi lịch hẹn trước 24 giờ mà không mất phí. Nếu hủy trong vòng 24 giờ, bạn sẽ bị tính 50% phí dịch vụ."
      },
      {
        question: "Làm thế nào để chọn chuyên gia phù hợp?",
        answer: "Hệ thống sẽ gợi ý chuyên gia phù hợp dựa trên vấn đề của bạn, hoặc bạn có thể chọn chuyên gia theo hồ sơ và đánh giá từ người dùng khác."
      },
      {
        question: "Tôi có thể đặt nhiều giờ tư vấn cùng lúc không?",
        answer: "Có, bạn có thể đặt từ 1-3 giờ tư vấn liên tiếp trong một buổi, tùy thuộc vào lịch trống của chuyên gia."
      },
      {
        question: "Phương thức thanh toán nào được chấp nhận?",
        answer: "Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay) và tiền mặt tại buổi tư vấn."
      }
    ]
  };

  // State cho form đặt lịch
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: 1, // Số giờ
    location: '',
    issue: '',
    preferredExpert: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!bookingData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(bookingData.email)) newErrors.email = 'Email không hợp lệ';
    if (!bookingData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10,11}$/.test(bookingData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!bookingData.date) newErrors.date = 'Vui lòng chọn ngày';
    if (!bookingData.time) newErrors.time = 'Vui lòng chọn giờ';
    if (!bookingData.location) newErrors.location = 'Vui lòng chọn địa điểm';
    if (!bookingData.issue.trim()) newErrors.issue = 'Vui lòng mô tả vấn đề của bạn';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Tính tổng tiền
      const totalPrice = service.price * bookingData.duration;
      
      // Xử lý đặt lịch tư vấn
      console.log('Booking data:', bookingData);
      console.log('Total price:', totalPrice);
      
      // Hiển thị thông báo thành công
      alert(`Đặt lịch tư vấn thành công! Tổng chi phí: ${totalPrice.toLocaleString()}đ`);
      
      // Reset form
      setBookingData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        duration: 1,
        location: '',
        issue: '',
        preferredExpert: ''
      });
      
      // Ẩn form
      setShowBookingForm(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      
      {/* <div className="bg-[#] rounded-3xl p-8 mb-12 text-center">
        <div className="text-5xl mb-6 text-[#FF6B6B]">{service.icon}</div>
        <h1 className="text-4xl font-bold text-[#FF6B6B] mb-4">{service.title}</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">{service.description}</p>
        <div className="mt-8 inline-block bg-white px-6 py-3 rounded-xl shadow-sm">
          <span className="text-2xl font-bold text-[#FF6B6B]">{service.price.toLocaleString()}đ</span>
          <span className="text-gray-600"> / {service.duration} phút</span>
        </div>
      </div> */}
      
      {/* Phần mô tả chi tiết */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-[#] mb-6">Giới thiệu dịch vụ</h2>
        <p className="text-gray-700 leading-relaxed mb-8">{service.longDescription}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 border border-[#FFB6C1]/30">
            <h3 className="text-2xl font-semibold text-[#FF6B6B] mb-4">Đặc điểm nổi bật</h3>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-[#FF6B6B] mr-3">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#FFF5F5] rounded-2xl shadow-sm p-8 border border-[#FFB6C1]/30">
            <h3 className="text-2xl font-semibold text-[#FF6B6B] mb-4">Ai nên sử dụng dịch vụ này?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#FF6B6B] mr-3 mt-1">•</span>
                <span className="text-gray-700">Người đang gặp khó khăn trong các mối quan hệ</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B6B] mr-3 mt-1">•</span>
                <span className="text-gray-700">Người cần tư vấn về vấn đề tình cảm, hôn nhân</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B6B] mr-3 mt-1">•</span>
                <span className="text-gray-700">Người muốn cải thiện kỹ năng giao tiếp, xây dựng mối quan hệ</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B6B] mr-3 mt-1">•</span>
                <span className="text-gray-700">Người cần hỗ trợ tâm lý trong thời gian ngắn với chi phí hợp lý</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Phần lợi ích */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-[#] mb-8">Lợi ích khi sử dụng dịch vụ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-[#FFB6C1]/20 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Phần quy trình */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-[#] mb-8">Quy trình tư vấn</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div key={step.step} className="bg-white rounded-xl shadow-sm p-6 border border-[#FFB6C1]/20 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-bold text-xl">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2 mt-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Phần câu hỏi thường gặp */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-[#FF6B6B] mb-8">Câu hỏi thường gặp</h2>
        <div className="space-y-4">
          {service.faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-[#FFB6C1]/20">
              <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Phần đăng ký tư vấn */}
      <div className="bg-[#] rounded-3xl p-8 mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[#] mb-4">Đăng ký tư vấn ngay</h2>
        
        <button
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-300 shadow-md"
        >
          {showBookingForm ? 'Ẩn form đăng ký' : 'Đăng ký tư vấn'}
        </button>
      </div>
      
      {/* Form đăng ký tư vấn */}
      {showBookingForm && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#FFB6C1]/30 mb-16">
          <h2 className="text-2xl font-semibold text-[#FF6B6B] mb-6">Đăng ký buổi tư vấn</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin cá nhân */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#FF6B6B] mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={bookingData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-300' : 'border-[#FFB6C1]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#FF6B6B] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-300' : 'border-[#FFB6C1]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#FF6B6B] mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-300' : 'border-[#FFB6C1]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              
              {/* Thông tin lịch hẹn */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-[#FF6B6B] mb-1">
                  Ngày hẹn
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border ${errors.date ? 'border-red-300' : 'border-[#FFB6C1]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-[#FF6B6B] mb-1">
                  Giờ hẹn
                </label>
                <select
                  id="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.time ? 'border-red-300' : 'border-[#FFB6C1]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]`}
                >
                  <option value="">Chọn giờ hẹn</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
              </div>
              
             
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[#FF6B6B] mb-1">
                  Hình thức tư vấn
                </label>
                <select
                  id="location"
                  name="location"
                  value={bookingData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.location ? 'border-red-300' : 'border-[#FFB6C1]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]`}
                >
                  <option value="">Chọn hình thức tư vấn</option>
                  <option value="online">Trực tuyến (Zoom/Google Meet)</option>
                  <option value="office">Tại văn phòng Love Haven</option>
                  <option value="home">Tại nhà (phí di chuyển thêm 50.000đ)</option>
                </select>
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
              
              
            </div>
            
            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-[#FF6B6B] mb-1">
                Mô tả vấn đề của bạn
              </label>
              <textarea
                id="issue"
                name="issue"
                rows="4"
                value={bookingData.issue}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.issue ? 'border-red-300' : 'border-[#FFB6C1]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]`}
                placeholder="Mô tả ngắn gọn vấn đề bạn đang gặp phải để chúng tôi chuẩn bị tốt nhất cho buổi tư vấn..."
              ></textarea>
              {errors.issue && <p className="mt-1 text-sm text-red-600">{errors.issue}</p>}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="px-6 py-3 border border-[#FFB6C1] text-[#FF6B6B] rounded-lg hover:bg-[#FFF5F5] transition-colors duration-300"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-lg transition-colors duration-300 shadow-sm"
              >
                Đặt lịch tư vấn
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ServiceDetail