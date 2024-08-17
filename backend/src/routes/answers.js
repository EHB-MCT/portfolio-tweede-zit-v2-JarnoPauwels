const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../db/knexfile"));
const cors = require("cors");

router.use(cors());

/**
 * @typedef {Object} Answer
 * @property {string} id - Answer ID
 * @property {string} content - Answer content
 * @property {string} question_id - ID of the question this answer belongs to
 * @property {string} user_id - ID of the user who posted the answer
 * @property {string} created_at - Timestamp when the answer was created
 */

/**
 * Get all answers for a question.
 * @route GET /answers/question/{question_id}
 * @param {string} question_id.path - Question ID
 * @returns {Answer[]} - Array of answers for the question
 */
router.get("/question/:question_id", async (req, res) => {
  const { question_id } = req.params;
  const answers = await knex("answers").where({ question_id });
  res.json(answers);
});

/**
 * Create a new answer for a question.
 * @route POST /answers/question/{question_id}
 * @param {string} question_id.path - Question ID
 * @param {string} content.body.required - Answer content
 * @param {string} user_id.body.required - User ID of the answer's author
 * @returns {Answer} - Created answer object
 */
router.post("/question/:question_id", async (req, res) => {
  const { question_id } = req.params;
  const { content, user_id } = req.body;

  const [newAnswer] = await knex("answers")
    .insert({ question_id, user_id, content })
    .returning("*");
  res.json(newAnswer);
});

/**
 * Mark an answer as correct.
 * @route POST /questions/{question_id}/answers/{answer_id}/correct
 * @param {string} question_id.path - Question ID
 * @param {string} answer_id.path - Answer ID
 * @returns {object} - Updated answer object
 */
router.post("/:answer_id/correct", async (req, res) => {
  const { answer_id } = req.params;

  try {
    const [updatedAnswer] = await knex.transaction(async (trx) => {
      return trx("answers")
        .where({ id: answer_id })
        .update({ isCorrectAnswer: true })
        .returning("*");
    });

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.json(updatedAnswer);
  } catch (error) {
    console.error("Error marking answer as correct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Delete an answer by ID.
 * @route DELETE /answers/{id}
 * @param {string} id.path - Answer ID
 * @returns {void}
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await knex("answers").where({ id }).del();
  res.sendStatus(204);
});

module.exports = router;
