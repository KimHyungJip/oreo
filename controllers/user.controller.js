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

  GetUserInfo = async (req, res) => {
    // const {user_id} = req.locals.user;
    const user_id = 4;
    try {
      const user = await this.UserService.FindUserInfo(user_id);
      return res.status(200).json({
        user
      })
    } catch (err) {;
        return res.status(500).json({
          errorMessage: err
        })
      }
      
    }
  }


module.exports = UserController;