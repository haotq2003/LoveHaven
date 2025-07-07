// src/pages/VNPayReturn.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { walletService } from '../../services/wallet.service';

const VNPayReturn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleVNPayReturn = async () => {
      const params = new URLSearchParams(location.search);
      const responseCode = params.get('vnp_ResponseCode');
      const amount = params.get('vnp_Amount'); // sẽ có thêm 2 số 0
      const txnRef = params.get('vnp_TxnRef');

      if (responseCode === '00') {
        try {
          const token = localStorage.getItem('token');
          const tokenData = jwtDecode(token);
          const userId = tokenData.id;

          // Chia cho 100 vì VNPay trả về số tiền nhân 100
          const realAmount = parseInt(amount) / 100;

          await walletService.depositToWallet(userId, realAmount, txnRef);

          message.success('Nạp tiền thành công!');
          navigate('/wallet');
        } catch (error) {
          console.log(error);
          message.error('Có lỗi khi xác nhận giao dịch!');
          navigate('/wallet');
        }
      } else {
        message.error('Giao dịch thất bại hoặc bị hủy!');
        navigate('/wallet');
      }
    };

    handleVNPayReturn();
  }, [location.search, navigate]);

  return <div>Đang xử lý giao dịch...</div>;
};

export default VNPayReturn;
