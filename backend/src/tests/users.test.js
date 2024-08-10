const request = require("supertest");
const knex = require("knex")(require("../db/knexfile"));
const app = require("../app");
const http = require("http");

let server;

describe("Users API", () => {
  let testUser;

  beforeAll(async () => {
    server = http.createServer(app);
    server.listen(0);
  });

  afterAll(async () => {
    // await knex("users").where({ email: "testuser" }).del();
    server.close();
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = {
        firstName: "testuserFirst",
        lastName: "testuserLast",
        password: "testpassword",
        email: "testuser",
        role: "student",
      };
      const response = await request(app).post("/users").send(newUser);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.email).toBe(newUser.email);
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /users/:id", () => {
    it("should get a user by ID", async () => {
      const existingUser = await knex("users").first();
      const response = await request(app).get(`/users/${existingUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe(existingUser.id);
    });
  });

  describe("POST /users/login", () => {
    it("should log in a user with valid credentials", async () => {
      // const existingUser = await knex("users").first();
      const credentials = {
        email: "testuser",
        password: "testpassword",
      };
      const response = await request(app)
        .post("/users/login")
        .send(credentials);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.email).toBe(credentials.email);
    });

    it("should return 401 for invalid email", async () => {
      const credentials = {
        email: "nonexistentuser",
        password: "testpassword",
      };
      const response = await request(app)
        .post("/users/login")
        .send(credentials);
      expect(response.status).toBe(401);
    });

    it("should return 401 for invalid password", async () => {
      // const existingUser = await knex("users").first();
      const credentials = {
        email: "testuser",
        password: "wrongpassword",
      };
      const response = await request(app)
        .post("/users/login")
        .send(credentials);
      expect(response.status).toBe(401);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user by ID", async () => {
      const existingUser = await knex("users")
        .where({ email: "testuser" })
        .first();
      const response = await request(app).delete(`/users/${existingUser.id}`);
      expect(response.status).toBe(204);

      const userAfterDeletion = await knex("users")
        .where({ id: existingUser.id })
        .first();
      expect(userAfterDeletion).toBeUndefined();
    });
  });
});
