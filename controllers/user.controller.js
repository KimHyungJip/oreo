const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { resourceLimits } = require('worker_threads');
const UserService = require('../services/user.service.js');
require('dotenv').config();

class UserController {
  userService = new UserService();

  duplication = async (req, res, next) => {
    const { email } = req.body;
    const duplicationCheck = await this.userService.findUser(email);
    if (duplicationCheck !== 0) {
      res.status(200).send({ message: '중복된 이메일 입니다.' });
    } else {
      res.status(200).send({ message: '사용 가능한 이메일 입니다.' });
    }
  };

  signup = async (req, res, next) => {
    const { password, phone, email, address } = req.body;
    const dupCheck = await this.userService.findUser(email);
    if (!dupCheck) {
      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPwd = crypto
        .pbkdf2Sync(password, salt, 99999, 64, 'sha512')
        .toString('base64');
      const signUpData = await this.userService.createUser(
        hashedPwd,
        phone,
        email,
        address,
        salt
      );
      res.status(200).send({ message: '회원가입이 성공하였습니다.' });
    } else {
      res.status(403).send({ message: '이메일 중복 체크 바랍니다.' });
    }
  };

  login = async (req, res, next) => {
    const { password, email } = req.body;
    try {
      const user = await this.userService.findUser(email);
      const hashedPwd = crypto
        .pbkdf2Sync(password, user.salt, 99999, 64, 'sha512')
        .toString('base64');
      if (user.password !== hashedPwd) {
        res.status(403).send({ message: '비밀번호가 틀렸습니다.' });
      } else {
        const is_admin = user.is_admin;
        const user_id = user.user_id;
        const payload = { user_id };
        const accessToken = jwt.sign(
          payload,
          process.env.ACCESSTOKEN_SECRET_KEY,
          { expiresIn: '3600s' }
        );
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESHTOKEN_SECRET_KEY,
          { expiresIn: '360000s' }
        );
        res.status(200).send({ accessToken, refreshToken, is_admin });
      }
    } catch (err) {
      res.status(403).send({ message: '이메일이 존재하지 않습니다.' });
    }
  };

  validationCheck = async (req, res, next) => {
    const authHeader = req.headers['authorization']; //access,refresh
    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).send({ message: '로그인 후 이용 가능합니다.' });
    } else {
      jwt.verify(token, process.env.ACCESSTOKEN_SECRET_KEY, (err, payload) => {
        if (err) {
          res.status(403).send({ message: err });
        }
        console.log(payload);
        res.locals.user = payload;
        next();
      });
    }
  };

  tokenRefresh = async (req, res, next) => {
    const refreshToken = req.body.token;
    jwt.verify(
      refreshToken,
      process.env.REFRESHTOKEN_SECRET_KEY,
      (err, payload) => {
        if (err) {
          res.status(403).send({ errorMessage: err });
        } else {
          const accessToken = jwt.sign(
            payload,
            process.env.ACCESSTOKEN_SECRET_KEY,
            { expiresIn: '3600s' }
          );
          res.status(200).send({ accessToken });
        }
      }
    );
  };
  // 회원 목록 조회(관리자)
  userlistget = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 userlistget 함수를 실행한다.
      const userlistResult = await this.UserService.userlistget();
      return res.status(200).render('managermain', {
        success: true,
        message: '회원목록을 불러왔습니다.',
        userlistResult: userlistResult,
      });
    } catch (error) {
      error.name === 'ValidationError';
      error.status = 412;
      error.success = false;
      error.message = '회원 목록을 불러오지 못했습니다.';
      return res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  };
}
module.exports = UserController;
