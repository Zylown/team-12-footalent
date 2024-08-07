import axios from "axios";
import { BASE_URL } from "./constants/base-url";
// Función para manejar la solicitud de login
export const apiLogin = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response;
  } catch (error) {
    // Rechaza el error para que pueda ser capturado en el componente que llama
    throw error.response ? error.response.data : error;
  }
};

export const apiChangePassword = async (id, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/change-password/${id}`, data);
    return response;
  } catch (error) {
    // Rechaza el error para que pueda ser capturado en el componente que llama
    throw error.response ? error.response.data : error;
  }
};