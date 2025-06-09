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
    }
}