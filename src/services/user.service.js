import axios from 'axios'

const API_URL = 'http://localhost:8080'

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
  
}