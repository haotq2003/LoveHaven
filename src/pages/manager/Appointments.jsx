import React, { useState, useEffect } from 'react';
import { Table, Select, Card, Spin, message, DatePicker } from 'antd';
import { paymentService } from '../../services/payment.service';
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const Appointments = () => {
  const [loading, setLoading] = useState(false);
  const [salaryData, setSalaryData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }

  const months = [
    { value: 1, label: 'Tháng 1' },
    { value: 2, label: 'Tháng 2' },
    { value: 3, label: 'Tháng 3' },
    { value: 4, label: 'Tháng 4' },
    { value: 5, label: 'Tháng 5' },
    { value: 6, label: 'Tháng 6' },
    { value: 7, label: 'Tháng 7' },
    { value: 8, label: 'Tháng 8' },
    { value: 9, label: 'Tháng 9' },
    { value: 10, label: 'Tháng 10' },
    { value: 11, label: 'Tháng 11' },
    { value: 12, label: 'Tháng 12' },
  ];

  useEffect(() => {
    fetchSalaryData();
  }, [selectedYear, selectedMonth]);

  const fetchSalaryData = async () => {
    setLoading(true);
    try {
      const response = await paymentService.getPaymentBySalary(selectedYear, selectedMonth);
      if (response && response.data) {
        // Thêm key cho mỗi item để sử dụng trong Table
        const dataWithKeys = response.data.map((item, index) => ({
          ...item,
          key: index,
          // Chuyển đổi ngày thành định dạng dễ đọc
          paidAtFormatted: new Date(item.paidAt).toLocaleString('vi-VN'),
        }));
        setSalaryData(dataWithKeys);
      } else {
        setSalaryData([]);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu lương:', error);
      message.error('Không thể lấy dữ liệu lương');
      setSalaryData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'paidAtFormatted',
      key: 'paidAt',
      sorter: (a, b) => new Date(a.paidAt) - new Date(b.paidAt),
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gray';
        if (status === 'SUCCESS') color = 'green';
        if (status === 'FAILED') color = 'red';
        if (status === 'PENDING') color = 'orange';
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Người nhận',
      dataIndex: 'toAccount',
      key: 'toAccount',
      ellipsis: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const totalSalary = salaryData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        
        <div className="flex space-x-4">
          <Select
            value={selectedMonth}
            style={{ width: 120 }}
            onChange={setSelectedMonth}
            options={months}
          />
          <Select
            value={selectedYear}
            style={{ width: 120 }}
            onChange={setSelectedYear}
            options={years.map(year => ({ value: year, label: `Năm ${year}` }))}
          />
        </div>
      </div>

      <div className="mb-8">
        <Card className="shadow-md">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-500">Tổng chi trả lương tháng {selectedMonth}/{selectedYear}</h3>
            <p className="text-3xl font-bold text-[#FF6B6B] mt-2">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalSalary)}
            </p>
          </div>
        </Card>
      </div>

      <Card className="shadow-md">
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spin size="large" />
          </div>
        ) : (
          <Table 
            columns={columns} 
            dataSource={salaryData} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1200 }}
            locale={{ emptyText: 'Không có dữ liệu' }}
          />
        )}
      </Card>
    </div>
  );
};

export default Appointments;