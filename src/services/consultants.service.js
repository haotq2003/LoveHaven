import axios from 'axios'
import { API_URL } from '../config/api'



export const consultantService = {
     getAllConsultant :  async (page = 0, size = 10) =>{
        try {
            const res = await axios.get(`${API_URL}/get-all-consultants`,{
      params: {
        page,
        size
      }})
      return  res.data
        } catch (error) {
            console.log(error)
            throw error
        }
     },
     updateProfileConsultant : async () =>{
        try {
            const res = await axios.get(`${API_URL}/get-all-consultants`)
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
     },
     
}