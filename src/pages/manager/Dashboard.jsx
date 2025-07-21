import React, { useEffect, useState } from 'react'
import { Users, Heart, Monitor, ChevronUp, ChevronDown, Search, Plus } from 'lucide-react'
import { bookingService } from '../../services/booking.service';
import { Pagination ,Table } from 'antd';
import { servicesService } from '../../services/services.service';

const Dashboard = () => {
  // Dữ liệu thống kê
  const stats = [
    {
      title: 'Tất cả dịch vụ',
      count: 10,
      icon: <Users className="w-8 h-8 text-green-500" />,
      trend: 'up',
      trendValue: '5%',
    },
    {
      title: 'Tổng khách',
      count: 1893,
      icon: <Users className="w-8 h-8 text-blue-500" />,
      trend: 'down',
      trendValue: '1%',
      trendLabel: 'this month',
    },
    {
      title: 'Đang hoạt động',
      count: 189,
      icon: <Monitor className="w-8 h-8 text-green-500" />,
      avatars: [
        '/path/to/avatar1.jpg',
        '/path/to/avatar2.jpg',
        '/path/to/avatar3.jpg',
        '/path/to/avatar4.jpg',
      ],
    },
  ]
  const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(8);
const [mostService,setMostService] = useState([]);
  useEffect(()=>{
   fetchData()
   fetchMostPopular()
  },[])
const [booking,setBooking] = useState([]);
  const fetchData = async () => {
    try {
      const res = await bookingService.getAllBookingTransaction();
      console.log(res.data)
      setBooking(res.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  const fetchMostPopular = async () => {
    try {
      const res = await servicesService.getAllMostService();
      console.log(res.data)
      setMostService(res.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
const paginatedData = booking?.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);
const columns = [
  {
    title: 'Tên dịch vụ',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Chi tiết',
    dataIndex: 'toAccount',
    key: 'toAccount',
  },
  {
    title: 'Giá',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (text) => `${text?.toLocaleString()} ₫`
  },
  {
    title: 'Phương thức',
    dataIndex: 'method',
    key: 'method',
    align: 'center',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
];

  return (
  <div className="container mx-auto">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
     {mostService && mostService.serviceName && (
  <div className="p-6 rounded-lg bg-green-50 border border-green-200 w-full max-w-md mx-auto">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-green-100 rounded-full">
        <Heart className="w-5 h-5 text-green-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">Dịch vụ phổ biến nhất</p>
        <h4 className="text-lg font-semibold text-green-800">
          {mostService.serviceName}
        </h4>
        <p className="text-sm text-gray-500">Số lần sử dụng: {mostService.usageCount}</p>
      </div>
    </div>
  </div>
)}

    </div>

    {/* Services Table */}
    <Table
      columns={columns}
      dataSource={paginatedData}
      rowKey="id"
      pagination={false}
    />
    <div className="flex justify-end mt-4 px-6 pb-6">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={booking.length}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
        showSizeChanger
        pageSizeOptions={['4', '8', '16', '24']}
      />
    </div>
  </div>
);
}

export default Dashboard