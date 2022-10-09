const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());

//Routes
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to BlueSquare database"));

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

app.listen(process.env.PORT || 8080, () => {
  const PORT = process.env.PORT || 8080;
  console.log(`server running  in ${process.env.NODE_ENV} mode on ${PORT}`);
});

module.exports = app;
