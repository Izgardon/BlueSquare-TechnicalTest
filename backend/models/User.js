const pool = require("../config/db");

module.exports = class User {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.secondname;
    this.email = data.email;
    this.number = data.number;
    this.jobrole = data.jobrole;
    this.department = data.department;
    this.isadmin = data.isadmin;
  }

  //Used by admin to add new user to database
  static async createNewUser({
    firstNameNew,
    lastNameNew,
    jobRoleNew,
    departmentNew,
    emailNew,
    numberNew,
    isAdminNew,
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "INSERT INTO users (firstname, lastname, jobrole, department, email, number, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
          [
            firstNameNew,
            lastNameNew,
            jobRoleNew,
            departmentNew,
            emailNew.toLowerCase(),
            numberNew,
            isAdminNew,
          ]
        );

        resolve();
      } catch (err) {
        reject("User account could not be created");
      }
    });
  }

  //To edit an existing user, logic done on front end to check who can do this
  static async updateUser(id, data) {
    return new Promise(async (resolve, reject) => {
      const {
        firstNameNew,
        lastNameNew,
        jobRoleNew,
        departmentNew,
        emailNew,
        numberNew,
        isAdminNew,
      } = data;
      try {
        await pool.query(
          "UPDATE users SET firstname = $1, lastname = $2, jobrole = $3, department = $4, email = $5, number = $6, isadmin = $7 WHERE id = $8 RETURNING *;",
          [
            firstNameNew,
            lastNameNew,
            jobRoleNew,
            departmentNew,
            emailNew,
            numberNew,
            isAdminNew,
            id,
          ]
        );

        resolve();
      } catch (err) {
        reject("User account could not be created");
      }
    });
  }

  //Function fires when on datapage to get every users data and put it into state
  static async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query("SELECT * FROM users ORDER BY id;");

        resolve(result.rows);
      } catch (err) {
        reject("Could not get users");
      }
    });
  }
};
