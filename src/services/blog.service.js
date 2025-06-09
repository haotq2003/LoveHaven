import axios from 'axios'

const API_URL = 'http://localhost:8080'


export const blogService = {
    getAllBlogs: async () =>{
        try{
            const response = await axios.get(`${API_URL}/blog/getAll`)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    createBlog : async (blogdata) =>{
        try{
            const response = await axios.post(`${API_URL}/blog/create`, blogdata)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    updateBlog : async (blogdata) =>{
        try{
            const response = await axios.put(`${API_URL}/blog/update`, blogdata)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    deleteBlog : async (blogId) =>{
        try{
            const response = await axios.delete(`${API_URL}/blog/delete/${blogId}`)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
    getBlogById : async (blogId) =>{
        try{
            const response = await axios.get(`${API_URL}/blog/getById/${blogId}`)
            return response.data
        }catch(error){
            console.log(error)
            throw error
        }
    },
}