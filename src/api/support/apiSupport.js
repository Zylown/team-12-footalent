import axios from "axios";
import { BASE_URL } from "../constants/base-url";

// CREATE REASON
export const createMessage = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/support`, data);
      return response;
    } catch (error) {
      console.error("API Error:", error);

      return error;
    }
  };