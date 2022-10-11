const User = require("../models/User");
const Auth = require("../models/Auth");

//Gets all users and sends them to front end
async function getAllUsers(req, res) {
  try {
    const allUsers = await User.getAll();

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).send(err);
  }
}

//Creates a new user
async function createNewUser(req, res) {
  try {
    //Check if user already exists
    let userCheck = await Auth.checkForUser(req.body.emailNew.toLowerCase());
    if (userCheck.length > 0) {
      res.status(200).json({ exists: "User already exists!" });
    } else {
      //Create user
      await User.createNewUser(req.body);
      res.status(200).json({ msg: "Successfully added!" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

//Edits a user with the param.id of the database.id
async function editUser(req, res) {
  try {
    User.updateUser(+req.params.id, req.body);
    res.status(200).json({ msg: "Successfully changed!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteUser(req, res) {
  try {
    User.deleteUser(+req.params.id);
    res.status(200).json({ msg: "Successfully removed user" });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { getAllUsers, createNewUser, editUser, deleteUser };
