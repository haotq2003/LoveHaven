import axios from 'axios'

const API_URL = 'http://localhost:8080'
export const servicesService =  {
    getAllServices :  async (page = 0, size = 10) =>{
    try {
        const res  = await axios.get(`${API_URL}/service/getAllPage`, {
      params: {
        page,
        size
      }})
          return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
    },
    createService  : async (serviceData) =>{
        try {
            const res =  await axios.post(`${API_URL}/service/create`,serviceData);
            return res.data
        } catch (error) {
            console.log(error);
            throw error
        }
    },
      updateService  : async (serviceData,serviceId) =>{
        try {
            const res =  await axios.post(`${API_URL}/service/update/${serviceId}`,serviceData);
            return res.data
        } catch (error) {
            console.log(error);
            throw error
        }
    },
   deleteService  : async (serviceId) =>{
        try {
            const res =  await axios.delete(`${API_URL}/service/delete/${serviceId}`);
            return res.data
        } catch (error) {
            console.log(error);
            throw error
        }
    },
}