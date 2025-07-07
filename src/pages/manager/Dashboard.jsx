import React, { useEffect, useState } from 'react'
import { Users, Heart, Monitor, ChevronUp, ChevronDown, Search, Plus } from 'lucide-react'
import { bookingService } from '../../services/booking.service';
import { Pagination ,Table } from 'antd';

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
  useEffect(()=>{
   fetchData()
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
const paginatedData = booking.slice(
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
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gray-100">
                {stat.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <div className="flex items-center">
                  <span className="text-2xl font-semibold">{stat.count}</span>
                  {stat.trend && (
                    <div className="ml-2 flex items-center">
                      {stat.trend === 'up' ? (
                        <ChevronUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.trendValue} {stat.trendLabel && <span className="text-gray-400">{stat.trendLabel}</span>}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {stat.avatars && (
              <div className="mt-4 flex -space-x-2">
                {stat.avatars.map((avatar, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-white">
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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
  )
}

export default Dashboard