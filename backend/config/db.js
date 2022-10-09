const { Pool } = require("pg");

const databaseUrl = "postgresql://postgres:password@localhost:5432/users";

const pool = new Pool({ connectionString: databaseUrl });

module.exports = pool;
