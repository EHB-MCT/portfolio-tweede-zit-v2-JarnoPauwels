import axios from "axios";

const URL = "http://localhost:3000";

// Fetch all users
export const fetchAllUsers = async () => {
  try {
    const apiUrl = `${URL}/users`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const apiUrl = `${URL}/users`;
    const response = await axios.post(apiUrl, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const apiUrl = `${URL}/users/${userId}`;
    await axios.delete(apiUrl);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Delete a question by ID
export const deleteQuestion = async (questionId) => {
  try {
    const apiUrl = `${URL}/questions/${questionId}`;
    await axios.delete(apiUrl);
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

// Delete an answer by ID
export const deleteAnswer = async (answerId) => {
  try {
    const apiUrl = `${URL}/answers/${answerId}`;
    await axios.delete(apiUrl);
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw error;
  }
};
