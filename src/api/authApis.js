import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 


//SIGNUP
export const signup = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
