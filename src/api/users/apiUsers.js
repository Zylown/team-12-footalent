import axios from "axios";
import { BASE_URL } from "../constants/base-url";

// GET ALL USERS
export const apiGetUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};

// GET USER BY ID
export const apiGetUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};
//DELETE USER
export const apiDeleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response;
  } catch (error) {
    console.error("Error de la API:", error);
    return error;
  }
};