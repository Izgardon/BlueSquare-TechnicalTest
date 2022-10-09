const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");

async function registerAccount(req, res) {
  try {
    const user = await User.findUsersByEmail(req.body.email);

    if (!user.length) {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(req.body.password, salt);

      let person = await Auth.createNewAccount({
        email: req.body.email,
        password: hashed,
      });
      res.status(201).json({ msg: "Account created" });
    } else {
      throw new Error("Account already on system");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
}
async function login(req, res) {
  //Need email in req.body to send through to check
  //Need password to compare
  try {
    //checkForUser, then getAccount
  } catch (err) {}
}

module.exports = { registerAccount, login };
