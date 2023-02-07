class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  findUser = async (email) => {
    const userData = await this.userModel.findOne({ where: { email: email } });
    return userData;
  };
  createUser = async (password, phone, email, address, salt) => {
    const createData = await this.userModel.create({
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
        // attributes: ['user_id', 'phone', 'email', 'address'],
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
  destroyaccount = async (userId) => {
    const accoutdestroy = await this.userModel.destroy({
      where: { user_id: userId },
    });
    return accoutdestroy;
  };
  modifyinfo = async (userId, phone, address) => {
    const infomodify = await this.userModel.update(
      {
        phone: phone,
        address: address,
        updatedAt: new Date(),
      },
      { where: { user_id: userId } }
    );
    return infomodify;
  };
  modifypwd = async (userId, hashedPwd, salt) => {
    const pwdmodify = await this.userModel.update(
      { password: hashedPwd, salt: salt, updatedAt: new Date() },
      { where: { user_id: userId } }
    );
    return pwdmodify;
  };

  deleteUserByAdmin = async (email) => {
    const deletedUser = await this.userModel.destroy({
      where: { email },
    });
    return deletedUser;
  };
}
module.exports = UserRepository;
