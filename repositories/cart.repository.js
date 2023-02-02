const {cart_item} = require("../models");
const {product} = require('../models');

class CartRepository {//서비스 계층에서 내가줄 모델을 고를 수 있다.
  

  //user_id로 장바구니 검색
  findCart = async (user_id) => {
    const getCartdata = await this.cart_item.findAll({
      raw:true,//풀어버림 데이터삭제
      include:[
        {
          model:product,
          required: true,
          attributes:[]
        }
      ],
      attributes:['product.name','product.image','product.price','product_id','item_quantity','user_id'],
      where: {user_id:user_id}
    });
    return getCartdata;
  }




  createUser = async (email, name, phone, address, pw, user_type, point) => {
    console.log('레파지토리 진입');
    const userData = await this.UserModel.findOne({
      raw: true,
      where: {
        [Op.or]: [
          { email },
          { name },
          { phone },
        ]
      },
      attributes: [
        'email',
        'name',
        'phone',
      ]
    });

    if (userData) {
      return userData;
    }

    // console.log('레파지토리 퇴장');
    await this.UserModel.create({ email, name, phone, address, pw, user_type, point });
    return 1;
  }

  findUser = async (email) => {
    console.log('로그인 레파짓토리 진입');
    console.log(email);
    const createUserData = await this.UserModel.findOne({ raw: true, where: { email } });
    console.log('여기입니다',createUserData);
    return createUserData;
  }

  findId = async (userId) => {
    const createUserData = await this.UserModel.findByPk(userId);
    return createUserData;
  }
}

module.exports = CartRepository;