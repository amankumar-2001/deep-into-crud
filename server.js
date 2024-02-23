const express = require("express");
const cors = require("cors");
const dbConfig = require("./db");
const app = express();
const routes = require("./routes");
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://client-dic.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/driveDIC", routes);

app.get("/", (req, res) => {
  res.send(`I'm ON...`);
});

app.listen(port, () => {
  console.log(`Server is started with nodemon on: ${port}`);
});
