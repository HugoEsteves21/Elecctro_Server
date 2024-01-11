const knex = require("knex");
const knexfile = require("./knexfile");

const db = knex(knexfile.development);

// for PROD don't acess knexfile.development directly.
// Use .env vars to decide which config to use

module.exports = db;