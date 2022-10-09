const db = require("./db");
const fs = require("fs");

const setup = fs.readFileSync(__dirname + "/setup.sql").toString();

db.query(setup, () => console.log("Dev database seeded"));
