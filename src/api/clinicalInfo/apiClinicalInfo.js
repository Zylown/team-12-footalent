import axios from "axios";
import { BASE_URL } from "../constants/base-url";
// GET
export const apiClinicalInfo = async () => {
  try {
    const res = await axios(`${BASE_URL}/clinic-info`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const apiEditClinicalInfo = async (id, data) => {
  try {
    const res = await axios.patch(`${BASE_URL}/clinic-info/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
