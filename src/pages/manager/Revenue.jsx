import React, { useState, useEffect } from 'react';
import { Select, Card, Spin, message } from 'antd';
import { paymentService } from '../../services/payment.service';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Revenue = () => {
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalYearRevenue, setTotalYearRevenue] = useState(0);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }

  useEffect(() => {
    fetchMonthlyRevenue();
  }, [selectedYear]);

  const fetchMonthlyRevenue = async () => {
    setLoading(true);
    try {
      const monthlyData = [];
      let yearTotal = 0;

      // Lấy dữ liệu cho từng tháng
      for (let month = 1; month <= 12; month++) {
        const response = await paymentService.getPaymentInmonthAndYear(selectedYear, month);
        const amount = response.data || 0;
        monthlyData.push(amount);
        yearTotal += amount;
      }

      setMonthlyRevenue(monthlyData);
      setTotalYearRevenue(yearTotal);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
      message.error('Không thể lấy dữ liệu doanh thu');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: monthlyRevenue,
        backgroundColor: 'rgba(255, 107, 107, 0.6)',
        borderColor: 'rgba(255, 107, 107, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Doanh thu theo tháng năm ${selectedYear}`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
          }
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Báo cáo doanh thu</h1>
        <Select
          defaultValue={selectedYear}
          style={{ width: 120 }}
          onChange={setSelectedYear}
          options={years.map(year => ({ value: year, label: `Năm ${year}` }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-500">Tổng doanh thu năm {selectedYear}</h3>
            <p className="text-3xl font-bold text-[#FF6B6B] mt-2">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalYearRevenue)}
            </p>
          </div>
        </Card>
        
        <Card className="shadow-md">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-500">Doanh thu trung bình tháng</h3>
            <p className="text-3xl font-bold text-[#FF6B6B] mt-2">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalYearRevenue / 12)}
            </p>
          </div>
        </Card>
        
        <Card className="shadow-md">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-500">Tháng có doanh thu cao nhất</h3>
            <p className="text-3xl font-bold text-[#FF6B6B] mt-2">
              {monthlyRevenue.length > 0 ? 
                `Tháng ${monthlyRevenue.indexOf(Math.max(...monthlyRevenue)) + 1}` : 
                'N/A'}
            </p>
            <p className="text-lg text-gray-600">
              {monthlyRevenue.length > 0 ? 
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.max(...monthlyRevenue)) : 
                '0 ₫'}
            </p>
          </div>
        </Card>
      </div>

      <Card className="shadow-md p-4">
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spin size="large" />
          </div>
        ) : (
          <div className="h-96">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Revenue;