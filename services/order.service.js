const OrderRepository = require('../repositories/order.repository');
const { Order } = require('../models/index.js');

class OrderService {
  // Repository
  orderRepository = new OrderRepository(Order);

  // 주문 목록 조회(관리자)
  getOrderList = async () => {
    try {
      // OrderRepository에서 실행한 orderslistget 함수를 getorderslist 변수에 담는다.
      const ordersList = await this.orderRepository.getOrderList();
      return ordersList;
    } catch (error) {
      throw error;
    }
  };

  // 주문 목록 조회(사용자)
  getOrdersByUserId = async (user_id) => {
    const orders = await this.orderRepository.getOrdersByUserId(user_id);
    // return orders.map((order) => {
    //   return {
    //     order_id: order.order_id,
    //     user_id: order.user_id,
    //     order_items: order.order_item
    //     //     .map((item) => {
    //     //   return {
    //     //     product_id: item.product_id,
    //     //     item_quantity: item.item_quantity,
    //     //   }
    //     // }),
    //   }
    // }); // 어딘가의 map에서 자꾸 꼬인다.
    return orders;
  }
}

module.exports = OrderService;
