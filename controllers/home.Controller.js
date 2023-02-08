exports.homepage = async (req, res) => {
  const { page } = req.query;
  const params = await _get_items(page, 'products', 6);
  res.render('index', {
    title: '오레오조 베이커리 - Home',
    page,
    ...params,
    products: params.items,
  });
};

exports.mypage = async (req, res) => {
  const { user } = res.locals;
  res.render('mypage', {
    title: '마이페이지',
    ...user,
  });
}; // 마이페이지.ejs 파일에서는 이제 <%= user_id %>, <%= email %>

exports.cart = async (req, res) => {
  res.render('cart', { title: '장바구니' });
};

exports.myOrders = async (req, res) => {
  res.render('my_orders', {
    title: '내 주문 내역',
  });
};

exports.loginpage = async (req, res) => {
  res.render('login', { title: '로그인페이지' });
};

exports.signuppage = async (req, res) => {
  res.render('signup', { title: '회원가입페이지' });
};

// 관리자 - 인트로 페이지
exports.adminIndex = async (req, res) => {
  res.render('managermain', { title: '관리자메인' });
};

// 관리자 - 상품 관리 페이지
exports.adminProducts = async (req, res) => {
  let { page } = req.query; // 왜 '문자'그대로 놔둬야 제대로 동작하는 거지?
  console.log('page: ', page);
  if (!page) {
    // undefined일시
    page = 1;
  }
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
  let { page } = req.query;
  if (!page) {
    // undefined일시
    page = 1;
  }
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

// 'category(=상품|회원|주문)' 정보 전부 불러오기
async function _get_all_items(category) {
  let result;
  let items;
  if (category === 'products') {
    items = await productService.findAllProducts();
  } else if (category === 'users') {
    items = await userService.userlistget();
  }
  return items;
}

// 페이지네이션을 위한 params들 생성 후 반환
async function _get_items(page = 1, category, limit = 5) {
  const items = await _get_all_items(category);

  // const limit = 5;
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

// 관리자 - 상품 수정 페이지
exports.adminProductModify = async (req, res) => {
  const { id } = req.query;
  const product = await productService.findProductById(id);
  console.log('\n\nreached to edit page. => ', product);

  res.render('product_modify', {
    title: '상품 수정',
    ...product,
  });
};

// 관리자 - 상품 등록 페이지
exports.adminProductRegister = (req, res) => {
  res.render('product_register', {
    title: '상품 등록',
  });
};

// 관리자 - 회원 정보 수정 페이지
exports.adminUserModify = async (req, res) => {
  const { email } = req.query;
  // const { email } = res.locals.user;
  const user = await userService.findUser(email);

  res.render('managerpost', {
    title: '회원 정보 수정',
    ...user,
  });
};

// 관리자 - 주문 내역 조회 페이지
exports.adminOrderList = async (req, res) => {
  res.render('admin_order_list', {
    title: '주문/판매 내역 조회',
  });
};

// name='term'에 담긴 쿼리가 들어가서 시작.
exports.searchProductList = async (req, res) => {
  const { term } = req.query;
  console.log('홈컨트롤러 검색중----', term);
  try {
    const terms = await productService.searchAllProducts(term);
    // console.log('홈컨트롤러====반환중=================', value)
    res.render('search_results', {
      title: '당장! 주문하지 않으면... 곧 품절!!',
      terms,
    });
  } catch (err) {
    console.log(err.message);
  }
};
