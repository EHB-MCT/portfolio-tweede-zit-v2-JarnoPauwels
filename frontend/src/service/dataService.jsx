import axios from "axios";

const URL = "http://localhost:3000";
// const userId = localStorage.getItem("userId");

// Fetch User by ID
export const fetchUserData = async (userId) => {
  try {
    const apiUrl = `${URL}/users/${userId}`;
    const response = await axios.get(apiUrl);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
