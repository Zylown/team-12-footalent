import axios from "axios";

// Función para manejar la solicitud de login
export const apiLogin = async (data) => {
  try {
    const response = await axios.post('https://dentplanner-backend.onrender.com/api/auth/login', data);
    return response;
  } catch (error) {
    
    throw error;
  }
};