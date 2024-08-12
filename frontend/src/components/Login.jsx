import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:3000/users/login";
      const response = await axios.post(apiUrl, { email, password });
      console.log(response);
      if (response) {
        localStorage.setItem("userId", response.data.id);
        onLoginSuccess();
        navigate("/");
      } else {
        setError("Incorrect email or password");
      }
    } catch (error) {
      console.error(
        "There was an error logging in the user!",
        error.response.data
      );
      setError(error.response.data.error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Button variant="contained" color="primary" onClick={handleRegisterClick}>
        Register
      </Button>
    </Box>
  );
};

export default Login;
