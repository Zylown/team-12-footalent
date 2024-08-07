import axios from "axios";
import { BASE_URL } from "../constants/base-url";

//GET ALL PATIENTS
export const getAllPatients = async () => {
  try {
    const response = await axios(`${BASE_URL}/patients`);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};

//GET PATIENT BY ID
export const getPatientById = async (id) => {
  try {
    const response = await axios(`${BASE_URL}/patients/${id}`);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};

// POST A NEW PATIENT
export const postPatient = async (patient) => {
  try {
    const response = await axios.post(`${BASE_URL}/patients`, patient);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};

// DELETE A PATIENT BY ID
export const deletePatientById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/patients/${id}`);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};
