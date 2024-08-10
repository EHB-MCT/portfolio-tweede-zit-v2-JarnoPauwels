const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const questionRouter = require("./routes/questions");
const answerRouter = require("./routes/answers");

const app = express();
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/answers", answerRouter);

module.exports = app;
