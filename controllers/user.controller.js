const UserService = require('../services/user.service.js');

class UserController {
  // Service
  UserService = new UserService();

  // 회원 목록 조회(관리자)
  userlistget = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 userlistget 함수를 실행한다.
      const userlistResult = await this.UserService.userlistget();
      return res.status(200).json({
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
