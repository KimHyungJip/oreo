function changDomain(domain){
    $('#domain').attr('value',domain.value)
}
function dupCheck(){
    const emailId = $('#emailId').val()
    const emailDomain = $('#domain').val()
    const email = emailId+'@'+emailDomain
    if(!emailId){
        alert("아이디를 입력해주세요")
    }
    else if(!emailDomain){
        alert("도메인을 입력해주세요")
    }else{
        $.ajax({
            type: "POST",
            url: "/users/duplication",
            data: {email: email},
            success:function(response){
                alert(response.responseJSON.message)
            },error:function(error){
                alert(error.responseJSON.message)
            }
        })
    }
}
function signup(){        
    const emailId = $('#emailId').val()
    const emailDomain = $('#domain').val()
    const email = emailId+'@'+emailDomain
    const phone = $('#phone').val()
    const address = $('#address').val()
    const password1 = $('#password1').val()
    const password2 = $('#password2').val()
    if(!emailId || !emailDomain || !phone || !address || !password1 || !password2){
        alert("회원가입 양식에 맞지 않습니다.")
    }else{
        if (password1 !== password2){
            alert("비밀번호가 서로 맞지 않습니다.")
        }else{
            $.ajax({
                type: "POST",
                url: "/users/signup",
                data: {
                    email: email,
                    password: password1,
                    phone: phone,
                    address: address,
                },
                success:function(response){
                    alert(response.responseJSON.message)
                    window.location.href="/"
                },error:function(error){
                    alert(error.responseJSON.message)
                }
            })
        }
    }
}
function login(){
    const loginEmail = $('#loginEmail').val()
    const loginPassword = $('#loginPassword').val()
    $.ajax({
        type: "POST",
        url: "/users/login",
        data: {
            email: loginEmail,
            password: loginPassword,
        },
        success:function(response){
            alert("로그인에 성공하였습니다.")
            localStorage.setItem('accesstoken',response.accessToken)
            localStorage.setItem('refreshtoken',response.refreshToken)
            window.location.href="/"
        },
    })
}