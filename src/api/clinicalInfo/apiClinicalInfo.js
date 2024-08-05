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

// GET BY ID
export const apiGetClinicalInfoById = async (id) => {
  try {
    const res = await axios(`${BASE_URL}/clinic-info/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};


// PATCH
export const apiEditClinicalInfo = async (id, data) => {
  try {
    const res = await axios.patch(`${BASE_URL}/clinic-info/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
