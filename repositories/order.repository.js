const { Order_item, Order, User } = require('../models');

class OrderRepository {
  constructor(OrderModel) {
    this.orderModel = OrderModel;
  }

  // 주문 목록 조회(관리자)
  getOrderList = async () => {
    try {
      const orderlist = await this.orderModel.findAll();
      return orderlist;
    } catch (error) {
      console.log(error);
      error.name = 'Database Error';
      error.message = '요청을 처리하지 못하였습니다.';
      error.status = 500;
      throw error;
    }
  };

  // 주문 목록 조회 (사용자)
  getOrdersByUserId = async (user_id) => {
    try {
      const orders = await this.orderModel.findAll({
        include: [
          {
            model: Order_item,
            as: 'order_item',
            attributes: ['product_id', 'item_quantity'],
          },
        ],
        where: { user_id },
      });

      return orders;
    } catch (error) {
      error.name = 'Database Error';
      error.message = '요청을 처리하지 못하였습니다.';
      error.status = 400;
      throw error;
    }
  };
  //order table에 넣음
  orderCreate = async (user_id) => {
    const createOrder = await this.orderModel.create({
      user_id
    });
    return createOrder;
  }
}

module.exports = OrderRepository;
