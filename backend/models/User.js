const pool = require("../config/db");

module.exports = class User {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.second_name;
    this.email = data.email;
    this.number = data.number;
    this.jobRole = data.jobRole;
    this.department = data.department;
    this.isAdmin = data.isAdmin;
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
          "INSERT INTO users (firstname, lastname, jobrole, department, email, number, isadmin) VALUES ($1, $2, $3, $4, $5, 6$, 7$) RETURNING *;",
          [
            firstNameNew,
            lastNameNew,
            jobRoleNew,
            departmentNew,
            emailNew,
            numberNew,
            isAdminNew,
          ]
        );
        console.log(result.rows);
        const user = new User(result.rows[0]);
        resolve(user);
      } catch (err) {
        reject("User account could not be created");
      }
    });
  }

  //Function fires when on datapage to get every users data and put it into state
  static async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query("SELECT * FROM users");
        console.log(result.rows);
        resolve(result.rows);
      } catch (err) {
        reject("Could not get users");
      }
    });
  }
};
