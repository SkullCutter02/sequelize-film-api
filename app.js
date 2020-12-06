const express = require("express");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

app.use("/films", require("./routes/films"));
app.use("/actors", require("./routes/actors"));

app.get("/", (req, res) => {
  res.send("<h1>Film API</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
