function checkLoginUser(page) {
    if(page.username.value==''){
        alert("用户名不能为空!")
        return false
    }
    if(page.password.value==''){
        alert("密码不能为空!")
        return false
    }
    if(page.code.value==''){
        alert("请输入验证码!")
        return false
    }
    return true
}
function checkRegisterUser(page) {
    if(page.username.value==''){
        alert("用户名不能为空!")
        return false
    }
    if(page.password.value==''){
        alert("密码不能为空!")
        return false
    }
    if(page.pwd.value==''){
        alert("确认密码不能为空!")
        return false
    }
    if(page.password.value!=''&&page.pwd.value!=''
        &&page.password.value!=page.pwd.value){
        alert("两次密码不一致!")
        return false
    }
    if(page.name.value==''){
        alert("真实姓名不能为空!")
        return false
    }
    if(page.code.value==''){
        alert("编号不能为空!")
        return false
    }
    if(page.email.value==''){
        alert("邮件不能为空!")
        return false
    }
    if(page.phone.value==''){
        alert("手机号不能为空!")
        return false
    }
    if(page.address.value==''){
        alert("地址不能为空!")
        return false
    }
    return true
}