const UserRepository = require('../repositories/user.repository');
const { User } = require('../models/index.js');

class UserService {
  // Repository
  UserRepository = new UserRepository(User);

  // 회원 목록 조회(관리자)
  userlistget = async () => {
    try {
      // UserRepository 에서 실행한 userslistget 함수를 getuserslist 변수에 담는다.
      const getuserslist = await this.UserRepository.userlistget();
      console.log('at service.js', getuserslist);
      return getuserslist;
    } catch (error) {
      throw error;
    }
  };

  FindUserInfo = async (user_id) => {
    try {
      const user =await this.UserRepository.FindUserInfo(user_id);
      return user;
    } catch (err) {
      console.log(err);
      err.name = 'Database Error';
      err.message = '요청을 처리하지 못하였습니다.';
      err.status = 400;
      throw err;
    }
  }

}





module.exports = UserService;
