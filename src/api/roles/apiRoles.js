import axios from "axios";
import { BASE_URL } from "../constants/base-url";
export const apiGetRoleById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/roles/${id}`);
      return response;
    } catch (error) {
      console.error("Error de la API:", error);
      return error;
    }
  };
  