// GET  Homepage
exports.homepage = async (req, res) => {
  res.render('index', {
    title: '오레오조 베이커리 - Home',
    test: '테스트문구',
  });
};

// GET  MyPage
exports.mypage = async (req, res) => {
  res.render('mypage', { title: '마이페이지' });
};

// 'test' 페이지 렌더링 테스트.
exports.test = async (req, res) => {
  res.render('test', {
    title: 'Hello World!',
  });
};
