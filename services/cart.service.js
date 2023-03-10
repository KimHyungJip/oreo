const CartRepository = require('../repositories/cart.repository.js');
const ProductRepository = require('../repositories/product.repository.js');
const { Cart_item } = require('../models');
const { Product } = require('../models');
class CartService {
  cartRepository = new CartRepository(Cart_item);
  productRepository = new ProductRepository(Product);
  //장바구니조회
  //상품명 판매가 상세설명 상품이미지 수량
  findAllCart = async (user_id) => {
    console.log('service진입');
    //user_id가 같은 카트아이템들 가져옴,cart_item_id, user_id, product_id,item_quantity
    const allCart = await this.cartRepository.findCart(user_id);
    const allCart_Info = allCart.map((cart) => cart.dataValues);
    //allCart의 product_id로 product정보 가져와 (상품명 판매가 상세설명 상품이미지)
    const product_Info = [];
    for (let i = 0; i < allCart.length; i++) {
      const product_id = allCart[i].dataValues.product_id;
      product_Info.push(
        await this.productRepository.findProductById(product_id)
      );
    }
    const join_cart_product = allCart_Info.map((cart) => {
      return {
        ...cart,
        product_name: product_Info.find(
          (product) => cart.product_id === product.product_id
        ).product_name,
        product_price: product_Info.find(
          (product) => cart.product_id === product.product_id
        ).product_price,
        product_image: product_Info.find(
          (product) => cart.product_id === product.product_id
        ).product_image,
        product_detail: product_Info.find(
          (product) => cart.product_id === product.product_id
        ).product_detail,
      };
    });
    return join_cart_product;
    // if (!allCart) {
    //   return -1;
    // }
  };

  //장바구니 등록
  productToCart = async (user_id, product_id, item_quantity) => {
    console.log('service진입');
    const createdCart = await this.cartRepository.createCart(
      user_id,
      product_id,
      item_quantity
    );
    return createdCart;
  };

  //장바구니 수정
  updateCart = async (user_id, cart_item_id, item_quantity) => {
    console.log('service진입');
    const updateCart = await this.cartRepository.updateCart(
      user_id,
      cart_item_id,
      item_quantity
    );
    return updateCart;
  };
  //장바구니 삭제
  deleteCart = async (cart_item_id) => {
    const deleteCart = await this.cartRepository.deleteCart(cart_item_id);
    return deleteCart;
  };
}

module.exports = CartService;
