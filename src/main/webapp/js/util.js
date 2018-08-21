function checkLoginUser(page) {
    if(page.username.value==''){
        alert("用户名不能为空!")
        page.username.focus()
        return false
    }
    if(page.password.value==''){
        alert("密码不能为空!")
        page.password.focus()
        return false
    }
    if(page.code.value==''){
        alert("请输入验证码!")
        page.code.focus()
        return false
    }
    return true
}
function check(page){
    if(page.name.value==''){
        alert('收货人姓名不能为空!');
        page.name.focus();
        return false;
    }
    if(page.addr.value==''){
        alert('收货人地址不能为空!');
        page.addr.focus();
        return false;
    }
    if(page.code.value==''){
        alert("收货人邮编不能为空!");
        page.code.focus();
        return false;
    }
    if(page.phone.value==''){
        alert('收货人联系电话不能为空!');
        page.phone.focus();
        return false;
    }
    return true;
}