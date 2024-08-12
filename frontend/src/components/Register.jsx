import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const Register = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const validateEmail = () => {
    // Regex to validate email ending with @student.ehb.be
    const regex = /ehb\.be$/i;

    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !validateEmail()) {
      setEmailError(true);
      return;
    }

    try {
      const apiUrl = "http://localhost:3000/users";
      await axios.post(apiUrl, {
        firstName,
        lastName,
        email,
        password,
        role,
      });
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Center vertically
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ alignSelf: "flex-start" }}
        >
          Register
        </Typography>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          required
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          required
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false); // Reset email error on input change
          }}
          error={emailError}
          helperText={
            emailError ? "Please enter a valid @student.ehb.be email" : ""
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
