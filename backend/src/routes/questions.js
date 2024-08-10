const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../db/knexfile"));
const cors = require("cors");

router.use(cors());

/**
 * @typedef {Object} Question
 * @property {string} id - Question ID
 * @property {string} title - Question title
 * @property {string} content - Question content
 * @property {string} user_id - ID of the user who posted the question
 * @property {string} created_at - Timestamp when the question was created
 */

/**
 * Get all questions.
 * @route GET /questions
 * @returns {Question[]} - Array of questions
 */
router.get("/", async (req, res) => {
  const questions = await knex.select().from("questions");
  res.json(questions);
});

/**
 * Get a question by ID.
 * @route GET /questions/{id}
 * @param {string} id.path - Question ID
 * @returns {Question} - Question object
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const question = await knex("questions").where({ id }).first();
  res.json(question);
});

/**
 * Create a new question.
 * @route POST /questions
 * @param {string} title.body.required - Question title
 * @param {string} content.body.required - Question content
 * @param {string} user_id.body.required - User ID of the question's author
 * @returns {Question} - Created question object
 */
router.post("/", async (req, res) => {
  const { title, content, user_id } = req.body;

  const [newQuestion] = await knex("questions")
    .insert({ title, content, user_id })
    .returning("*");
  res.json(newQuestion);
});

/**
 * Delete a question by ID.
 * @route DELETE /questions/{id}
 * @param {string} id.path - Question ID
 * @returns {void}
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await knex("questions").where({ id }).del();
  res.sendStatus(204);
});

module.exports = router;
