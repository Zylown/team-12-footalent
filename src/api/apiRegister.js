import axios from "axios";


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
      role_id: data.role === 'odontologo' ? 2 : 1,
      active: true,
      clinic_id: 1
    }
    const response = await axios.post('https://dentplanner-backend.onrender.com/api/users', requestData);
    return response;
  } catch (error) {
    
    throw error;
  }
};