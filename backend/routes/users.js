const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/", usersController.findByEmailOrName);
router.post("/", usersController.findUsersSummary);
router.patch("/<id>", usersController.findUsersSummary);

module.exports = router;
