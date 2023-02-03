const { User } = require('../models');
class UserRepository {
  findUser = async (email) => {
    const userData = await User.findOne({ where: { email: email } });
    return userData;
  };
  createUser = async (password, phone, email, address, salt) => {
    const createData = await User.create({
      password: password,
      phone: phone,
      email: email,
      address: address,
      salt: salt,
    });
    return createData;
  };
  // 회원 목록 조회(관리자)
  userlistget = async () => {
    try {
      const userlist = await this.userModel.findAll({
        attributes: ['user_id', 'phone', 'email', 'address'],
      });
      return userlist;
    } catch (error) {
      console.log(error);
      error.name = 'Database Error';
      error.message = '요청을 처리하지 못하였습니다.';
      error.status = 400;
      throw error;
    }
  };
}
module.exports = UserRepository;
