exports.up = function (knex) {
  return knex.schema.createTable("answers", (table) => {
    table.increments("id").primary();
    table
      .integer("question_id")
      .references("id")
      .inTable("questions")
      .notNullable()
      .onDelete("CASCADE");
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    table.string("content", 5000).notNullable();
    table.boolean("isCorrectAnswer").defaultTo(false).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("answers");
};
