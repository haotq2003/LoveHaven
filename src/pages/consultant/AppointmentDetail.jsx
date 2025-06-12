import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bookingService } from '../../services/booking.service'
import { jwtDecode } from 'jwt-decode'
import { message } from 'antd'

const AppointmentDetail = () => {
  const { id } = useParams()
  const [appointmentDetail, setAppointmentDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointmentDetail()
  }, [id])
  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      return decoded; // Trả về toàn bộ object
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return null;
    }
  };
  const fetchAppointmentDetail = async () => {
    try {
      
      const res = await bookingService.getBookingById(id)
      setAppointmentDetail(res.data.data)
      console.log(res.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error accepting booking:', error.response?.data || error.message);
      setLoading(false)
    }
  }
  const handleAcceptBooking = async (bookingId, consultantId) => {
    console.log('Accepting booking:', { bookingId, consultantId });
    if (!consultantId) {
      message.error('Vui lòng đăng nhập lại.');
      return;
    }
    try {
      const res = await bookingService.acceptBooking(bookingId, consultantId);
      console.log('Response:', res);
      message.success('Chấp nhận thành công');
     // Refresh bookings
    } catch (error) {
      console.error('Error accepting booking:', error.response?.data || error.message);
      message.error('Không thể chấp nhận lịch hẹn. Vui lòng thử lại.');
    }
  };
  if (loading) return <div>Loading...</div>
  if (!appointmentDetail) return <div>Không tìm thấy thông tin cuộc hẹn</div>

  const { appointment, acceptedAt } = appointmentDetail
  const customer = appointment?.customer
  const service = appointment?.service
  const status = appointment?.status

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Chi tiết công việc</h1>

          {/* Trạng thái & thời gian */}
          <div className="mb-6">
            <p><strong>Trạng thái:</strong> {status}</p>
            <p><strong>Được chấp nhận lúc:</strong> {new Date(acceptedAt).toLocaleString()}</p>
          </div>

          {/* Thông tin bệnh nhân */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin bệnh nhân</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-1">Tên</p>
                <p className="font-medium">{customer?.name || "Chưa có"}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Email</p>
                <p className="font-medium">{customer?.email}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số điện thoại</p>
                <p className="font-medium">{customer?.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa chỉ</p>
                <p className="font-medium">{customer?.address}</p>
              </div>
            </div>
          </div>

          {/* Thông tin dịch vụ */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin dịch vụ</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-1">Tên dịch vụ</p>
                <p className="font-medium">{service?.name}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Giá mỗi giờ</p>
                <p className="font-medium">{service?.pricePerHour} VND</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 mb-1">Mô tả</p>
                <p className="font-medium">{service?.description}</p>
              </div>
            </div>
          </div>

          {/* Thời gian mong muốn */}
          <div className="mb-6">
            <p><strong>Thời gian mong muốn:</strong> {new Date(appointment?.preferredTime).toLocaleString()}</p>
          </div>

          {/* Nút accept */}
          <div className="flex justify-end">
            <button 
              className="px-6 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#FF5252] transition-colors"
              onClick={() => {
  const user = getUserInfo();
  const consultantId = user?.consultantProfiles?.id;
  handleAcceptBooking(id, consultantId);
}}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetail
