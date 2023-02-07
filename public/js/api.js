//header
$(document).ready(function () {
  button_action();
});
function button_action() {
  if (localStorage.getItem('accessToken')) {
    $('#loginbutton').hide();
    $('#logoutbutton').show();
    $('#signupbutton').hide();
    //login 되었을 때 localstorage에 is_admin이 저장되어있음
    //활용해서 header가 보이는것을 컨트롤 해주면 될 것 같음
    // if(localStorage.getItem(is_admin)===0){

    // }else if(localStorage.getItem(is_admin)===1){

    // }else{

    // }
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
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: {
      product_name: product_name,
      product_price: product_price,
      product_detail: product_detail,
      product_image: product_image,
    },
    success: function (response) {
      alert(response.message);
      location.href = '/admin_products';
    },
    error: function (err) {
      alert(err.responseJSON.errorMessage);
    },
  });
}
//cart page
function get_cart() {
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
              <td><input id = "product_id${product_id}" type='number' min='1' value="${item_quantity}"></td>
              <td><a class="btn btn-outline-secondary" onclick="cartmodify('${product_id}')" role="button">수정</a></td>
          </tr>`;
        $('#cart_item').append(temp);
      }
    },
  });
}
function cartmodify(product_id) {
  const product = 'product_id' + product_id;
  const item_quantity = document.getElementById(product).value;
  $.ajax({
    type: 'PUT',
    url: '/cart/modifyquantity',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: { product_id: product_id, item_quantity: item_quantity },
    success: function (response) {
      alert(response.message);
      window.location.href = '/';
    },
    error: function (err) {
      alert(err.responseJSON.message);
    },
  });
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
  const emailId = $('#emailId').val();
  const emailDomain = $('#emailDomain').val();
  const email = emailId + '@' + emailDomain;
  const phone = $('#phone').val();
  const address = $('#address').val();
  if (!emailId || !emailId) {
    alert('수정 양식에 맞지 않습니다.');
  } else {
    $.ajax({
      type: 'PUT',
      url: '/users/modifyinfo',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        email: email,
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
    },
  });
}
