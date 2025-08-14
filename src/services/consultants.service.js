import axios from "axios";
import { API_URL } from "../config/api";

export const consultantService = {
  getAllConsultant: async (page = 0, size = 10) => {
    try {
      const res = await axios.get(`${API_URL}/get-all-consultants`, {
        params: {
          page,
          size,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getConsultantInactive: async (page = 0, size = 10) => {
    try {
      const res = await axios.get(`${API_URL}/admin/get-consultant-inactive`, {
        params: {
          page,
          size,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateProfileConsultant: async (data) => {
    try {
      const res = await axios.put(`${API_URL}/update-consultant`,data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getConsultantById: async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/get-consultant-by-account-id/${id}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  acceptConsultant: async (id, status) => {
    try {
      const res = await axios.post(`${API_URL}/admin/updateStatus/${id}`, null, {
        params: { status },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
