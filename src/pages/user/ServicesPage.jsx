import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesService } from '../../services/services.service';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    getAllServices();
  }, [page, size]);

  const getAllServices = async () => {
    try {
      const res = await servicesService.getAllServices(page, size);
      setServices(res.data.content);
      console.log(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Tiêu đề trang */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#111] mb-4">Dịch vụ của chúng tôi</h1>
        <p className="text-lg text-[#555] max-w-3xl mx-auto">
          Love Haven cung cấp đa dạng dịch vụ tư vấn tâm lý và hỗ trợ tình cảm, giúp bạn xây dựng mối quan hệ hạnh phúc và bền vững
        </p>
      </div>

      {/* Danh sách dịch vụ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services?.map((service) => (
          <div
            key={service.id}
            className={`bg-[#FFF5F7] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border 
              ${service.highlight ? 'border-[#FF6B6B]/50 ring-2 ring-[#FF6B6B]/20' : 'border-[#FADADD]/30'} 
              flex flex-col h-full`}
          >
            <div className="p-8 flex-grow">
              {/* Hiển thị ảnh nếu imageUrl tồn tại */}
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                 
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-[#555]">Không có ảnh</span>
                </div>
              )}

              <h3 className="text-2xl font-semibold text-[#111] mb-3">{service.name}</h3>

              {service.pricePerHour && (
                <div className="mb-4 inline-block bg-[#FFE4E6] px-4 py-2 rounded-lg">
                  <span className="text-xl font-bold text-[#FF6B6B]">
                    {service.pricePerHour.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-[#666]"> / giờ</span>
                </div>
              )}

              <p className="text-[#555] mb-6 leading-relaxed">{service.description}</p>
            </div>
            <div className="p-6 mt-auto">
              <Link
                to={`/services/${service.id}?price=${service.pricePerHour}`}

                className="block w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 text-center"
              >
                {service.highlight ? 'Đăng ký ngay' : 'Tìm hiểu thêm'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Section gọi hành động */}
      <section className="mt-20 text-center py-12 px-8 bg-[#FFE2E2] rounded-3xl shadow-lg border border-[#FFB6C1]/20">
        <h2 className="text-3xl font-semibold text-[#111] mb-6">Bạn cần hỗ trợ?</h2>
        <p className="text-lg text-[#555] max-w-3xl mx-auto mb-8">
          Đội ngũ tư vấn viên của chúng tôi luôn sẵn sàng giúp bạn lựa chọn dịch vụ phù hợp nhất với nhu cầu của bạn.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-300 shadow-md"
        >
          Liên hệ ngay
        </Link>
      </section>
    </div>
  );
};

export default ServicesPage;