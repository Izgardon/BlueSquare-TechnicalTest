const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/", (req, res) => res.send("Here in auth"));
router.post("/register", authController.registerAccount);
router.post("/login", authController.login);

module.exports = router;
