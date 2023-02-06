$(document).ready(function () {
  button_action();
});
function button_action() {
  if (localStorage.getItem('accesstoken')) {
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
        alert(response.message);
        localStorage.setItem('accesstoken', response.accessToken);
        localStorage.setItem('refreshtoken', response.refreshToken);
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
