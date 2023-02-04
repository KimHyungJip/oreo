const CartRepository = require('../repositories/cart.repository.js');
const {Cart} = require('../models');

class CartService {
  cartRepository = new CartRepository(Cart);

  findAllCart = async(user_id)=>{
    console.log("service진입")
    const allCart = await this.cartRepository.findCart(user_id);
    if(!allCart){
        return -1
    }
    console.log("allCart : ",allCart)
    return allCart
  }

  productToCart = async(user_id,product_id, item_quantity)=>{
    const createdCart = await this.cartRepository.createCart(user_id,product_id,item_quantity);
    return createdCart;
  }

  
  updateCart = async(user_id,product_id, item_quantity)=>{
    const updateCart = await this.cartRepository.updateCart(user_id,product_id,item_quantity);
    return updateCart;

  }
  deleteCart = async(cart_item_id)=>{
    const deleteCart = await this.cartRepository.deleteCart(cart_item_id);
    return deleteCart;

  }
}

module.exports = CartService;