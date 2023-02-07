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
  destroyaccout = async (userId) => {
    const accountdestroy = await this.userRepository.destroyaccount(userId);
    return accountdestroy;
  };
  modifyinfo = async (userId, email, phone, address) => {
    const infomodify = await this.userRepository.modifyinfo(
      userId,
      email,
      phone,
      address
    );
    return infomodify;
  };
  modifypwd = async (userId, hashedPwd, salt) => {
    const pwdmodify = await this.userRepository.modifypwd(
      userId,
      hashedPwd,
      salt
    );
    return pwdmodify;
  };

  deleteUserByAdmin = async (email) => {
    let targetUser = await this.userRepository.findUser(email);
    if (!targetUser) {
      throw new Error('해당하는 유저가 존재하지 않습니다.');
    }
    return await this.userRepository.deleteUserByAdmin(email);
  };
}
module.exports = UserService;
