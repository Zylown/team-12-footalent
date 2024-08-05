import axios from "axios";
import { BASE_URL } from "./constants/base-url";

// Función para manejar la solicitud de login
export const apiRegister = async (data) => {
  try {
    const requestData = {
      first_name: data.name,
      last_name: data.lastName,
      dni: data.dni,
      email: data.email,
      phone_number: data.phone1,
      password: data.password,
      role_id: data.role === "odontologo" ? 3 : 2,
      active: true,
      clinic_id: 1,
    };
    const response = await axios.post(`${BASE_URL}/auth/register`, requestData);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};
