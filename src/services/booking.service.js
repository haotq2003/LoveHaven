import axios from 'axios'

const API_URL = 'http://localhost:8080'

export const bookingService = {
    getAllBookings: async () =>{
        try{
            const response = await axios.get(`${API_URL}/booking/getAll`)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    createBooking : async (bookingdata) =>{
        try{
            const response = await axios.post(`${API_URL}/appointment/create`, bookingdata)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    getBookigByCusId : async (customerId) =>{
        try{
            const response = await axios.get(`${API_URL}/appointment/get-by-customer-id/${customerId}`)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    getBookingByCity : async (city) =>{
        try{
            const response = await axios.get(`${API_URL}/appointment/get-by-city`,{
                params:{
                    city
                }
            })
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    acceptBooking : async (appointmentId ,consultantId ) =>{
        try{
            const response = await axios.post(`${API_URL}/assignment/create`,null,{
                params:{
                    appointmentId,
                    consultantId
                }
            })
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    bookingUpdateTime : async (id ,startTime ,endTime ) =>{
        try{
            const response = await axios.put(`${API_URL}/assignment/update-time`,{
                params:{
                    id,
                    startTime,
                    endTime
                }
            })
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    getBookingById: async (id) => {
        try {
          const response = await axios.get(`${API_URL}/assignment/get-by-appointment`, {
            params: { appointmentId: id }
          })
          return response
        } catch (error) {
          console.log(error)
          throw error
        }
      },
      getBookingByConsultant : async (consultantId) =>{
        try {
            const response = await axios.get(`${API_URL}/appointment/get-by-consultant-id`, {
            params: { consultantId }
          
          })
          return response
        } catch (error) {
            console.log(error)
            throw error
        }
      }
      
}