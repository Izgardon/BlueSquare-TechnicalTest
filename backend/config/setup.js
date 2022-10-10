const pool = require("./db");
const fs = require("fs");

const setup = fs.readFileSync("config/1_setup.sql", { encoding: "utf8" });

pool.query(setup, () => console.log("Dev database setup"));
