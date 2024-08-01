import { BASE_URL } from "../constants/base-url";
import { PATIENT_PATHS } from "../constants/paths/patients-path";
import axios from "axios";

export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${PATIENT_PATHS.GET_ALL}`);
    return response;
  } catch (error) {
    console.error("Error get partients:", error);
    throw error;
  }
};
