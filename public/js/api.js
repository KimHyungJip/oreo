//header
$(document).ready(function () {
  button_action();
});
function button_action() {
  if (localStorage.getItem('accessToken')) {
    $('#loginpagebutton').hide();
    $('#logoutbutton').show();
    $('#signuppagebutton').hide();
    //login 되었을 때 localstorage에 is_admin이 저장되어있음
    //활용해서 header가 보이는것을 컨트롤 해주면 될 것 같음
  }
  if (localStorage.getItem('is_admin')) {
    if (localStorage.getItem('is_admin') === '1') {
      $('#admin_indexbutton').show();
      $('#cartpagebutton').hide();
      $('#orderpagebutton').hide();
      $('#mypagebutton').hide();
    } else if (localStorage.getItem('is_admin') === '0')
      $('#admin_indexbutton').hide();
  } else {
    $('#admin_indexbutton').hide();
  }
}
function logout() {
  localStorage.clear();
  alert('로그아웃 되었습니다.');
  window.location.href = '/';
}
//signup page
function dupCheck() {
  const emailId = $('#emailId').val();
  const emailDomain = $('#emailDomain').val();
  const email = emailId + '@' + emailDomain;
  if (!email) {
    alert('이메일 형식이 맞지 않습니다.');
  } else if (emailDomain.indexOf('.') === -1) {
    alert('이메일 형식이 맞지 않습니다.');
  } else {
    $.ajax({
      type: 'POST',
      url: '/users/duplication',
      data: { email: email },
      success: function (response) {
        alert(response.message);
      },
      error: function (err) {
        alert(err.responseJSON.message);
      },
    });
  }
}
function signup() {
  const emailId = $('#emailId').val();
  const emailDomain = $('#emailDomain').val();
  const email = emailId + '@' + emailDomain;
  const phone = $('#phone').val();
  const address = $('#address').val();
  const password1 = $('#password1').val();
  const password2 = $('#password2').val();
  if (
    !emailId ||
    !emailDomain ||
    !phone ||
    !address ||
    !password1 ||
    !password2
  ) {
    alert('회원가입 양식에 맞지 않습니다.');
  } else {
    if (password1 !== password2) {
      alert('비밀번호가 서로 맞지 않습니다.');
    } else {
      $.ajax({
        type: 'POST',
        url: '/users/signup',
        data: {
          email: email,
          password: password1,
          phone: phone,
          address: address,
        },
        success: function (response) {
          alert(response.message);
          window.location.href = '/';
        },
        error: function (err) {
          alert(err.responseJSON.message);
        },
      });
    }
  }
}
//login page
function login() {
  const loginEmail = $('#loginEmail').val();
  const loginPassword = $('#loginPassword').val();
  if (!loginEmail) {
    alert('이메일을 입력해주세요.');
  } else if (!loginPassword) {
    alert('비밀번호를 입력해주세요.');
  } else {
    $.ajax({
      type: 'POST',
      url: '/users/login',
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      success: function (response) {
        alert('로그인이 완료되었습니다.');
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('is_admin', response.is_admin);
        document.getElementById('loginbutton').style.display = 'none';
        document.getElementById('logoutbutton').style.display = 'block';
        window.location.href = '/';
      },
      error: function (err) {
        alert(err.responseJSON.message);
      },
    });
  }
}
//product_register page
function upload_image() {
  const imageInput = $('#image_file')[0];
  if (imageInput.files.length === 0) {
    alert('파일을 선택해주세요.');
    return;
  }
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  $.ajax({
    type: 'POST',
    url: '/products/imageupload',
    processData: false,
    contentType: false,
    data: formData,
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    success: function (response) {
      $('#image').attr('src', response.url);
    },
    error: function (err) {
      alert('오류');
    },
  });
}
function upload() {
  const product_image = $('#image').attr('src');
  const product_name = $('#inputTitle').val();
  const product_price = $('#inputPrice').val();
  const product_detail = $('#inputDetail').val();
  $.ajax({
    type: 'POST',
    url: '/products/admin',
    data: {
      product_name: product_name,
      product_price: product_price,
      product_detail: product_detail,
      product_image: product_image,
    },
    success: function (response) {
      alert(response.message);
      window.location.reload();
    },
    error: function (err) {
      alert(err.errorMessage);
    },
  });
}
//cart page
function get_cart() {
  let total_price = 0;
  $.ajax({
    type: 'GET',
    url: '/cart/cart_items',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: {},
    success: function (response) {
      let rows = response.cart;
      for (let i = 0; i < rows.length; i++) {
        let cart_item_id = rows[i]['cart_item_id'];
        let product_id = rows[i]['product_id'];
        let product_name = rows[i]['product_name'];
        let product_price = rows[i]['product_price'];
        let product_detail = rows[i]['product_detail'];
        let product_image = rows[i]['product_image'];
        let item_quantity = rows[i]['item_quantity'];
        let temp = `                    <tr>
              <td>${product_name}</td>
              <td>${product_price}</td>
              <td>${product_detail}</td>
              <td><img src="${product_image}" class="img-fluid" style="height:50px" alt="..."></td>
              <td><input id = "cart_item_id${cart_item_id}" type='number' min='1' max='99' value="${item_quantity}"></td>
              <td><a class="btn btn-outline-secondary" onclick="cartmodify('${cart_item_id}')" role="button">수정</a></td>
              <td><a class="btn btn-outline-secondary" onclick="cartdelete('${cart_item_id}')" role="button">삭제</a></td>
          </tr>`;
        $('#cart_item').append(temp);
        total_price += product_price * item_quantity;
      }
      document.getElementById('total_price').innerHTML =
        String(total_price) + '원';
    },
  });
}
function cartmodify(cart_item_id) {
  const cart = 'cart_item_id' + cart_item_id;
  const item_quantity = Number(document.getElementById(cart).value);
  if (item_quantity > 99) {
    alert('99개 까지 주문할 수 있습니다.');
  } else if (item_quantity <= 0) {
    alert('0개 이하의 주문은 처리 할 수 없습니다.');
  } else if (!item_quantity) {
    alert('입력값에 문제가 있습니다.');
  } else {
    $.ajax({
      type: 'PUT',
      url: '/cart/modifyquantity',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: { cart_item_id: cart_item_id, item_quantity: item_quantity },
      success: function (response) {
        alert(response.message);
        window.location.href = '/cart';
      },
      error: function (err) {
        alert(err.responseJSON.message);
      },
    });
  }
}
function cartdelete(cart_item_id) {
  const istrue = confirm('정말 삭제하시겠습니까?');
  if (istrue) {
    $.ajax({
      type: 'DELETE',
      url: '/cart/deletecart',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: { cart_item_id: cart_item_id },
      success: function (response) {
        alert(response.message);
        window.location.href = '/cart';
      },
      error: function (err) {
        alert(err.responseJSON.message);
      },
    });
  } else {
    alert('취소되었습니다.');
    window.location.href = '/cart';
  }
}
//mypage
function cancel() {
  window.location.href = '/mypage';
}
function popbutton() {
  $('#myinfo').hide();
  $('#popbutton').hide();
  $('#istrue').show();
}
function istrue() {
  const password = $('#istruepwd').val();
  $.ajax({
    type: 'POST',
    url: '/users/istrue',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: { password: password },
    success: function (response) {
      if (response.boolean) {
        $('#mypageButton').show();
        $('#istrue').hide();
      } else {
        alert('비밀번호를 확인해주세요.');
        cancel();
      }
    },
  });
}
function modifyinfobutton() {
  $('#popbutton').hide();
  $('#istrue').hide();
  $('#mypageButton').hide();
  $('#modifyinfoinput').show();
}
function modifyinfo() {
  const phone = $('#phone').val();
  const address = $('#address').val();
  $.ajax({
    type: 'PUT',
    url: '/users/modifyinfo',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: {
      phone: phone,
      address: address,
    },
    success: function (response) {
      alert(response.message);
      alert('다시 로그인 해주세요');
      logout();
    },
    error: function (err) {
      alert(err.responseJSON.message);
    },
  });
}
function modifypwdbutton() {
  $('#mypageButton').hide();
  $('#modifypwdinput').show();
}
function modifypwd() {
  const modifypwd1 = $('#modifypwd1').val();
  const modifypwd2 = $('#modifypwd2').val();
  if (modifypwd1 !== modifypwd2) {
    alert('패스워드가 일치하지 않습니다.');
  } else {
    $.ajax({
      type: 'PUT',
      url: '/users/modifypwd',
      data: { password: modifypwd2 },
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      success: function (response) {
        alert(response.message);
        alert('다시 로그인 해주세요');
        logout();
      },
      error: function (err) {
        alert(err.responseJSON.message);
      },
    });
  }
}
function accountdestroy() {
  const is_true = confirm('정말로 탈퇴하시겠습니까?');
  if (is_true) {
    $.ajax({
      type: 'DELETE',
      url: '/users/accoutdestroy',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {},
      success: function (response) {
        alert(response.message);
        logout();
      },
      error: function (err) {
        alert(err.responseJSON.message);
      },
    });
  } else {
    alert('취소 되었습니다.');
    cancel();
  }
}
function me() {
  $.ajax({
    type: 'GET',
    url: '/users/me',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: {},
    success: function (response) {
      const email = response.email;
      const phone = response.phone;
      const address = response.address;
      const temp = `<div>${email}</div><div>${phone}</div><div>${address}</div>`;
      $('#me').append(temp);
    },
    error: function (err) {
      alert(err.responseJSON.errorMessage);
      window.location.href = '/';
    },
  });
}

// const socket = io('ws://localhost:7000');

// socket.on('connect', () => {
//   socket.send('접속');
// });
