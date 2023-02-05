const OrderService = require('../services/order.service');

class OrderController {
  // Service
  OrderService = new OrderService();

  // 주문 목록 조회(관리자)
  getOrderList = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 getOrderList 로직을 실행한다.
      const orderlistResult = await this.OrderService.getOrderList();

      return res.status(200).json({
        success: true,
        message: '주문목록을 불러왔습니다.',
        orderlistResult: orderlistResult,
      });
    } catch (error) {
      error.name === 'ValidationError';
      error.status = 412;
      error.success = false;
      error.message = '주문 목록을 불러오지 못했습니다.';
      return res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  };

  //주문(cart_items들)
  postOrder=async (req, res, next) => {
    console.log("주문controller")
    //const user_id = res.locals.user.user_id;
    const user_id =3
    //user_id가 같은 cart_items를 모드 가져와
    //order table user_id
    //order_items table product_id order_id item_quantity
    await this.OrderService.postOrder(user_id);
    res.status(200).json({ message: '주문완료' });
  };
}

module.exports = OrderController;
