const socketIo = require('socket.io'); //1모듈불러오기
const httpServer = require('./app');

const io = socketIo(httpServer); //모듈에 http서버 객체를 넘겨주면

//'connection'사용자가 웹사이트에 접속하면 자동으로 발생하는 이벤트
io.on('connection', (sock) => {
    console.log(sock.id,' 연결 되었습니다.');


    socket.on('PURCHASE', (data) => {
      console.log('PURCHASE', data);
      const emitData = {
        ...data,
        date: new Date().toISOString(),
      };
  
      io.emit('PURCHASE_ALERT', emitData);
    });
    

    socket.on('disconnect', () => {
        console.log(socket.id, '연결이 끊어졌어요!');
    });
});