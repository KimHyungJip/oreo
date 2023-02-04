// GET  Homepage

exports.homepage = async (req, res) => {
  res.render('index', { title: '오레오조 베이커리 - Home' });
};

exports.mypage = async (req, res) => {
    res.render('mypage', {title: '마이페이지'})
}

