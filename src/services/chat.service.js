import axios from 'axios';
import { API_URL } from '../config/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const chatService = {
  getConversations: async () => {
    try {
      const response = await axios.get(`${API_URL}/chat/conversations`, {
        headers: getAuthHeaders()
      });
      return response.data.data;
    } catch (error) {
      console.error('❌ Lỗi khi lấy danh sách cuộc trò chuyện:', error);
      throw error;
    }
  },

  getMessages: async (conversationId) => {
    try {
      const response = await axios.get(`${API_URL}/messages/conversation/${conversationId}`, {
        headers: getAuthHeaders()
      });
      return response.data.data;
    } catch (error) {
      console.error('❌ Lỗi khi lấy tin nhắn:', error);
      throw error;
    }
  },

  sendMessage: async (conversationId, content) => {
    try {
      const response = await axios.post(
        `${API_URL}/chat/messages`,
        { conversationId, content },
        { headers: getAuthHeaders() }
      );
      return response.data.data;
    } catch (error) {
      console.error('❌ Lỗi khi gửi tin nhắn:', error);
      throw error;
    }
  },

  // ✅ FIXED: nhận full request object thay vì chỉ email
  // Truyền object request đúng format
createConversation: async (requestBody) => {
  try {
    const response = await axios.post(
      `${API_URL}/conversation/create`,
      requestBody, // chính là { type, participantId: [...] }
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('❌ Lỗi khi tạo cuộc trò chuyện:', error.response?.data || error);
    throw error;
  }
}

};
