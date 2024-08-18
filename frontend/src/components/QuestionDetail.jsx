import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchQuestionById,
  fetchAnswersForQuestion,
  postAnswer,
  markAnswerAsCorrect,
} from "../service/dataService";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { getRoleColor, getRoleIcon } from "../utils/roleUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";

const QuestionDetail = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswerContent, setNewAnswerContent] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId);
    setUserId(storedUserId);
    fetchQuestion();
  }, [questionId]);

  const fetchQuestion = async () => {
    try {
      const questionData = await fetchQuestionById(questionId);
      setQuestion(questionData);

      let answerData = await fetchAnswersForQuestion(questionId);
      answerData = answerData.sort((a, b) => {
        if (a.isCorrectAnswer && !b.isCorrectAnswer) return -1;
        if (!a.isCorrectAnswer && b.isCorrectAnswer) return 1;
        return 0;
      });

      setAnswers(answerData);
    } catch (error) {
      console.error("There was an error fetching the question!", error);
    }
  };

  const handlePostAnswer = async () => {
    if (newAnswerContent.trim() === "") return; // Prevent posting empty answers
    try {
      await postAnswer(question.id, newAnswerContent, userId);
      setNewAnswerContent("");
      fetchQuestion();
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  const handleMarkAsCorrect = async (answerId) => {
    try {
      await markAnswerAsCorrect(answerId);
      fetchQuestion();
    } catch (error) {
      console.error("Error marking answer as correct:", error);
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <IconButton
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          mb: 2,
          position: "relative",
          "&:hover": {
            "& .MuiTypography-root": {
              opacity: 1,
              transform: "translateX(40px)",
            },
          },
        }}
        aria-label="back to questions"
      >
        <ArrowBackIcon />
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            position: "absolute",
            width: "200px",
            left: "-20px",
            opacity: 0,
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          Back to Questions
        </Typography>
      </IconButton>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" color="text.secondary">
              {question.user.firstName} {question.user.lastName}
            </Typography>
            <Chip
              icon={getRoleIcon(question.user.role)}
              label={question.user.role}
              size="small"
              color={getRoleColor(question.user.role)}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {formatDistanceToNow(new Date(question.created_at), {
              addSuffix: true,
            })}
          </Typography>
          <Typography variant="h3" color="text.primary" gutterBottom>
            {question.title}
          </Typography>
          <Typography variant="body1">{question.content}</Typography>
        </CardContent>

        <CardContent>
          <Typography variant="h6">Answers:</Typography>
          {answers.map((answer) => (
            <Box key={answer.id} sx={{ mb: 1 }}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" color="text.secondary">
                      {answer.user.firstName} {answer.user.lastName}
                    </Typography>
                    <Chip
                      icon={getRoleIcon(answer.user.role)}
                      label={answer.user.role}
                      size="small"
                      color={getRoleColor(answer.user.role)}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDistanceToNow(new Date(answer.created_at), {
                        addSuffix: true,
                      })}
                    </Typography>
                    {answer.isCorrectAnswer && (
                      <CheckIcon sx={{ justifyContent: "flex-end" }} />
                    )}
                    {userId === question.user.id && !answer.isCorrectAnswer && (
                      <Button
                        size="small"
                        onClick={() => handleMarkAsCorrect(answer.id)}
                      >
                        Mark as Correct
                      </Button>
                    )}
                  </Box>
                  <Typography>{answer.content}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </CardContent>

        <CardActions>
          <TextField
            value={newAnswerContent}
            onChange={(e) => setNewAnswerContent(e.target.value)}
            label="Your Answer"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button
            size="small"
            onClick={handlePostAnswer}
            disabled={!newAnswerContent.trim()}
          >
            Post Answer
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default QuestionDetail;
