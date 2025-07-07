import React, { useEffect, useState } from 'react'
import { Clock, ChevronLeft, ChevronRight, Search, X, User, Phone, Mail, MapPin, Calendar, DollarSign } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { bookingService } from '../../services/booking.service'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { message } from 'antd'
import { formatCurrency } from '../../components/common/formatCurrency'

const Dashboard = () => {
  const { userEmail } = useAuth()
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')
  const [booking, setBooking] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo && userInfo.address) {
      const city = userInfo.address.split(',').pop().trim()
      fetchBookingsByCity(city)
    }
  }, [])
  
  const getUserInfo = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
  
    try {
      const decoded = jwtDecode(token)
      console.log('Decoded token:', decoded)
      return decoded
    } catch (error) {
      console.error('Lỗi giải mã token:', error)
      return null
    }
  }

  const fetchBookingsByCity = async (city) => {
    try {
      const res = await bookingService.getBookingByCity(city)
      console.log(res.data)
      setBooking(res.data)
  
    } catch (error) {
      console.log(error)
    }
  }

  const handleAcceptBooking = async (bookingId, consultantId) => {
    console.log('Accepting booking:', { bookingId, consultantId })
    if (!consultantId) {
      message.error('Vui lòng đăng nhập lại.')
      return
    }
    
    setLoading(true)
    try {
      const res = await bookingService.acceptBooking(bookingId, consultantId)
      console.log('Response:', res)
      message.success('Chấp nhận thành công')
      setShowModal(false)
      // Refresh booking list
      const userInfo = getUserInfo()
      if (userInfo && userInfo.address) {
        const city = userInfo.address.split(',').pop().trim()
        fetchBookingsByCity(city)
      }
    } catch (error) {
      console.error('Error accepting booking:', error.response?.data || error.message)
      message.error('Không thể chấp nhận lịch hẹn. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleShowDetails = (appointment) => {
    setSelectedBooking(appointment)
    setShowModal(true)
  }

  const handleAccept = () => {
    if (selectedBooking) {
      const user = getUserInfo()
      const consultantId = user?.consultantId
      handleAcceptBooking(selectedBooking.id, consultantId)
    }
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Chưa xác định'
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Mock data cho lịch hẹn sắp tới
  const upcomingAppointments = [
    {
      id: 1,
      title: 'Tư vấn tâm lý cá nhân',
      consultant: 'Chị Nguyễn Thị A',
      progress: 100,
      duration: '1 Hour',
      status: 'Đã xác nhận'
    },
    {
      id: 2,
      title: 'Hỗ trợ khủng hoảng tinh thần',
      consultant: 'Chị Nguyễn Thị A',
      progress: 100,
      duration: '2 Hour',
      status: 'Đã xác nhận'
    },
    {
      id: 3,
      title: 'Tư vấn tâm lý hôn nhân',
      consultant: 'Anh Nguyễn Văn B',
      progress: 100,
      duration: '1 Hour',
      status: 'Đã xác nhận'
    }
  ]

  // Mock data cho lịch hẹn mới
  const newAppointments = [
    {
      id: 4,
      title: 'Tư vấn tâm lý cặp đôi',
      progress: 75,
      daysLeft: 3,
      status: 'Chờ xác nhận'
    },
    {
      id: 5,
      title: 'Tư vấn tâm lý cặp đôi',
      progress: 85,
      daysLeft: 4,
      status: 'Chờ xác nhận'
    },
    {
      id: 6,
      title: 'Tư vấn tâm lý cặp đôi',
      progress: 65,
      daysLeft: 3,
      status: 'Chờ xác nhận'
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Công Việc</h1>
        </div>

        {/* Search bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort By:</span>
          <button className="px-4 py-2 border rounded-lg flex items-center space-x-2 bg-white">
            <span>Deadline</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lịch hẹn sắp tới</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booking.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <img 
                  src="/src/assets/anhtuvan.jpg" 
                  alt="Appointment" 
                  className="w-full h-40 object-cover rounded-lg mb-4" 
                />
                <h3 className="font-medium text-lg mb-1">{appointment.service?.name || 'Dịch vụ không xác định'}</h3>
                <p className="text-gray-500 text-sm mb-3">{appointment.customer?.name || 'Khách hàng'}</p>
                
                <div className="mb-3">
                  <p className="text-right text-sm font-medium text-green-500 mb-1">{appointment.status}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6B6B] h-2 rounded-full" 
                      style={{ width: `${appointment.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{appointment.service?.pricePerHour || 0}Đ</span>
                  </div>
                  <button 
                    onClick={() => handleShowDetails(appointment)} 
                    className="px-3 py-1 bg-[#FF6B6B] text-white rounded-md text-sm hover:bg-[#FF5252] transition-colors"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Appointments Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lịch hẹn mới</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <button className="p-1 rounded-full border hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <img 
                  src="/src/assets/tuvan2.jpg" 
                  alt="Appointment" 
                  className="w-full h-40 object-cover rounded-lg mb-4" 
                />
                <h3 className="font-medium text-lg mb-3">{appointment.title}</h3>
                
                <div className="mb-3">
                  <p className="text-right text-sm font-medium text-orange-500 mb-1">{appointment.status}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6B6B] h-2 rounded-full" 
                      style={{ width: `${appointment.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <span className="text-sm">Còn {appointment.daysLeft} ngày</span>
                  </div>
                  <button 
                    className="px-3 py-1 bg-[#FF6B6B] text-white rounded-md text-sm hover:bg-[#FF5252] transition-colors"
                    onClick={() => navigate(`/consultant/appointments/${appointment.id}`)}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Booking Details */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Chi tiết lịch hẹn</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Service Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-[#FF6B6B]">Thông tin dịch vụ</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Tên dịch vụ:</label>
                      <p className="text-gray-800 font-medium">{selectedBooking.service?.name || 'Không xác định'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Giá theo giờ:</label>
                      <div className="flex items-center">
                       
                        <p className="text-gray-800 font-medium">{formatCurrency(selectedBooking.service?.pricePerHour || 0)} </p>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Mô tả:</label>
                      <p className="text-gray-800">{selectedBooking.service?.description || 'Không có mô tả'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-[#FF6B6B]">Thông tin khách hàng</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Họ tên:</label>
                      <div className="flex items-center">
                        <User size={16} className="text-blue-500 mr-2" />
                        <p className="text-gray-800 font-medium">{selectedBooking.customer?.name || 'Không xác định'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại:</label>
                      <div className="flex items-center">
                        <Phone size={16} className="text-green-500 mr-2" />
                        <p className="text-gray-800">{selectedBooking.customer?.phone || 'Không xác định'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email:</label>
                      <div className="flex items-center">
                        <Mail size={16} className="text-red-500 mr-2" />
                        <p className="text-gray-800">{selectedBooking.customer?.email || 'Không xác định'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ:</label>
                      <div className="flex items-center">
                        <MapPin size={16} className="text-purple-500 mr-2" />
                        <p className="text-gray-800">{selectedBooking.customer?.address || 'Không xác định'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-[#FF6B6B]">Thông tin lịch hẹn</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Thời gian ưu tiên:</label>
                      <div className="flex items-center">
                        <Calendar size={16} className="text-orange-500 mr-2" />
                        <p className="text-gray-800 font-medium">{formatDateTime(selectedBooking.preferredTime)}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái:</label>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        selectedBooking.status === 'DEPOSITED' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : selectedBooking.status === 'ACCEPTED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedBooking.status === 'DEPOSITED' ? 'Đã đặt cọc' : selectedBooking.status}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ làm việc:</label>
                      <div className="flex items-center">
                        <MapPin size={16} className="text-blue-500 mr-2" />
                        <p className="text-gray-800">{`${selectedBooking.address || ''}, ${selectedBooking.city || ''}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {selectedBooking.status === 'DEPOSITED' && (
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={handleAccept}
                  disabled={loading}
                  className="px-6 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#FF5252] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang xử lý...' : 'Chấp nhận lịch hẹn'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard