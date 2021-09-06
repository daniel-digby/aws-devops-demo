import express = require("express");
import cors = require("cors");
import path = require("path");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

app.get("/", (_, res) => {
  res.status(200).send("hello world from server");
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
