import React, { useState, useEffect } from "react";
import {
  fetchUserData,
  fetchQuestionData,
  fetchAnswersForQuestion,
} from "../../service/dataService";
import { fetchAllUsers, addUser, deleteUser } from "../../service/adminService";
import { Box, Typography, FormControlLabel, Switch } from "@mui/material";
import UserForm from "./UserForm";
import FeedbackSnackbar from "./FeedbackSnackbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchAllUsers();
        const questionsData = await fetchQuestionData();
        setUsers(usersData);
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
      <FeedbackSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default AdminDashboard;
