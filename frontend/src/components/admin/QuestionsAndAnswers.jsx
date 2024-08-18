import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Paper,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { getRoleColor, getRoleIcon } from "../../utils/roleUtils";

const QuestionsAndAnswers = ({
  questions,
  answers,
  handleDeleteQuestion,
  handleDeleteAnswer,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography variant="h5" component="h2">
          Questions and Answers
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {questions.map((question) => (
          <Paper elevation={3} sx={{ p: 2, mb: 2 }} key={question.id}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6">{question.title}</Typography>
                <Typography variant="body1" gutterBottom>
                  {question.content}
                </Typography>
                <Typography variant="body">
                  Asked by
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {` ${question.user.firstName} ${question.user.lastName} `}{" "}
                    <Chip
                      icon={getRoleIcon(question.user.role)}
                      label={question.user.role}
                      size="small"
                      color={getRoleColor(question.user.role)}
                    />
                  </span>{" "}
                  on{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {new Date(question.created_at).toLocaleString()}
                  </span>
                </Typography>
              </Box>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteQuestion(`question-${question.id}`)}
                sx={{ "&:hover": { color: red[500] } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" component="p" sx={{ mb: 1 }}>
              Answers:
            </Typography>
            <List>
              {answers[question.id]?.map((answer) => (
                <ListItem
                  key={answer.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemText
                    primary={answer.content}
                    secondary={`by ${answer.user.firstName} ${answer.user.lastName}`}
                  />
                  <IconButton
                    aria-label="delete answer"
                    onClick={() =>
                      handleDeleteAnswer(`answer-${question.id}-${answer.id}`)
                    }
                    sx={{ "&:hover": { color: red[500] } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionsAndAnswers;
