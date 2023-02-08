//클라이언트의 요청을 처리 한 후 서버에서 처리된 결과를 반환
//예외(Exception)를  처리
const CartService = require('../services/cart.service');
const jwt = require('jsonwebtoken');

class CartController {
  // require_status 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다
  cartService = new CartService();

  //장바구니조회
  getCart = async (req, res, next) => {
    try {
    const user_id = res.locals.user.user_id;
    const cart = await this.cartService.findAllCart(user_id);
    return res.status(200).json({ cart });
    } catch (error){
      return res.status(500).json({
        errorMessage: error.message,
        error: error,
      });
    }
  };
  getAdmin = async (req, res, next) => {
    const is_admin = res.locals.user.is_admin;
    console.log("isadmin",is_admin)
    return is_admin
  }
  //장바구니 등록
  postCart = async (req, res, next) => {
    try{
    const user_id = res.locals.user.user_id;
    if(is_admin===1){
      return res.status(400).json({ message: '관리자는 등록이 불가' });
    }
    console.log("확인-----")
    const { product_id, item_quantity } = req.body;
    await this.cartService.productToCart(user_id, product_id, item_quantity);

    res.status(200).json({ message: '장바구니등록완료' });
   } catch(err){
     
   }
  };

  //장바구니 수정
  updateCart = async (req, res, next) => {
    console.log('장바구니수정controller');
    const user_id = res.locals.user.user_id;
    const { item_quantity, cart_item_id } = req.body;
    await this.cartService.updateCart(user_id, cart_item_id, item_quantity);

    res.status(200).json({ message: '장바구니수정완료' });
  };

  //장바구니 삭제
  deleteCart = async (req, res, next) => {
    const { cart_item_id } = req.body;
    await this.cartService.deleteCart(cart_item_id);
    res.status(200).json({ message: '장바구니삭제완료' });
  };
  //장바구니 주문
}

module.exports = CartController;
