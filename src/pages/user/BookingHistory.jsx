import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
  import { Modal, Input, message } from 'antd';
import { FeedBackService } from '../../services/feedback.service';
const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
const [feedbackContent, setFeedbackContent] = useState('');
const [selectedBooking, setSelectedBooking] = useState(null);
  const [relatedServices, setRelatedServices] = useState([
    {
      id: 1,
      title: 'CÁCH XÂY DỰNG',
      image: '/src/assets/tuvan2.jpg',
      category: 'EVERY DAY',
      duration: '30 phút',
      description: 'CÁCH XÂY DỰNG MỐI QUAN HỆ GẮN KẾT VỚI CON CÁI'
    },
    {
      id: 2,
      title: 'HỖ TRỢ GIA ĐÌNH',
      image: '/src/assets/tuvan3.jpg',
      category: 'MONDAY',
      duration: '60 phút',
      description: 'HỖ TRỢ GIA ĐÌNH QUA GIAI ĐOẠN KHỦNG HOẢNG, HÒA HỢP'
    },
    {
      id: 3,
      title: 'Cách Cải Thiện Mối Quan Hệ',
      image: '/src/assets/anhtuvan.jpg',
      category: 'TO BE DECIDED',
      duration: '60 phút',
      description: 'Cải thiện mối quan hệ'
    },
    {
      id: 4,
      title: 'LÀM THẾ NÀO ĐỂ GIAO T',
      image: '/src/assets/thinhlike.jpg',
      category: 'TO BE DECIDED',
      duration: '60 phút',
      description: 'LÀM THẾ NÀO ĐỂ GIAO TIẾP HIỆU QUẢ TRONG HÔN NHÂN'
    }
  ]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy token');
        }

        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const customerId = tokenData.id;

        const response = await bookingService.getBookingByCusId(customerId);
       console.log(response.data)
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="text-center text-lg text-pink-500 py-12 font-medium">
        Đang tải...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-lg text-red-500 py-12 font-medium">
        Lỗi: {error}
      </div>
    );
const handleReview = (booking) => {
  setSelectedBooking(booking);
  setFeedbackContent('');
  setFeedbackModalVisible(true);
};
const handleSubmitFeedback = async () => {
  if (!feedbackContent.trim()) {
    message.warning('Vui lòng nhập nội dung đánh giá');
    return;
  }

  try {
    await FeedBackService.createFeedBack({
      content: feedbackContent,
      customerId: selectedBooking.customer.id,
      consultantId: selectedBooking.appointmentAssignment
.consultant.id
    });

    message.success('Đánh giá đã được gửi!');
    setFeedbackModalVisible(false);
  } catch (error) {
    console.error(error);
    message.error('Gửi đánh giá thất bại');
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Lịch sử</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Dịch vụ</th>
              <th className="text-left py-4">Phương thức</th>
              <th className="text-left py-4">Giá</th>
              <th className="text-left py-4">Trạng Thái</th>
                  <th className="text-left py-4">Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.service.image || '/src/assets/tuvan2.jpg'}
                      alt={booking.service.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{booking.service.name}</h3>
                      <div className="text-sm text-gray-500">
                        {new Date(booking.preferredTime).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(booking.preferredTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                   
                    {booking.paymentMethod || 'VNPay'}
                  </div>
                </td>
                <td className="py-4">
                  {booking.service.pricePerHour.toLocaleString('vi-VN')} VNĐ
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${booking.status === 'Ended' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {booking.status}
                  </span>

               
                </td>
                <td>
                     {booking.status === 'PAID' && (
                    <div className="mt-2">
                      <button
                        onClick={() => handleReview(booking)}
                        className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                      >
                        Đánh giá
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<Modal
  title="Đánh giá tư vấn viên"
  visible={feedbackModalVisible}
  onCancel={() => setFeedbackModalVisible(false)}
  onOk={handleSubmitFeedback}
  okText="Gửi"
  cancelText="Hủy"
>
  <Input.TextArea
    rows={4}
    value={feedbackContent}
    onChange={(e) => setFeedbackContent(e.target.value)}
    placeholder="Nhập nội dung đánh giá..."
  />
</Modal>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Các dịch vụ liên quan</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="sr-only">Lùi về</span>
              ←
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="sr-only">Tiếp Theo</span>
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedServices.map((service) => (
            <div key={service.id} className="group relative">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">
                    {service.category}
                  </span>
                  <span>⏱ {service.duration}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                <Link
                  to="#"
                  className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
