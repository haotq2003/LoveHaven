import { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy token');
        }

        // Parse token để lấy accountId
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const customerId = tokenData.accountId;

        // Gọi API lấy lịch sử đặt lịch
        const response = await axios.get(`http://localhost:8080/appointment/get-by-customer-id?customerId=${customerId}`);
        setBookings(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt lịch</h1>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="font-semibold">Thông tin dịch vụ</h2>
                <p>Tên dịch vụ: {booking.service.name}</p>
                <p>Giá: {booking.service.pricePerHour.toLocaleString('vi-VN')} VNĐ/giờ</p>
                <p>Mô tả: {booking.service.description}</p>
              </div>
              <div>
                <h2 className="font-semibold">Thông tin cuộc hẹn</h2>
                <p>Địa chỉ: {booking.address}</p>
                <p>Thành phố: {booking.city}</p>
                <p>Thời gian: {new Date(booking.preferredTime).toLocaleString('vi-VN')}</p>
                <p>Trạng thái: {booking.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;