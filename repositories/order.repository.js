class OrderRepository {
  constructor(OrderModel) {
    this.orderModel = OrderModel;
  }

  // 주문 목록 조회(관리자)
  getorderlist = async () => {
    try {
      const orderlist = await this.orderModel.findall();
      return orderlist;
    } catch (error) {
      console.log(error);
      error.name = 'Database Error';
      error.message = '요청을 처리하지 못하였습니다.';
      error.status = 500;
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
