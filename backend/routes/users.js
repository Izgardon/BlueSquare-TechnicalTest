const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createNewUser);
router.post("/:id", usersController.editUser);
router.patch("/:id", usersController.deleteUser);

module.exports = router;
