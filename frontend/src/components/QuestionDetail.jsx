import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchQuestionById,
  fetchAnswersForQuestion,
  postAnswer,
} from "../service/dataService";
import {
  Box,
  Skeleton,
  Stack,
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

const QuestionDetail = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswerContent, setNewAnswerContent] = useState("");

  const fetchQuestion = async () => {
    try {
      const questionData = await fetchQuestionById(questionId);
      // console.log(questionData);
      setQuestion(questionData);

      const answerData = await fetchAnswersForQuestion(questionId);
      // console.log(answerData);
      setAnswers(answerData);
    } catch (error) {
      console.error("There was an error fetching the question!", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  const handlePostAnswer = async () => {
    try {
      await postAnswer(question.id, newAnswerContent);
      setNewAnswerContent("");
      fetchQuestion();
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
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
              // variant="outlined"
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
            <Box key={answer.id}>
              <Card
                variant="outlined"
                sx={{
                  marginBottom: 1,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      marginBottom: 1,
                    }}
                  >
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
                  </Box>
                  <Box>
                    <Typography>{answer.content}</Typography>
                  </Box>
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
          <Button size="small" onClick={handlePostAnswer}>
            Post Answer
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default QuestionDetail;
