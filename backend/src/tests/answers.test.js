const request = require("supertest");
const knex = require("knex")(require("../db/knexfile"));
const app = require("../app");
const http = require("http");

let server;

describe("Answers API", () => {
  let testUser, testQuestion;

  beforeAll(async () => {
    server = http.createServer(app);
    server.listen(0);

    // Create a new user with a unique email
    testUser = await knex("users")
      .insert({
        firstName: "testuserAnswerFirst",
        lastName: "testuserAnswerLast",
        email: `testuserAnswer@example.com`,
        password: "testpassword",
        role: "student",
      })
      .returning("*")
      .then((rows) => rows[0]);

    // Create a new question for the test user
    testQuestion = await knex("questions")
      .insert({
        title: "Test Question",
        content: "This is a test question.",
        user_id: testUser.id,
        created_at: new Date(),
      })
      .returning("*")
      .then((rows) => rows[0]);

    // Ensure that the testQuestion was correctly inserted
    expect(testQuestion).toBeDefined();
    expect(testQuestion.id).toBeDefined();
  });

  afterAll(async () => {
    // Clean up the database
    await knex("answers").del();
    await knex("questions").del();
    await knex("users").where({ email: "testuserAnswer@example.com" }).del();
    server.close();
  });

  describe("POST /answers/question/:question_id", () => {
    it("should create a new answer", async () => {
      const newAnswer = {
        content: "This is a test answer.",
        user_id: testUser.id,
      };
      const response = await request(app)
        .post(`/answers/question/${testQuestion.id}`)
        .send(newAnswer);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.content).toBe(newAnswer.content);
    });
  });

  describe("GET /answers/question/:question_id", () => {
    it("should get all answers for a question", async () => {
      const response = await request(app).get(
        `/answers/question/${testQuestion.id}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("DELETE /answers/:id", () => {
    it("should delete an answer by ID", async () => {
      // Create a new answer to delete
      const newAnswer = await knex("answers")
        .insert({
          content: "This is a test answer to be deleted.",
          question_id: testQuestion.id,
          user_id: testUser.id,
          created_at: new Date(),
        })
        .returning("*")
        .then((rows) => rows[0]);

      // Check that the newAnswer was correctly inserted
      expect(newAnswer).toBeDefined();
      expect(newAnswer.id).toBeDefined();

      const response = await request(app).delete(`/answers/${newAnswer.id}`);
      expect(response.status).toBe(204);

      const answerAfterDeletion = await knex("answers")
        .where({ id: newAnswer.id })
        .first();
      expect(answerAfterDeletion).toBeUndefined();
    });
  });
});
