import axios from "axios";

// GET
export const apiClinicalInfo = async () => {
  try {
    const res = await axios(
      "https://dentplanner-backend.onrender.com/api/clinic-info"
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const apiEditClinicalInfo = async (id, data) => {
  try {
    const res = await axios.patch(
      `https://dentplanner-backend.onrender.com/api/clinic-info/${id}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
