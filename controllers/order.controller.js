const OrderService = require('../services/order.service');

class OrderController {
  // Service
  orderService = new OrderService();

  // 주문 목록 조회(관리자)
  getOrderList = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 getorderlist 로직을 실행한다.
      const orderlistResult = await this.orderService.getOrderList();
      console.log(orderlistResult);
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
    const { user_id } = res.locals.user;
    await this.orderService.postOrder(user_id);
    res.status(200).json({ message: '주문완료' });
  };
}

module.exports = OrderController;
