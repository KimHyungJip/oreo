const express = require('express');
const expressLayouts = require('express-ejs-layouts') //헤더와 풋터 레이아웃 동시관리
// const Orders = require('./models/orders')
// const Users = require('./models/users')
const app = express()
const router = require('./routes');

require('dotenv').config()

// view engine 템플릿 사용 명시
app.set('views', './views')
app.set('view engine', 'ejs')

// Set Temlplating Engine
app.use(expressLayouts)
app.set('layout', './layouts/main')  // express-ejs-layouts 사용중, default 파일의 경로 설정


app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use('/', router)
// app.use('/test', router)

// Static Files
app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/img'))


// const routes = require('./routes/home.Routes.js')
// app.use('/', routes);


// app.get('/mypage', (req, res) => {
//     res.render('mypage', {title: '마이페이지'})
// })


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

