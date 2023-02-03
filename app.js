const express = require("express");
const app = express();

const router = require("./routes");
require("dotenv").config();

app.use(express.json());
app.use("/", router);

app.listen(7000, () => {
  console.log("7000번 포트로 서버가 열렸습니다.");
});

// module.exports = httpserver;
