import axios from "axios";
import { API_URL } from "../config/api";

export const FeedBackService = {
    async createFeedBack(feedbackData) {
        try {
          const response = await axios.post(`${API_URL}/feedback/create`, feedbackData);
          return response.data;
        } catch (error) {
          console.error('Lỗi khi gọi API tạo feedback:', error);
          throw error;
        }
      },
      async getFeedbackByTherapist(therapistId, page = 0, size = 10) {
  try {
    const response = await axios.get(`${API_URL}/feedback/getByThe`, {
      params: { therapistId, page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy feedback:", error);
    throw error;
  }
}

}