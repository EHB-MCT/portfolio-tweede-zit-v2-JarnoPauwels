// Questions.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestionData, fetchUserData } from "../service/dataService";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import NewQuestion from "./NewQuestion";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const questionData = await fetchQuestionData();
      const questionsWithUsers = await Promise.all(
        questionData.map(async (question) => {
          const userData = await fetchUserData(question.user_id);
          return { ...question, user: userData };
        })
      );
      setQuestions(questionsWithUsers);
    } catch (error) {
      console.error("There was an error fetching the questions!", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const refetchQuestions = async () => {
    await fetchQuestions();
  };

  const renderCards = () => {
    return questions.map((question) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={question.id}>
        {/* <Grid item key={question.id}> */}
        <Box
          onClick={() => navigate(`/question/${question.id}`)}
          sx={{ cursor: "pointer" }}
        >
          <Card
            variant="outlined"
            sx={{
              ":hover": {
                boxShadow: 20,
              },
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                {question.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {question.user.firstName} {question.user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author Role: {question.user.role}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    ));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <NewQuestion onSuccess={refetchQuestions} />
      <Typography variant="h4" component="h1" gutterBottom>
        Questions
      </Typography>
      <Grid container spacing={3}>
        {renderCards()}
      </Grid>
    </Box>
  );
};

export default Questions;
