const request = require("supertest");
const knex = require("knex")(require("../db/knexfile"));
const app = require("../app");
const http = require("http");

let server;

describe("Questions API", () => {
  let testUser;

  beforeAll(async () => {
    server = http.createServer(app);
    server.listen(0);

    testUser = await knex("users")
      .insert({
        firstName: "testuserQuestionsFirst",
        lastName: "testuserQuestionsLast",
        email: "testuserQuestions@example.com",
        password: "testpassword",
        role: "student",
      })
      .returning("*")
      .then((rows) => rows[0]);
  });

  afterAll(async () => {
    await knex("questions").del();
    await knex("users").where({ email: "testuserQuestions@example.com" }).del();

    server.close();
  });

  describe("POST /questions", () => {
    it("should create a new question", async () => {
      const newQuestion = {
        title: "Test Question",
        content: "This is a test question.",
        user_id: testUser.id,
      };
      const response = await request(app).post("/questions").send(newQuestion);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.title).toBe(newQuestion.title);
    });
  });

  describe("GET /questions", () => {
    it("should get all questions", async () => {
      const response = await request(app).get("/questions");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /questions/:id", () => {
    it("should get a question by ID", async () => {
      const existingQuestion = await knex("questions").first();
      const response = await request(app).get(
        `/questions/${existingQuestion.id}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe(existingQuestion.id);
    });
  });

  describe("DELETE /questions/:id", () => {
    it("should delete a question by ID", async () => {
      const existingQuestion = await knex("questions").first();
      const response = await request(app).delete(
        `/questions/${existingQuestion.id}`
      );
      expect(response.status).toBe(204);

      const questionAfterDeletion = await knex("questions")
        .where({ id: existingQuestion.id })
        .first();
      expect(questionAfterDeletion).toBeUndefined();
    });
  });
});
