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
