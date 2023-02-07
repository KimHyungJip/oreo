const socketIo = require('socket.io'); //1모듈불러오기
const httpServer = require('./app');

const io = socketIo(httpServer); //모듈에 http서버 객체를 넘겨주면

//'connection'사용자가 웹사이트에 접속하면 자동으로 발생하는 이벤트
io.on('connection', (sock) => {
  console.log('님이 연결 되었습니다.');
  sock.send('hello');

  // sock.on('disconnect', () => {
  //   console.log(sock.id, '님의 연결이 끊어졌습니다.');
  // })
});
// //4. 소켓 연결 이벤트 핸들링
// io.on("connection", (sock) => {
//     const { watchBuying, watchByeBye } = initSocket(sock);

//     watchBuying();

//     watchByeBye();
//   });

// function initSocket(sock) {
//     console.log("새로운 소켓이 연결됐어요!");
//     //sock.on을 대신해서 어떤 역할을 하는지 추상화 한 함수
//     function watchEvent(eventName, func) {
//       sock.on(eventName, func); //"BUY"라는 eventName이 들어왔을 때func실행
//     }
//     //현재 접속한 모든 클라이언트 들에게 메세지를 전송하는 구나라고 이해할 수 있는 함수
//     function sendMessageAll(eventName, data) {
//       io.emit(eventName, data);
//     }

//     return {
//       watchBuying: () => {
//         watchEvent("BUY", (data) => {
//           const emitData = {
//             ...data,
//             date: new Date().toISOString(),
//           };

//           sendMessageAll("BUY_GOODS", emitData);
//         });
//       },
//       watchByeBye: () => {
//         watchEvent("disconnect", () => {
//           console.log(sock.id, "연결이 끊어졌어요!");
//         });
//       },
//     };
//   }
