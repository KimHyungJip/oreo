module.exports = async (req, res, next) => {
  const { user } = res.locals;
  if (user.is_admin !== 1) {
    return res.status(403).json({
      errorCode: res.status,
      errorMessage: '관리자 권한이없습니다.',
    });
  }
  next();
};
