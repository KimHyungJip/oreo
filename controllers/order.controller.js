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
}

module.exports = OrderController;
