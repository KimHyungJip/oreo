const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인이 필요한 기능입니다.',
    });
    return;
  }

  try {
    const { user_id } = jwt.verify(
      authToken,
      process.env.ACCESSTOKEN_SECRET_KEY
    );
    User.findByPk(user_id).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: '로그인이 필요한 기능입니다.',
    });
  }
};
