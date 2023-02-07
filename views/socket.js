function socketOrderAlert(order_id, receipt_price) {
  socket.emit('PURCHASE', {
      order_id,
      receipt_price,
  });
}