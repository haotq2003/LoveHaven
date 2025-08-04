import axios from 'axios'

const API_URL = 'https://summer2025-exe-be.onrender.com'

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
    getBookingByCusId: async (customerId) => {
        try {
            const response = await axios.get(`${API_URL}/appointment/get-by-customer-id`, {
                params: { customerId } 
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
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
   bookingUpdateTime: async (id, startTime, endTime) => {
  try {
    const response = await axios.put(`${API_URL}/assignment/update-time`, null, {
      params: {
        id,
        startTime,
        endTime
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
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
      },
    updateStatusBooking: async (id, status) => {
  try {
    const res = await axios.put(`${API_URL}/appointment/update-status`, null, {
      params: {
        id,
        status
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
},
getAllBookingTransaction : async () =>{
    try {
        const res = await axios.get(`${API_URL}/payment/get-all`)
        return res.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

      
}