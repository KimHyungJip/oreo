const { User } = require("../models/index.js");
const Sequelize = require("sequelize");

class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  // 회원 목록 조회(관리자)
  userlistget = async (users_list) => {
    try {
      const userlist = await this.userModel.findall({
        attributes: ["user_id", "phone", "email", "address"],
      });
      return userlist;
    } catch (error) {
      console.log(error);
      error.name = "Database Error";
      error.message = "요청을 처리하지 못하였습니다.";
      error.status = 400;
      throw error;
    }
  };
}

module.exports = UserRepository;
