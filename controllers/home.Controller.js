exports.homepage = async (req, res) => {
  res.render('index', { title: '오레오조 베이커리 - Home' });
};

exports.mypage = async (req, res) => {
  res.render('mypage', { title: '마이페이지' });
};

// 관리자 - 상품 관리 페이지
exports.adminProducts = async (req, res) => {
  const { page } = req.query; // 왜 '문자'그대로 놔둬야 제대로 동작하는 거지?
  const params = await _get_items(page, 'products');
  res.render('admin_product_list', {
    title: '상품 관리',
    page,
    ...params,
    products: params.items,
  });
};

// 관리자 - 회원 관리 페이지
exports.adminUsers = async (req, res) => {
  const { page } = req.query;
  const params = await _get_items(page, 'users');
  res.render('admin_user_list', {
    title: '회원 관리',
    page,
    ...params,
    users: params.items,
  });
};

const ProductService = require('../services/product.service');
const UserService = require('../services/user.service');
const productService = new ProductService();
const userService = new UserService();
async function _get_items(page = 1, category) {
  let items;
  if (category === 'products') {
    items = await productService.findAllProducts();
  } else {
    // category === 'users'
    items = await userService.userlistget();
  }

  const limit = 5;
  const total_items_number = items.length;
  const start_index = (page - 1) * limit; // 2페이지라면, 인덱스 5~9번까지의 상품이 보여야 함.
  const current_page_items = items.slice(start_index, start_index + limit); // 현재 페이지 상품 리스트
  const last_page_num = Math.ceil(total_items_number / limit); // 예를 들어 총 25개 상품이면 3페이지. 30개 상품이어도 3페이지.

  const page_chunk_size = 3; // <1 2 3> 뭉텅이 다음에 <4 5 6>...
  const chunk_num = Math.floor((page - 1) / page_chunk_size); // 1, 2, 3페이지는 0번째 뭉텅이로 취급.
  const chunk_start = chunk_num * page_chunk_size + 1; // 0번째 뭉텅이의 첫 페이지는 1, 1번째 뭉텅이의 첫 페이지는 4페이지...
  const chunk_end = chunk_start + (page_chunk_size - 1); // 1페이지부터 시작한 0번째 뭉텅이의 끝은 3이어야 함. +3해서 4가 아니라.

  return {
    items: current_page_items,
    limit,
    last_page_num,
    chunk_start,
    chunk_end,
  };
}

// 상품 수정 페이지로 이동
exports.adminProductModify = (req, res) => {
  console.log('\n\nreached to edit page.');
  const { id } = req.query;
  res.render('product_modify', {
    title: '상품 수정',
    id,
  });
};

// 상품 등로 페이지로 이동
exports.adminProductRegister = (req, res) => {
  res.render('product_register', {
    title: '상품 등록',
  });
};
