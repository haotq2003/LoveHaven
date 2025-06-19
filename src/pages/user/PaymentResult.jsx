import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePaymentResult = async () => {
      const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
      const vnp_TxnRef = searchParams.get('vnp_TxnRef');

      if (vnp_ResponseCode && vnp_TxnRef) {
        try {
          const status = vnp_ResponseCode === '00' ? 'DEPOSITED' : 'Failed';
          const response = await axios.put(
            `http://localhost:8080/payment/update-status-by-transaction-code?transactionCode=${vnp_TxnRef}&status=${status}`
          );

          if (response.status === 200) {
           
              message.success('Thanh toán thành công!');
           
              
            
          } else {
            message.error('Không thể cập nhật trạng thái thanh toán!');
          }
        } catch (error) {
          console.error('Error updating payment status:', error);
          message.error('Có lỗi xảy ra khi cập nhật trạng thái thanh toán!');
        }
      }

      // Chuyển hướng về trang chủ sau 3 giây
      setTimeout(() => {
        navigate('/');
      }, 3000);
    };

    handlePaymentResult();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Đang xử lý kết quả thanh toán...</h1>
        <p className="text-gray-600">Vui lòng đợi trong giây lát, bạn sẽ được chuyển hướng về trang chủ.</p>
      </div>
    </div>
  );
};

export default PaymentResult;