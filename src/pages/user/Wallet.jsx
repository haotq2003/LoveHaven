import React, { useEffect, useState } from 'react';
import { walletService } from '../../services/wallet.service';
import { jwtDecode } from 'jwt-decode';
import { formatCurrency } from '../../components/common/formatCurrency';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, message } from 'antd';

const Wallet = () => {
  const [wallet, setWallet] = useState(0);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWallet();
    const token = localStorage.getItem('token');
    const tokenData = jwtDecode(token);
    const userId = tokenData.id;
    console.log('userId from useEffect:', userId);
  }, []);

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenData = jwtDecode(token);
      const userid = tokenData.id;
      const res = await walletService.getWallet(userid);
      setWallet(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAmount('');
  };

  const handleConfirm = async () => {
    try {
      if (!amount || isNaN(amount) || amount <= 0) {
        message.error('Vui lòng nhập số tiền hợp lệ!');
        return;
      }

      const token = localStorage.getItem('token');
      const tokenData = jwtDecode(token);
      const userId = tokenData.id;
      const returnUrl = 'http://localhost:5173/vnpay-return';

      // Log API parameters after all variables are initialized
      console.log('API Parameters for createVNPay:', {
        userId: userId,
        amount: amount,
        returnUrl: returnUrl,
      });

      const res = await walletService.createVNPay(userId, amount, returnUrl);
      setIsModalOpen(false);
      setAmount('');
      window.location.href = res.data; // Redirect đến VNPay
    } catch (error) {
      console.log('Error in createVNPay:', error);
      message.error('Giao dịch thất bại!');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 my-8">
      <h2 className="text-2xl font-semibold mb-4">💼 Ví của tôi</h2>

      {/* Số dư */}
      <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
        <p className="text-gray-600 text-sm">Số dư hiện tại:</p>
        <p className="text-3xl font-bold text-green-600 mt-1">{formatCurrency(wallet)}</p>

        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={handleOpenModal}
          >
            Nạp tiền
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Rút tiền
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
            Lịch sử
          </button>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">🔄 Giao dịch gần đây</h3>
      <div className="divide-y border rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white">
          <span>✅ Thanh toán dịch vụ A</span>
          <div className="text-right">
            <p className="text-red-600 font-medium">-250.000đ</p>
            <p className="text-sm text-gray-400">24/06</p>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-white">
          <span>✅ Nhận tiền hoàn</span>
          <div className="text-right">
            <p className="text-green-600 font-medium">+500.000đ</p>
            <p className="text-sm text-gray-400">23/06</p>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-white">
          <span>⏳ Rút tiền đang xử lý</span>
          <div className="text-right">
            <p className="text-yellow-500 font-medium">-100.000đ</p>
            <p className="text-sm text-gray-400">22/06</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="text-blue-600 hover:underline">Xem thêm giao dịch</button>
      </div>
      {/* Modal từ antd */}
      <Modal
        title="Nhập số tiền cần nạp"
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Input
          type="number"
          placeholder="Nhập số tiền"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Wallet;