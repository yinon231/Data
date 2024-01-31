const express = require("express");
// const logger = require("morgan");

const app = express();
// const { donationRouter } = require("./router/donationRouter");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger("dev")); // app.use(logger("combined"));
// app.use("/donation", donationRouter);
require("./dbConnection");

app.listen(port, () =>
  console.log(`Express server is running on port ${port}`)
);
app.use((req, res) => {
  res.status(400).send("Something is broken!");
});
