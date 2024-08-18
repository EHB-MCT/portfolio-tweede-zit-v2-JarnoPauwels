import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const FeedbackSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={onClose}
        severity="success"
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default FeedbackSnackbar;
