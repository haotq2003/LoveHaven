import axios from 'axios'
import { API_URL } from '../config/api'

export const userService = {
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/get-all-accounts`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  viewInforUser : async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/info/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  updateProfile : async (userId,user) =>{
try {
  const res = await axios.put(`${API_URL}/update/${userId}`,user)
  return res.data
} catch (error) {
  console.log(error)
  throw error
}
  },
  
}