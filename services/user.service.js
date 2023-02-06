const UserRepository = require('../repositories/user.repository.js');
const { User } = require('../models');

class UserService {
  userRepository = new UserRepository(User);
  findUser = async (email) => {
    const userData = await this.userRepository.findUser(email);
    if (!userData) {
      return 0;
    }
    return {
      user_id: userData.user_id,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      address: userData.address,
      is_admin: userData.is_admin,
      salt: userData.salt,
    };
  };
  createUser = async (password, phone, email, address, salt) => {
    const createData = await this.userRepository.createUser(
      password,
      phone,
      email,
      address,
      salt
    );
    return createData;
  };
  // 회원 목록 조회(관리자)
  userlistget = async () => {
    try {
      // UserRepository 에서 실행한 userslistget 함수를 getuserslist 변수에 담는다.
      const getuserslist = await this.userRepository.userlistget();
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
