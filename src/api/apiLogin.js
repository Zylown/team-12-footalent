import axios from "axios";
import { BASE_URL } from "./constants/base-url";
// Función para manejar la solicitud de login
export const apiLogin = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};
