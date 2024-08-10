const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../db/knexfile"));
const cors = require("cors");

router.use(cors());

/**
 * @typedef {Object} User
 * @property {string} id - User ID (UUID)
 * @property {string} username - User's username
 */

/**
 * Get all users.
 * @route GET /users
 * @returns {User[]} - Array of users
 */
router.get("/", async (req, res) => {
  const users = await knex.select().from("users");
  res.json(users);
});

/**
 * Get a user by ID.
 * @route GET /users/{id}
 * @param {string} id.path - User ID (UUID)
 * @returns {User} - User object
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await knex("users").where({ id }).first();
  res.json(user);
});

/**
 * Create a new user.
 * @route POST /users
 * @param {string} username.body.required - User's username
 * @param {string} password.body.required - User's password
 * @returns {User} - Created user object
 */
router.post("/", async (req, res) => {
  const { firstName, lastName, password, email, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await knex("users")
    .insert({ firstName, lastName, password: hashedPassword, email, role })
    .returning("*");
  res.json(newUser);
});

/**
 * Delete a user by ID.
 * @route DELETE /users/{id}
 * @param {string} id.path - User ID (UUID)
 * @returns {void}
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await knex("users").where({ id }).del();
  res.sendStatus(204);
});

module.exports = router;
