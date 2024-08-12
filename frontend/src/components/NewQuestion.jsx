import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { postQuestion } from "../service/dataService";

const NewQuestion = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleMaxLength = 255;
  const contentMaxLength = 5000;

  let user_id = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:3000/questions";
      await axios.post(apiUrl, {
        title,
        content,
        user_id,
      });

      setTitle("");
      setContent("");
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      console.error("There was an error creating the question!", error);
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= titleMaxLength) {
      setTitle(newTitle);
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    if (newContent.length <= contentMaxLength) {
      setContent(newContent);
    }
  };

  const getHelperTextColor = (textLength, maxLength) => {
    return textLength >= maxLength ? "error" : "text.secondary";
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ask a Question!
      </Typography>
      <TextField
        label="Question Title"
        variant="outlined"
        fullWidth
        required
        value={title}
        onChange={handleTitleChange}
        InputProps={{
          endAdornment: (
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <Typography
                variant="body2"
                color={getHelperTextColor(title.length, titleMaxLength)}
              >
                {`${title.length}/${titleMaxLength}`}
              </Typography>
            </Box>
          ),
        }}
        sx={{ mb: 2 }}
        inputProps={{ maxLength: titleMaxLength }}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        required
        value={content}
        onChange={handleContentChange}
        multiline
        rows={4}
        InputProps={{
          endAdornment: (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <Box sx={{ alignSelf: "flex-end", ml: 1 }}>
                <Typography
                  variant="body2"
                  color={getHelperTextColor(content.length, contentMaxLength)}
                  sx={{ alignSelf: "flex-end" }}
                >
                  {`${content.length}/${contentMaxLength}`}
                </Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ ml: 1 }}
              >
                Submit
              </Button>
            </Box>
          ),
        }}
        sx={{ mb: 2 }}
        inputProps={{ maxLength: contentMaxLength }}
      />
    </Box>
  );
};

export default NewQuestion;
