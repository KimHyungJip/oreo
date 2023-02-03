const express = require('express');
const expressLayouts = require('express-ejs-layouts') //헤더와 풋터 레이아웃 동시관리
// const Orders = require('./models/orders')
// const Users = require('./models/users')
const app = express()

const dotenv = require('dotenv');
require('dotenv').config()

app.use(express.json());
// app.use("/", router);

app.use(express.urlencoded( { extended: true}));

// Static Files 
app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/img'))

// Set Temlplating Engine
app.use(expressLayouts)
app.set('layout', './layouts/main')  // express-ejs-layouts 사용중, default 파일의 경로 설정 

// Set views
app.set('views', './views')
app.set('view engine', 'ejs')


const router = require("./routes");
const routes = require('./routes/home.Routes.js')
app.use('/', routes);



app.get('/mypage', (req, res) => {
    res.render('mypage', {title: '마이페이지'})
})




// // 마이페이지 회원 정보 조회
// app.get('/users', async (req, res) => {
//     // const params = req.params;
//     console.log(params);
//     const users = await Users.findByPk().sort({createdAt: 'desc'})
//     res.send('This is My info')
// })


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트로 열렸습니다.`)
})

