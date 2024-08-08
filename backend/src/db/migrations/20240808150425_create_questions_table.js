exports.up = function (knex) {
  return knex.schema.createTable("questions", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("content", 5000).notNullable();
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("questions");
};
