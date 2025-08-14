import React, { useEffect, useState } from 'react';
import { walletService } from '../../services/wallet.service';
import { jwtDecode } from 'jwt-decode';
import { formatCurrency } from '../../components/common/formatCurrency';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, message, Table } from 'antd';
import { paymentService } from '../../services/payment.service';

const Wallet = () => {
  const [wallet, setWallet] = useState(0);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const [paymentHistory, setPaymentHistory] = useState([]);
  
  useEffect(() => {
    fetchWallet();
    fetchPayment();
    const token = localStorage.getItem('token');
    const tokenData = jwtDecode(token);
    console.log(tokenData);
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
  
  const fetchPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenData = jwtDecode(token);
      const email = tokenData.email;
      const res = await paymentService.getPaymentByEmail(email);
      console.log(res.data);
      setPaymentHistory(res.data);
    } catch (error) {
      console.log(error);
    }
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
     const isLocal = window.location.hostname === 'localhost';
const returnUrl = isLocal 
  ? 'http://localhost:5173/vnpay-return' 
  : 'https://love-haven.vercel.app/vnpay-return';

      // Log API parameters after all variables are initialized
      console.log('API Parameters for createVNPay:', {
        userId: userId,
        amount: amount,
        returnUrl: returnUrl,
      });

      const res = await walletService.createVNPay(userId, amount, returnUrl);
      console.log(res.data)
      setIsModalOpen(false);
      setAmount('');
      window.location.href = res.data; 
    } catch (error) {
      console.log('Error in createVNPay:', error);
      message.error('Giao dịch thất bại!');
    }
  };
  
  const handleOpenHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };
  
  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };
  
  // Định dạng ngày giờ
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };
  
  // Lấy 3 giao dịch gần nhất
  const recentTransactions = paymentHistory.slice(0, 3);
  
  // Cấu hình cột cho bảng lịch sử giao dịch
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Loại',
      dataIndex: 'method',
      key: 'method',
      render: (text) => (
        <span className={`font-medium ${text === 'WALLET' ? 'text-red-500' : 'text-green-500'}`}>
          {text === 'WALLET' ? 'Thanh toán' : 'Nạp tiền'}
        </span>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
     render: (amount, record) => (
  <span className={record.method === 'ATM' ? 'text-green-500' : 'text-red-500'}>
    {record.method === 'ATM' ? '+' : '-'}{formatCurrency(amount)}
  </span>
)

    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={
          status === 'Success' ? 'text-green-500' : 
          status === 'Failed' ? 'text-red-500' : 'text-yellow-500'
        }>
          {status === 'Success' ? '✅ Thành công' : 
           status === 'Failed' ? '❌ Thất bại' : '⏳ Đang xử lý'}
        </span>
      ),
    },
    {
      title: 'Từ tài khoản',
      dataIndex: 'fromAccount',
      key: 'fromAccount',
    },
    {
      title: 'Đến tài khoản',
      dataIndex: 'toAccount',
      key: 'toAccount',
    },
  ];

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
          {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Rút tiền
          </button> */}
          <button 
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            onClick={handleOpenHistoryModal}
          >
            Lịch sử
          </button>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">🔄 Giao dịch gần đây</h3>
      <div className="divide-y border rounded-lg overflow-hidden">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-4 bg-white">
              <span>
                {transaction.status === 'Success' ? '✅ ' : 
                 transaction.status === 'Failed' ? '❌ ' : '⏳ '}
                {transaction.description}
              </span>
              <div className="text-right">
                <p className={transaction.method === 'ATM' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {transaction.method === 'ATM' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-400">{transaction.method}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">Không có giao dịch nào</div>
        )}
      </div>

      <div className="text-center mt-4">
        <button 
          className="text-blue-600 hover:underline"
          onClick={handleOpenHistoryModal}
        >
          Xem thêm giao dịch
        </button>
      </div>
      
      {/* Modal nạp tiền */}
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
      
      {/* Modal lịch sử giao dịch */}
      <Modal
        title="Lịch sử giao dịch"
        open={isHistoryModalOpen}
        onCancel={handleCloseHistoryModal}
        footer={null}
        width={1000}
      >
        <Table 
          dataSource={paymentHistory} 
          columns={columns} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
};

export default Wallet;