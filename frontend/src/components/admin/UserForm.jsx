import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserForm = ({ addUser, users, setUsers, handleSnackbarOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      const newUser = { firstName, lastName, email, password, role };
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("");
      handleSnackbarOpen("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h5" component="h2">
          Add User
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
          onSubmit={handleAddUser}
        >
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2 }}
          />
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserForm;
