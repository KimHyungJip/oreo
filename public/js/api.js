// const dotenv = require('dotenv');
// dotenv.config()

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
function modifybutton() {
  $('#modifyinfo').show();
  $('#myinfo').hide();
  $('#modifyinfobutton').hide();
}
function myinfobutton() {
  $('#modifyinfo').hide();
  $('#myinfo').show();
  $('#modifyinfobutton').show();
}
function modifyinfo() {
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
        type: 'PUT',
        url: '/users/modifyinfo',
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
//로그인을 했을때 로그인 버튼이 마이페이지 버튼으로 바뀌는 식으로 해봐야 될듯
//로그인을 했을때 is_admin을 체크해서 버튼이 바뀌는 형식으로
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
//로그아웃기능은 로그인했을때만 뜨게 해줘야 할것같다.
function logout() {
  localStorage.clear();
  alert('로그아웃 되었습니다.');
  window.location.href = '/';
}
//희서님이 작성해주신 loadFile의 기능(미리보기)를 여기서 해줘도 될 것 같다.
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
//위의 function의 기능으로 인해 지금 src가 bucket에 저장되어있는 url이 있으니 그것을 db에 저장해주면 될 것 같다.
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


const socket = io("ws://localhost:7000")

socket.on("connect",()=>{
  socket.send("접속")
})