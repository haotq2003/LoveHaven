import axios from 'axios';
import { API_URL } from '../config/api';

export const paymentService = {
  // Gọi API tạo VNPay deposit
  async createVNPayDeposit(appointmentId, returnUrl) {
    try {
      const response = await axios.get(`${API_URL}/vn-pay/deposit`, {
        params: {
          appointmentId,
          returnUrl
        }
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi gọi API VNPay:', error);
      throw error;
    }
  },

  // Gọi API cập nhật trạng thái thanh toán theo transactionCode
  async updatePaymentStatus(transactionCode, status) {
    try {
      const response = await axios.put(
        `${API_URL}/payment/update-status-by-transaction-code`,
        null,
        {
          params: {
            transactionCode,
            status
          }
        }
      );
      return response;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
      throw error;
    }
  },
  async getPaymentByEmail(email) {
    try {
      const response = await axios.get(`${API_URL}/payment/get-by-email`, {
        params: {
          email
        }
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin thanh toán:', error);
      throw error;
    }
  },
  getPaymentInmonthAndYear: async (year, month) => {
  try {
    const response = await axios.get(`${API_URL}/payment/get-by-all-total-income-in-month`, {
      params: { year, month }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin thanh toán:', error);
    throw error;
  }
}

};
