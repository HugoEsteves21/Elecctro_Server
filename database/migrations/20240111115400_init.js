/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("todo", (table) => {
    table.increments("id").primary().notNullable();
    table.string("description").notNullable();
    table.enu("state", ["INCOMPLETE", "COMPLETE"]).notNullable();
    table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime("completed_at", { precision: 6 });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("todo");
};
