import { BASE_URL } from "../constants/base-url";
import { REASON_PATH } from "../constants/paths/reasons-path";
import axios from "axios";

export const getAllReasons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${REASON_PATH.GET_ALL}`);
    return response;
  } catch (error) {
    console.error("Error get reasons:", error);
    throw error;
  }
};

// GET REASON BY ID
export const getReasonById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/reasons/${id}`);
    return response;
  } catch (error) {
    console.error("Error get reason by id:", error);
    throw error;
  }
};
// CREATE REASON
export const createReason = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/reasons`, data);
    return response;
  } catch (error) {
    console.error("API Error:", error);
   
    
    return error;
  }
};
// Delete Reason 
export const deleteReasonById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reasons/${id}`);
    return response;
  } catch (error) {
    console.error("Error delete reason by id:", error);
    throw error;
  }
};