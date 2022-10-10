const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.getAll();

    res.status(200).json(allUsers);
  } catch (err) {}
}
async function createNewUser(req, res) {
  try {
    const newUser = await User.createNewUser(req.body);
  } catch (err) {}
}
async function editUser(req, res) {
  try {
    User.updateUser(req.params.id, req.body);
  } catch (err) {}
}

module.exports = { getAllUsers, createNewUser, editUser };
