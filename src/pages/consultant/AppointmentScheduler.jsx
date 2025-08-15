import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, Search, Eye, Edit, Trash2, X } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { bookingService } from '../../services/booking.service';
import axios from 'axios';
import { message } from 'antd';
import { Modal, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { walletService } from '../../services/wallet.service';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [appointments, setAppointments] = useState([]);
  const [showExamModal, setShowExamModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [examStartTime, setExamStartTime] = useState('');
  const [examEndTime, setExamEndTime] = useState('');
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [examStartedAt, setExamStartedAt] = useState(null);
  const [manualStartTime, setManualStartTime] = useState(null);
const [manualEndTime, setManualEndTime] = useState(null);


  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    TAKEN: 'bg-indigo-100 text-indigo-800'
  };

  const statusLabels = {
    confirmed: 'Đã xác nhận',
    pending: 'Chờ xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
    TAKEN: 'Đã đặt lịch'
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const user = getUserInfo();
      const consultantId = user?.consultantId;
      const res = await bookingService.getBookingByConsultant(consultantId);
      console.log(res.data.data)
      setAppointments(res.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return null;
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const name = appointment.customer?.name || '';
    const consultantName = appointment.consultant?.account?.fullName || '';
    const appointmentDate = appointment.preferredTime?.split('T')[0];
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = viewMode === 'calendar' ? true : appointmentDate === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

 const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false // Định dạng 24h, đổi thành true nếu muốn 12h (AM/PM)
  });
};
  





  const handleOpenExamModal = (appointment) => {
    
    setCurrentAppointment(appointment);
    setShowExamModal(true);
  };

  const handleCloseExamModal = () => {
    if (!isExamStarted || window.confirm('Bạn có chắc muốn hủy phiên khám hiện tại?')) {
      setShowExamModal(false);
      setCurrentAppointment(null);
      setIsExamStarted(false);
      setExamStartTime('');
      setExamEndTime('');
      setExamStartedAt(null);
    }
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{appointment.customer?.name}</h3>
            <p className="text-sm text-gray-600">{appointment.service?.description || '---'}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
          {statusLabels[appointment.status] || appointment.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">
            {appointment.preferredTime?.split('T')[0]}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">
            {formatTime(appointment.preferredTime)} 
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{appointment.customer?.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{appointment.city}, {appointment.address}</span>
        </div>
      </div>

      {appointment.notes && (
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <p className="text-sm text-gray-700"><strong>Ghi chú:</strong> {appointment.notes}</p>
        </div>
      )}

      <div className="flex space-x-2">
        
    <button 
  onClick={() => handleOpenExamModal(appointment)}
  disabled={appointment.status === 'PAID' ||  appointment.status === 'COMPLETED'}

  className={`flex items-center space-x-1 px-3 py-1 text-white rounded-md transition-colors text-sm 
    ${appointment.status === 'PAID' || appointment.status === 'COMPLETED' ? 'bg-red-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}

>
  <Edit className="w-4 h-4" />
  <span>Khám</span>
</button>

        {/* <button className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm">
          <Trash2 className="w-4 h-4" />
          <span>Hủy</span>
        </button> */}
      </div>
    </div>
  );

 
const handleConfirmExam = async () => {
  if (!manualStartTime || !manualEndTime) {
    message.warning('Vui lòng chọn đầy đủ thời gian bắt đầu và kết thúc');
    return;
  }

  try {
    const date = currentAppointment?.preferredTime?.split('T')[0];
    const startTimeStr = `${date}T${manualStartTime.format('HH:mm')}:00`;
    const endTimeStr = `${date}T${manualEndTime.format('HH:mm')}:00`;

    await bookingService.bookingUpdateTime(
  currentAppointment.appointmentAssignment.id,
  startTimeStr,
  endTimeStr
);


    message.success('Đã cập nhật thời gian khám thành công!');

    // // Trừ tiền từ ví
    // try {
    // await walletService.payBooking(currentAppointment.id);
    //   //  await bookingService.updateStatusBooking(currentAppointment.id, 'COMPLETED');
    //     message.success('Thanh toán thành công!');
    //     fetchBooking(); // reload lại danh sách
      
    // } catch (error) {
    //   console.error(error);
    //   message.error('Đã xảy ra lỗi khi thanh toán ');
    // }
  } catch (error) {
    console.error(error);
    message.error('Có lỗi xảy ra khi cập nhật thời gian khám!');
  } finally {
    handleCloseExamModal();
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from to">
      <div className="container mx-auto px-4 py-8">
        {/* Bộ lọc */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
                <option value="TAKEN">Đã đặt lịch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tên bệnh nhân hoặc chuyên gia"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hiển thị</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Danh sách
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Lịch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách lịch hẹn */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Lịch hẹn ngày {selectedDate}
            </h2>
            <span className="text-sm text-gray-600">
              {filteredAppointments.length} lịch hẹn
            </span>
          </div>
<Modal
  title="Thông tin khám"
  open={showExamModal}
  onCancel={handleCloseExamModal}
  onOk={handleConfirmExam}
  okText="Xác nhận "
  cancelText="Hủy"
>
  <p><strong>Bệnh nhân:</strong> {currentAppointment?.customer?.name}</p>
  <p><strong>Thời gian dự kiến:</strong> {formatTime(currentAppointment?.preferredTime)}</p>

  <div className="mt-4">
    <label className="block text-gray-700 mb-1">Thời gian bắt đầu</label>
    <TimePicker
      className="w-full"
      format="HH:mm"
      value={manualStartTime}
      onChange={(value) => setManualStartTime(value)}
    />
  </div>

  <div className="mt-4">
    <label className="block text-gray-700 mb-1">Thời gian kết thúc</label>
    <TimePicker
      className="w-full"
      format="HH:mm"
      value={manualEndTime}
      onChange={(value) => setManualEndTime(value)}
    />
  </div>
</Modal>



          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Không có lịch hẹn nào</p>
              <p className="text-gray-400">Hãy thêm lịch hẹn mới hoặc thay đổi bộ lọc</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
