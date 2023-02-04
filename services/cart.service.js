const CartRepository = require('../repositories/cart.repository.js');
const {Cart_item} = require('../models');

class CartService {
  cartRepository = new CartRepository(Cart_item);
  //장바구니조회
  findAllCart = async(user_id)=>{
    console.log("service진입")
    const allCart = await this.cartRepository.findCart(user_id);
    if(!allCart){
        return -1
    }
    return allCart.map(cart=>cart.dataValues)
  }

    //장바구니 등록
  productToCart = async(user_id,product_id, item_quantity)=>{
    console.log("service진입")
    const createdCart = await this.cartRepository.createCart(user_id,product_id,item_quantity);
    return createdCart;
  }

  //장바구니 수정
  updateCart = async(user_id,product_id, item_quantity)=>{
    const updateCart = await this.cartRepository.updateCart(user_id,product_id,item_quantity);
    return updateCart;

  }
  //장바구니 삭제
  deleteCart = async(cart_item_id)=>{
    const deleteCart = await this.cartRepository.deleteCart(cart_item_id);
    return deleteCart;

  }
}

module.exports = CartService;