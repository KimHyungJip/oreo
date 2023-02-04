exports.homepage = async (req, res) => {
  res.render('index', { title: '오레오조 베이커리 - Home' });
};

exports.mypage = async (req, res) => {
  res.render('mypage', { title: '마이페이지' });
};

// 관리자 관련 페이지 렌더링
exports.adminProducts = async (req, res) => {
  res.render('admin_product_list', { title: '상품 관리 페이지' })
}

