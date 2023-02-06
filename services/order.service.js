const OrderRepository = require('../repositories/order.repository');
const { Order } = require('../models/index.js');

class OrderService {
  // Repository
  orderRepository = new OrderRepository(Order);

  // 주문 목록 조회(관리자)
  getOrderList = async () => {
    try {
      // OrderRepository에서 실행한 orderslistget 함수를 getorderslist 변수에 담는다.
      const getorderslist = await this.orderRepository.getorderlist();

      return getorderslist;
    } catch (error) {
      throw error;
    }
  };

  // 주문 목록 조회(사용자)
  getOrdersByUserId = async (user_id) => {
    try {
      const userId = await this.orderRepository.getOrdersByUserId(user_id);
      return userId[0];
    } catch (error) {
      throw error;
    }
  };
}

module.exports = OrderService;
