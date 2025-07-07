import axios from "axios";
import { API_URL } from "../config/api";

export const walletService = {
  getWallet: async (accountId) => {
    const res = await axios.get(`${API_URL}/wallet/wallet/balance`, {
      params: { accountId },
    });

    return res.data;
  },
  depositToWallet: async (userId, amount, transactionCode ) => {
    try {
      const res = await axios.post(
        `${API_URL}/wallet/wallet/deposit-to-wallet`,
        null,
        {
          params: {
            userId,
            amount,
            transactionCode ,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createVNPay : async (userId, amount, returnUrl) =>{
    try {
      const res = await axios.get(
        `${API_URL}/vn-pay/get-vn-pay`,
       
        {
          params: {
            userId,
            amount,
            returnUrl,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  depositBooking : async (appointmentId) =>{
    try {
        const res =  await axios.post(`${API_URL}/wallet/wallet/deposit`,
        null,
        {
          params: {
            appointmentId,
          },
        })
        res.data
    } catch (error) {
        console.log(error)
        throw error
    }
  },
  payBooking : async(appointmentId) =>{
    try {
      const res = await axios.post(`${API_URL}/wallet/wallet/pay`, null, {
         params: {
            appointmentId,
          },
      })
      return res.data
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
};
