import axios from "axios";

const URL = "http://localhost:3000";

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

// Fetch all Questions
export const fetchQuestionData = async () => {
  try {
    const apiUrl = `${URL}/questions`;
    const response = await axios.get(apiUrl);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the questions!", error);
  }
};

// Fetch a single question by ID, including the user that posted the question
export const fetchQuestionById = async (questionId) => {
  try {
    const apiUrl = `${URL}/questions/${questionId}`;
    const response = await axios.get(apiUrl);
    const question = response.data;

    // Fetch user data for the question
    const userData = await fetchUserData(question.user_id);
    question.user = userData;

    return question;
  } catch (error) {
    console.error("Error fetching the question by ID:", error);
    throw error;
  }
};

export const fetchAnswersForQuestion = async (questionId) => {
  try {
    const apiUrl = `${URL}/answers/question/${questionId}`;
    const response = await axios.get(apiUrl);
    const answers = response.data;

    // console.log(response.data);
    const answersWithUsers = await Promise.all(
      answers.map(async (answer) => {
        const userData = await fetchUserData(answer.user_id);
        return { ...answer, user: userData };
      })
    );

    // console.log(answersWithUsers);
    return answersWithUsers;
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw error;
  }
};

// Post a new answer for a question
export const postAnswer = async (questionId, content, userId) => {
  try {
    const apiUrl = `${URL}/answers/question/${questionId}`;
    const response = await axios.post(apiUrl, {
      content,
      user_id: userId,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting answer:", error);
    throw error;
  }
};

export const markAnswerAsCorrect = async (answerId) => {
  try {
    const apiUrl = `${URL}/answers/${answerId}/correct`;
    const response = await axios.post(apiUrl);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting answer:", error);
    throw error;
  }
};
