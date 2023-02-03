const OrderRepository = require("../repositories/order.repository");

class OrderService {
  // Repository
  OrderRepository = new OrderRepository();

  // 주문 목록 조회(관리자)
  getorderlist = async () => {
    try {
      // OrderRepository에서 실행한 orderslistget 함수를 getorderslist 변수에 담는다.
      const getorderslist = this.OrderRepository.orderslistget;

      return getorderslist;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = OrderService;
