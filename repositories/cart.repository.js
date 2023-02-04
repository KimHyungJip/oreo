
class CartRepository {//서비스 계층에서 내가줄 모델을 고를 수 있다.
  constructor(cart_item) {
    this.cart_item = cart_item;
  }
  //user_id로 장바구니 검색
  findCart = async (user_id) => {
    console.log("장바구니검색 repo ")
    const getCartdata = await this.cart_item.findAll({
      where: {user_id:user_id}
    });
    return getCartdata;
  }

  //장바구니에 상품 등록
  createCart= async (user_id,product_id,item_quantity) => {
    console.log("장바구니검색 repo ",user_id,product_id,item_quantity)
    const createCartdata = await this.cart_item.create({
      user_id,product_id,item_quantity
    });
    return createCartdata;
  }

  //product_id로 장바구니에 있는 아이템량 수정
  updateCart= async (user_id,product_id,item_quantity) => {
    const updateCartdata = await this.cart_item.update(
    { item_quantity},
    {
      where: {product_id}
    });
    return updateCartdata;
  }
  //cart_item_id로 장바구니 삭제
  deleteCart= async (cart_item_id) => {
    const deleteCartdata = await this.cart_item.destroy({
      where: {cart_item_id}
    });
    return deleteCartdata;
  }
}

module.exports = CartRepository;