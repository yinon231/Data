const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("./dbConnection");
const { donationRouter } = require("./router/donationRouter");
const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs.log"), {
  flags: "a",
});

const app = express();
module.exports = app;
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  logger(":method :url :status :res[content-length] - :response-time ms", {
    stream: accessLogStream,
  })
);
app.use("/api/donations", donationRouter);

app.use((req, res) => {
  res.status(404).json({ message: "route not found!" });
});
app.listen(port, () =>
  console.log(`Express server is running on port ${port}`)
);
