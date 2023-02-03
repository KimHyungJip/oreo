const express = require('express');
const expressLayouts = require('express-ejs-layouts'); //헤더와 풋터 레이아웃 동시관리
const app = express();

const dotenv = require('dotenv');
require('dotenv').config();

const router = require('./routes');
app.use('/', router);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static('public'));
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/img'))

// Set Temlplating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main'); // express-ejs-layouts 사용중, default 파일의 경로 설정

// Set views
app.set('views', './views');
app.set('view engine', 'ejs');

const routes = require('./routes/home.Routes.js');
app.use('/', routes);

app.get('/mypage', (req, res) => {
  res.render('mypage', { title: '마이페이지', user_id: '김민수', password: '****', phone:'010-1234-1234', email:'123@123.com', address:'제주시 서귀포읍' });
});



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트로 열렸습니다.`);
});
