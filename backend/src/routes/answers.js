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
