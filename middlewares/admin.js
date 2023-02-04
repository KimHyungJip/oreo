const { User } = require('../models');

module.exports = async (req, res, next) => {
  const id = 3;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(403).json({
      errorMessage: '등록된 유저가 아닙니다. 회원가입을 해주세요',
    });
  }
  if (user.is_admin !== 1) {
    return res.status(403).json({
      errorCode: res.status,
      errorMessage: '관리자 권한이 없습니다.',
    });
  }
  next();
};
