//클라이언트의 요청을 처리 한 후 서버에서 처리된 결과를 반환
//예외(Exception)를  처리
const CartService = require('../services/cart.service');
const jwt = require('jsonwebtoken');

class CartController {
  // require_status 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다
  cartService = new CartService();

    //장바구니조회
    getCart = async(req,res,next)=>{
        console.log("장바구니조회controller")
        const user_id = res.locals.user.user_id;
        const cart = await this.cartService.findAllCart(user_id);
        res.status(200).json({data:cart});
    };

    //cart_item 등록
    postCart = async(req,res,next)=>{
        console.log("장바구니등록controller")
        const user_id = res.locals.user.user_id;
        
        const { product_id, item_quantity } = req.body;
        await this.cartService.productToCart(user_id,product_id, item_quantity);

    res.status(200).json({ message: '장바구니등록완료' });
  };

    //cart_item 수정
    updateCart = async(req,res,next)=>{
        console.log("장바구니수정controller")
        const user_id = res.locals.user.user_id;
        
        const {  item_quantity ,product_id} = req.body;
        await this.cartService.updateCart(user_id,product_id, item_quantity);

    res.status(200).json({ message: '장바구니수정완료' });
  };

    //장바구니 삭제
    deleteCart = async(req,res,next)=>{
        const { cart_item_id } = req.body;
        await this.cartService.deleteCart(cart_item_id);
        res.status(200).json({ message: '장바구니등록완료' });
    } 

}

module.exports = CartController;
