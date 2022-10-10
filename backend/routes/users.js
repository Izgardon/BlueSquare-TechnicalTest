const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createNewUser);
router.post("/:id", usersController.editUser);

module.exports = router;
