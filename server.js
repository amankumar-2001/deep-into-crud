const express = require("express");
const cors = require("cors");
const dbconfig = require("./db");
const app = express();
const routes = require("./routes");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/driveDIC", routes);

app.get("/", (req, res) => {
  res.send(`I'm ON...`);
});

app.get("/", async (req, res) => {
  res.send(`I'm ON`);
});

app.listen(port, () => {
  console.log(`Server is started with nodemon on: ${port}`);
});
