const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.getAll();

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).send(err);
  }
}
async function createNewUser(req, res) {
  try {
    await User.createNewUser(req.body);
    res.status(200).json({ msg: "Successfully added!" });
  } catch (err) {
    res.status(500).send(err);
  }
}
async function editUser(req, res) {
  try {
    User.updateUser(req.params.id, req.body);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { getAllUsers, createNewUser, editUser };
