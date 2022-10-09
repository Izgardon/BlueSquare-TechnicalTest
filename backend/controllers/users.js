const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
  } catch (err) {}
}
async function createNewUser(req, res) {
  try {
    //createNewUser
  } catch (err) {}
}
async function editUser(req, res) {
  try {
    User.updateUser(req.params.id);
    req.params.id;
  } catch (err) {}
}

module.exports = { getAllUsers, createNewUser, editUser };
