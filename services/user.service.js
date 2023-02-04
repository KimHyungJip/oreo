const UserRepository = require('../repositories/user.repository.js');

class UserService {
  userRepository = new UserRepository();
  findUser = async (email) => {
    const userData = await this.userRepository.findUser(email);
    if (!userData) {
      return 0;
    }
    return userData;
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
      const getuserslist = await this.UserRepository.userlistget();
      console.log('at service.js', getuserslist);
      return getuserslist;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = UserService;
