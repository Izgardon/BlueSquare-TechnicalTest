const { query } = require("express");
const pool = require("../config/db");

module.exports = class Auth {
  constructor(data) {
    this.email = data.email;
  }

  static async createNewAccount({ email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        await pool.query(
          "INSERT INTO accounts (email, password) VALUES ($1,$2);",
          [email, password]
        );
        resolve();
      } catch (err) {
        reject("User account could not be created");
      }
    });
  }

  static async checkForUser(queryString) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1;",
          [queryString]
        );

        resolve(result.rows);
      } catch (err) {
        reject("Error finding users");
      }
    });
  }

  static async checkForAccount(queryString) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "SELECT * FROM accounts WHERE email = $1;",
          [queryString]
        );

        resolve(result.rows);
      } catch (err) {
        reject("Error finding users");
      }
    });
  }
};
