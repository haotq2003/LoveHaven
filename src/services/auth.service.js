import axios from 'axios'
import { API_URL } from '../config/api'



export const authService = {
  sendOTP: async (email) => {
    try {
      const response =await axios.post(`${API_URL}/send-otp?email=${email}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, null, {
        params: { email, otp }
      })
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData)
      return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials)
      // Lưu token vào localStorage nếu login thành công
      if (response.data.data) {
        localStorage.setItem('token', response.data.data)
        // Có thể giải mã JWT để lấy thông tin người dùng nếu cần
        // const decodedToken = JSON.parse(atob(response.data.data.split('.')[1]))
        // localStorage.setItem('user', JSON.stringify(decodedToken))
      }
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  registerDoctor: async (doctorData) => {
    try {
      const response = await axios.post(`${API_URL}/register-consultant`, doctorData)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}