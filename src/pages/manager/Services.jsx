import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Services = () => {
  // Dữ liệu mẫu cho các dịch vụ
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Tư vấn tâm lý cá nhân',
      description: 'Tư vấn và vấn đề cá nhân gặp phải',
      price: '2.000.000VND',
      status: 'active'
    },
    {
      id: 2,
      name: 'Hỗ trợ khủng hoảng tinh thần',
      description: 'Lắng nghe và trò chuyện',
      price: '2.000.000VND',
      status: 'inactive'
    },
    {
      id: 3,
      name: 'Tư vấn tâm lý hôn nhân',
      description: 'Nói về những vấn đề gặp phải của các cặp đôi',
      price: '4.000.000VND',
      status: 'inactive'
    },
    {
      id: 4,
      name: 'Tư vấn tâm lý cặp đôi',
      description: 'Nói về những vấn đề gặp phải của các cặp đôi',
      price: '4.000.000VND',
      status: 'active'
    }
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Quản lý dịch vụ</h1>
        <button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-2 px-4 rounded-lg flex items-center">
          <FaPlus className="mr-2" />
          Thêm dịch vụ mới
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Danh sách dịch vụ</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Tên dịch vụ</th>
                <th className="pb-3 font-medium">Chi tiết</th>
                <th className="pb-3 font-medium">Giá</th>
                <th className="pb-3 font-medium">Trạng thái</th>
                <th className="pb-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} className="border-b hover:bg-gray-50">
                  <td className="py-4">{service.id}</td>
                  <td className="py-4">{service.name}</td>
                  <td className="py-4">{service.description}</td>
                  <td className="py-4">{service.price}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div>Hiển thị 1-4 của 4 dịch vụ</div>
          <div className="flex space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-400">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FF6B6B] text-white">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-400">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;