const express = require("express");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

app.use("/films", require("./routes/films"));
app.use("/actors", require("./routes/actors"));

app.get("/", (req, res) => {
  res.send("<h1>Film API</h1>");
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "alan",
    email: "alan@gmail.com",
  };

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({ token: token });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
