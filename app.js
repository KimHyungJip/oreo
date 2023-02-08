const express = require('express');
const expressLayouts = require('express-ejs-layouts'); //헤더와 풋터 레이아웃 동시관리
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./routes');
require('dotenv').config();

// view engine 템플릿 사용 명시
app.set('views', './views');
app.set('view engine', 'ejs');

// Set Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');

// express-ejs-layouts 사용중, default 파일의 경로 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

// Static Files
app.use(express.static('public')); // 이후로 어디서든 파일 참조시, href="css/styles.css" | "js/api.js" | "img/bread.jpg"
io.sockets.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.sockets.emit('message', data);
  });
});
// module.exports = http;
const PORT = process.env.PORT;

server.listen(PORT, function () {
  console.log(`서버가 ${PORT} 포트로 열렸습니다. http://localhost:${PORT}`);
});
