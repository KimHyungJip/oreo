const OrderService = require('../services/order.service');

class OrderController {
  // Service
  orderService = new OrderService();

  // 주문 목록 조회(관리자)
  getOrderList = async (req, res, next) => {
    try {
      const orderList = await this.orderService.getOrderList();
      return res.status(200).json({
        success: true,
        message: '주문목록을 불러왔습니다.',
        orderList,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
        error: error,
      });
    }
  };

  // 주문 목록 조회(사용자)
  getOrdersByUserId = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const userOrders = await this.orderService.getOrdersByUserId(user_id);
      return res.status(200).json({ userOrders });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  //주문(cart_items들)
  postOrder = async (req, res, next) => {
    console.log('주문controller');
    //const user_id = res.locals.user.user_id;
    const user_id = 3;
    //user_id가 같은 cart_items를 모드 가져와
    //order table user_id
    //order_items table product_id order_id item_quantity
    await this.OrderService.postOrder(user_id);
    res.status(200).json({ message: '주문완료' });
  };
}

module.exports = OrderController;
