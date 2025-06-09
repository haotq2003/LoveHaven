import axios from 'axios'

const API_URL = 'http://localhost:8080'

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
     
}