import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const { bookingData, bookingId, amount } = location.state || {};

  if (!bookingData) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-500">Không tìm thấy thông tin thanh toán.</h2>
        <Link to="/" className="text-blue-500 underline mt-4 block">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
      <p className="text-lg mb-6">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>

      <div className="text-left space-y-2 text-gray-700">
        <p><strong>Mã lịch hẹn:</strong> {bookingId}</p>
        <p><strong>Thành phố:</strong> {bookingData.city}</p>
        <p><strong>Quận/Huyện:</strong> {bookingData.address}</p>
        <p><strong>Thời gian:</strong> {bookingData.date} lúc {bookingData.time}</p>
        <p><strong>Chi phí:</strong> {amount.toLocaleString()} VNĐ</p>
      </div>

      <Link to="/" className="mt-6 inline-block px-6 py-3 bg-[#FF6B6B] text-white rounded-lg shadow hover:bg-[#FF5252] transition">
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default PaymentSuccess;
