import axios from 'axios'
import { API_URL } from '../config/api'

export const chatService = {
  // Lấy danh sách các cuộc trò chuyện của người dùng hiện tại
  getConversations: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/chat/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching conversations:', error)
      throw error
    }
  },

  // Lấy tin nhắn của một cuộc trò chuyện cụ thể
  getMessages: async (conversationId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/chat/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching messages:', error)
      throw error
    }
  },

  // Gửi tin nhắn mới
  sendMessage: async (conversationId, content) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_URL}/chat/messages`,
        {
          conversationId,
          content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  },

  // Tạo cuộc trò chuyện mới
 createConversation: async (participantEmail) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post(
      `${API_URL}/conversation/create`,
      {
        type: "private",
        participantId: [participantEmail]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error creating conversation:', error)
    throw error
  }
}

}