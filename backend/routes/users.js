const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/", usersController.getAllUsers);
router.post("/", usersController.addNewUser);
router.patch("/<id>", usersController.editUser);

module.exports = router;
