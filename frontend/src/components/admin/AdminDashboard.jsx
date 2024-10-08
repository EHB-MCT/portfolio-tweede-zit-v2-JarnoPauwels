import React, { useState, useEffect } from "react";
import {
  fetchUserData,
  fetchQuestionData,
  fetchAnswersForQuestion,
} from "../../service/dataService";
import {
  fetchAllUsers,
  addUser,
  deleteUser,
  deleteQuestion,
  deleteAnswer,
} from "../../service/adminService";
import { Box, Typography } from "@mui/material";
import UserForm from "./UserForm";
import UserList from "./UserList";
import QuestionsAndAnswers from "./QuestionsAndAnswers";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import FeedbackSnackbar from "./FeedbackSnackbar";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  // Feedback Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleDeleteDialogOpen = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteItemId) {
      try {
        if (deleteItemId.startsWith("user-")) {
          const userId = deleteItemId.replace("user-", "");
          await deleteUser(userId);
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          handleSnackbarOpen("User deleted successfully!");
        } else if (deleteItemId.startsWith("question-")) {
          const questionId = deleteItemId.replace("question-", "");
          await deleteQuestion(questionId);
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== questionId)
          );
          setAnswers((prevAnswers) => {
            const { [questionId]: _, ...remainingAnswers } = prevAnswers;
            return remainingAnswers;
          });
          handleSnackbarOpen("Question deleted successfully!");
        } else if (deleteItemId.startsWith("answer-")) {
          const [questionId, answerId] = deleteItemId
            .replace("answer-", "")
            .split("-");
          await deleteAnswer(answerId);
          setAnswers((prevAnswers) => {
            if (!prevAnswers[questionId]) return prevAnswers;
            return {
              ...prevAnswers,
              [questionId]: prevAnswers[questionId].filter(
                (answer) => answer.id !== answerId
              ),
            };
          });
          handleSnackbarOpen("Answer deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        handleDeleteDialogClose();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchAllUsers();
        const questionsData = await fetchQuestionData();
        const questionsWithUsers = await Promise.all(
          questionsData.map(async (question) => {
            const userData = await fetchUserData(question.user_id);
            return { ...question, user: userData };
          })
        );
        setUsers(usersData);
        setQuestions(questionsWithUsers);

        const answersData = {};
        for (const question of questionsData) {
          const questionAnswers = await fetchAnswersForQuestion(question.id);
          answersData[question.id] = questionAnswers;
        }
        setAnswers(answersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <UserForm
        addUser={addUser}
        users={users}
        setUsers={setUsers}
        handleSnackbarOpen={handleSnackbarOpen}
      />
      <UserList users={users} handleDeleteUser={handleDeleteDialogOpen} />
      <QuestionsAndAnswers
        questions={questions}
        answers={answers}
        handleDeleteQuestion={handleDeleteDialogOpen}
        handleDeleteAnswer={handleDeleteDialogOpen}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />
      <FeedbackSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default AdminDashboard;
