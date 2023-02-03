const express = require("express");
const router = express.Router();

// controllers
const UserController = require("../controllers/user.controller");
const userController = new UserController();

// 회원 목록 조회(관리자)
router.get("/admin", userController.userlistget);

module.exports = router;
