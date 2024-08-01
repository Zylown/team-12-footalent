import { BASE_URL } from "../constants/base-url";
import { REASON_PATH } from "../constants/paths/reasons-path";
import axios from "axios";

export const getAllReasons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${REASON_PATH.GET_ALL}`);
    return response;
  } catch (error) {
    console.error("Error get partients:", error);
    throw error;
  }
};
