
class OrderItemRepository {//서비스 계층에서 내가줄 모델을 고를 수 있다.
    constructor(model) {
      this.model = model;
    }
  
    //장바구니에 상품 등록
    orderItemCreate= async (orderTableInfo,createorder) => {
        console.log("장바구니상품등록 repo ",orderTableInfo)
        const order_id = createorder.dataValues.order_id
        console.log("order_id",order_id)
        for(let i =0;i<orderTableInfo.length;i++){
            const product_id = orderTableInfo[i].product_id
            const item_quantity = orderTableInfo[i].item_quantity
            await this.model.create({
                product_id,order_id,item_quantity
            });
        }    
        
        return 1;
    }
  
  }
  
  module.exports = OrderItemRepository;