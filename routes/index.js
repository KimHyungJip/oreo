const express = require("express");
const router = express.Router();

const orderRouter = require("./order.routes");
const userRouter = require("./user.routes");

router.use("/orders", orderRouter);
router.use("/users", userRouter);

module.exports = router;
