import React from 'react'
import { Users, Heart, Monitor, ChevronUp, ChevronDown, Search, Plus } from 'lucide-react'

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

  // Dữ liệu dịch vụ
  const services = [
    {
      id: 1,
      name: 'Tư vấn tâm lý cá nhân',
      description: 'Tư vấn và tư vấn để có nhận giúp phải',
      price: '2,000,000VND',
      status: 'active',
    },
    {
      id: 2,
      name: 'Hỗ trợ khủng hoảng tinh thần',
      description: 'Lắng nghe và trò chuyện',
      price: '2,000,000VND',
      status: 'inactive',
    },
    {
      id: 3,
      name: 'Tư vấn tâm lý hôn nhân',
      description: 'Nói về những vấn đề gặp phải của các cặp đôi',
      price: '4,000,000VND',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Tư vấn tâm lý cặp đôi',
      description: 'Nói về những vấn đề gặp phải của các cặp đôi',
      price: '4,000,000VND',
      status: 'active',
    },
  ]

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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-medium">Tất cả dịch vụ</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm"
              />
            </div>
            <button className="bg-[#8DDAB9] hover:bg-[#7BC8A8] text-white px-4 py-2 rounded-lg flex items-center text-sm">
              <Plus size={16} className="mr-1" />
              Thêm dịch vụ
            </button>
          </div>
        </div>
        
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-50 text-gray-500 text-sm">
          <div className="col-span-4 px-6 py-3 text-left">Tên dịch vụ</div>
          <div className="col-span-4 px-6 py-3 text-left">Chi tiết</div>
          <div className="col-span-2 px-6 py-3 text-right">Giá</div>
          <div className="col-span-2 px-6 py-3 text-center">Trạng thái</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {services.map((service) => (
            <div key={service.id} className="grid grid-cols-12 hover:bg-gray-50">
              <div className="col-span-4 px-6 py-4 text-sm font-medium text-gray-900">{service.name}</div>
              <div className="col-span-4 px-6 py-4 text-sm text-gray-500">{service.description}</div>
              <div className="col-span-2 px-6 py-4 text-sm text-gray-500 text-right">{service.price}</div>
              <div className="col-span-2 px-6 py-4 text-sm text-center">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  service.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {service.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing data <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">25.5k</span> entries
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  &lt;
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#FF6B6B] text-sm font-medium text-white">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  4
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  ...
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  40
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  &gt;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard