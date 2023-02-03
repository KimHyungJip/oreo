//클라이언트의 요청을 처리 한 후 서버에서 처리된 결과를 반환
//예외(Exception)를  처리 
const CartService = require('../services/cart.service');
const jwt = require('jsonwebtoken');


class CartController{
    // require_status 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다
    cartService = new CartService();

    //장바구니조회
    getCart = async(req,res,next)=>{
        const user_id = res.locals.user.user_id;
        const cart = await this.cartService.findAllCart(user_id);
        //console.log("컨트롤러확인",cart,jwt.sign);
        res.status(200).json({data:cart});
    };

    //장바구니 등록
    postCart = async(req,res,next)=>{
        const user_id = res.locals.user.user_id;
        const { product_id, quantity } = req.body;
        await this.CartService.productToCart(user_id,product_id, quantity);

        res.status(200).json({ message: '장바구니등록완료' });
    }

    //장바구니 수정



    updateRequireStatus = async(req,res,next)=>{
        //빨래번호받아와
        const {request_id} = req.params;
        //수정하려는 사람id, 수정하려는 상태
        const {current_status} = req.body;
        const provider_id = res.locals.user.user_id;//토큰에서 빼오는 user_id
        //console.log("provider_id,controller",provider_id)
        //console.log('controller확인',request_id,provider_id,current_status);
        // console.log(req.params);
        // console.log(req.body);
        const updateRequireStatus = await this.getallService.updateRequireStatus(request_id,provider_id,current_status);

        res.status(200).json({data:updateRequireStatus});
    };

    //장바구니 삭제

    //장바구니 주문
}

module.exports = CartController;