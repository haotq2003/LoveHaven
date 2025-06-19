import { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy token');
        }

        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const customerId = tokenData.id;

        const response = await axios.get(
          `http://localhost:8080/appointment/get-by-customer-id?customerId=${customerId}`
        );
        console.log(response.data.data)
        setBookings(response.data.data);
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen bg-gradient-to-br from--50 to--50">
      <h1 className="text-4xl font-bold text-center text--700 mb-10">
        Lịch sử đặt lịch tư vấn
      </h1>

      <div className="space-y-8">
        {bookings?.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl shadow-xl bg-white border border-pink-100 p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-pink-600 mb-3">
                  🌸 Dịch vụ tư vấn
                </h2>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-pink-800">Tên dịch vụ:</span>{' '}
                  {booking.service.name}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-pink-800">Giá:</span>{' '}
                  {booking.service.pricePerHour.toLocaleString('vi-VN')} VNĐ/giờ
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-pink-800">Mô tả:</span>{' '}
                  {booking.service.description}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-pink-600 mb-3">
                  📅 Chi tiết cuộc hẹn
                </h2>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-pink-800">Địa chỉ:</span>{' '}
                  {booking.address}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-pink-800">Thành phố:</span>{' '}
                  {booking.city}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-pink-800">Thời gian:</span>{' '}
                  {new Date(booking.preferredTime).toLocaleString('vi-VN')}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-pink-800">Trạng thái:</span>{' '}
                  {booking.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
