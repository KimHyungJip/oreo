const express = require('express');
const { Server } = require("http"); // 1. 모듈 불러오기
const socketIo = require("socket.io"); // 1. 모듈 불러오기
const expressLayouts = require('express-ejs-layouts'); //헤더와 풋터 레이아웃 동시관리

const app = express();
const router = require('./routes');
const http = Server(app); // 2. express app을 http 서버로 감싸기
const io = socketIo(http); // 3. http 객체를 Socket.io 모듈에 넘겨서 소켓 핸들러 생성

require('dotenv').config();

// view engine 템플릿 사용 명시
app.set('views', './views');
app.set('view engine', 'ejs');

// Set Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main'); // express-ejs-layouts 사용중, default 파일의 경로 설정

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

// Static Files
app.use(express.static('public')); // 이후로 어디서든 파일 참조시, href="css/styles.css" | "js/api.js" | "img/bread.jpg"

// 4. 소켓 연결 이벤트 핸들링
// io.on("connection", (sock) => {
//   console.log("새로운 소켓이 연결됐어요!");
// });
// socket.on("BUY", (data) => {
//   console.log("주문이 완료 되었습니다");
//   const payload = {
//     nickname: data.nickname,
//     goodsId: data.goodsId,
//     goodsName: data.goodsName,
//     date: new Date().toISOString(),
//   };
//   console.log("클라이언트가 구매한 데이터", data, new Date());
//   socket.broadcast.emit("BUY_GOODS", payload);
// });
// io.on("connection", (sock) => {
//   console.log("새로운 소켓이 연결됐어요!");

//   socket.on("disconnect", () => {
//     console.log(sock.id, "연결이 끊어졌어요!");
//   });
// });
const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`서버가 ${PORT} 포트로 열렸습니다.`);
// });
http.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트로 열렸습니다.`);
});