const pool = require("../config/db");

module.exports = class Auth {
  constructor(data) {
    this.email = data.email;
  }

  static async createNewAccount({ email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "INSERT INTO accounts (email, password) VALUES ($1, $2);",
          [email, password]
        );
      } catch (err) {
        reject("User account could not be created");
      }
    });
  }

  static async checkForUser(queryString) {
    console.log(queryString);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE email ILIKE $1;",
          [queryString]
        );
        console.log(result.rows);
        resolve(result.rows);
      } catch (err) {
        reject("Error finding users");
      }
    });
  }

  static async getAccount(queryString) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
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
