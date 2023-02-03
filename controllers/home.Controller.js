

// GET  Homepage


exports.homepage22 = async (req, res) => {
    res.render('index', { title : '오레오조 베이커리 - Home', test: '테스트문구' })
}

exports.mypage = async (req, res) => {
    res.render('mypage', {title: '마이페이지'})
}