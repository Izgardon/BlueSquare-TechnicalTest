const pool = require("../config/db");

module.exports = class User {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.second_name;
    this.password = data.password;
    this.email = data.email;
    this.number = data.number;
    this.jobRole = data.jobRole;
    this.department = data.department;
  }

  static async create({ firstNameNew, lastNameNew, passwordNew, emailNew }) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "INSERT INTO users (first_name, second_name, password_digest, email) VALUES ($1, $2, $3, $4) RETURNING *;",
          [firstNameNew, lastNameNew, passwordNew, emailNew]
        );
        const user = new User(result.rows[0]);
        resolve(user);
      } catch (err) {
        reject("User account could not be created");
      }
    });
  }

  static async findUsersByEmail(queryString) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          "SELECT * FROM users WHERE email ILIKE $1;",
          [queryString]
        );
        resolve(result.rows);
      } catch (err) {
        reject("Error finding users");
      }
    });
  }
};
