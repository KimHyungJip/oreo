const OrderRepository = require('../repositories/order.repository');
const OrderItemRepository = require('../repositories/order_item.repository');
const CartRepository = require('../repositories/cart.repository.js');
const { Cart_item } = require('../models');
const { Order_item } = require('../models');
const { Order } = require('../models');

class OrderService {
  // Repository
  orderRepository = new OrderRepository(Order);
  cartRepository = new CartRepository(Cart_item);
  orderItemRepository = new OrderItemRepository(Order_item);

  // 주문 목록 조회(관리자)
  getOrderList = async () => {
    const ordersList = await this.orderRepository.getOrderList();
    return ordersList;
  };

  // 주문 목록 조회(사용자)
  getOrdersByUserId = async (user_id) => {
    const orders = await this.orderRepository.getOrdersByUserId(user_id);
    return orders;
  };

  postOrder = async (user_id) => {
    const allCart = await this.cartRepository.findCart(user_id);
    const orderTableInfo = allCart.map((cart) => cart.dataValues);
    //오더 테이블 (주문은 1개)
    const createorder = await this.orderRepository.orderCreate(user_id);
    //오더 아이템 테이블//order_items table product_id order_id item_quantity
    await this.orderItemRepository.orderItemCreate(orderTableInfo, createorder);
    //카트아이템 삭제
    await this.cartRepository.deleteAllCart(orderTableInfo);
    return createorder;
  };
}

module.exports = OrderService;
