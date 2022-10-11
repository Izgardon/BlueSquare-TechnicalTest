const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");

//checks to see if account already exists, if not it will hash and salt password and add them to accounts database
async function registerAccount(req, res) {
  try {
    let accountCheck = await Auth.checkForAccount(req.body.email.toLowerCase());
    if (accountCheck.length > 0) {
      res.status(200).json({ exists: "Account with that email exists!" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(req.body.password, salt);

      await Auth.createNewAccount({
        email: req.body.email,
        password: hashed,
      });
      res.status(201).json({ msg: "Account created" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
}

//Checks to see if user email exists in users database, as well as if account email exists in account database, if yes to both then we compare passwords
async function login(req, res) {
  let userCheck = await Auth.checkForUser(req.body.email.toLowerCase());
  let account = await Auth.checkForAccount(req.body.email.toLowerCase());
  if (userCheck.length == 0 && account.length == 0) {
    res.status(200).json({ error: "You need to create an account!" });
  } else if (userCheck.length > 0 && account.length == 0) {
    res.status(200).json({ error: "You need to create an account!" });
  } else if (userCheck.length == 0 && account.length > 0) {
    res.status(200).json({ error: "Waiting on account creation" });
  } else if (userCheck.length > 0 && account.length > 0) {
    try {
      console.log("working!");
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}

module.exports = { registerAccount, login };
