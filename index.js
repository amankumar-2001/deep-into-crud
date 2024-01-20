const express = require("express");
const cors = require("cors");
const dbconfig = require("./db");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/driveDIC", routes);

app.get("/", (req, res) => {
  res.send(`I'm ON...`);
});

app.listen(5001, () => {
  console.log("Drive-DIC running on 5001");
});
