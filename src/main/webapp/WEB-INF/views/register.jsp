<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/7
  Time: 12:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link type="text/css" rel="stylesheet" href="${path}/css/style1.css" />
    <!--[if IE 6]>
    <script src="${path}/js/iepng.js" type="text/javascript"></script>
    <script type="text/javascript">
        EvPNG.fix('div, ul, img, li, input, a');
    </script>
    <![endif]-->
    <script type="text/javascript" src="${path}/js/jquery-1.11.1.min_044d0927.js"></script>
    <script type="text/javascript" src="${path}/js/jquery.bxslider_e88acd1b.js"></script>

    <script type="text/javascript" src="${path}/js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="${path}/js/menu.js"></script>

    <script type="text/javascript" src="${path}/js/select.js"></script>

    <script type="text/javascript" src="${path}/js/lrscroll.js"></script>

    <script type="text/javascript" src="${path}/js/iban.js"></script>
    <script type="text/javascript" src="${path}/js/fban.js"></script>
    <script type="text/javascript" src="${path}/js/f_ban.js"></script>
    <script type="text/javascript" src="${path}/js/mban.js"></script>
    <script type="text/javascript" src="${path}/js/bban.js"></script>
    <script type="text/javascript" src="${path}/js/hban.js"></script>
    <script type="text/javascript" src="${path}/js/tban.js"></script>

    <script type="text/javascript" src="${path}/js/lrscroll_1.js"></script>
    <script type="text/javascript" src="${path}/js/util.js"></script>
    <script>
        $(function(){
            var username = $("#username")
            var cusernmae = $("#cusername")
            username.blur(function(){
                $.ajax({
                    url:"${pageContext.request.contextPath}/user/checkUserByAjax.do",
                    data:{
                        username:username.val()
                    },
                    success:function(data){
                        if(data=='username empty'){
                            cusername.innerHTML="用户名不能为空!"
                        }else if(data=='username exist'){
                            cusername.innerHTML="用户名已存在!"
                        }else{
                            cusername.innerHTML="用户名可以使用"
                        }
                    }
                });
            });
        });
    </script>
    <title>注册页面</title>
</head>
<body>
<!--Begin Header Begin-->
<div class="soubg">
    <div class="sou">
        <span class="fr">
        	<span class="fl">你好,请<a href="${pageContext.request.contextPath}/user/login.do">登录</a>&nbsp;
                <a href="${pageContext.request.contextPath}/user/register.do" style="color:#ff4e00;">免费注册</a></span>
            <span class="fl">|&nbsp;关注我们:</span>
            <span class="s_sh"><a href="#" class="sh1">新浪</a><a href="#" class="sh2">微信</a></span>
            <span class="fr">|&nbsp;<a href="#">手机版&nbsp;
                <img src="${path}/images/s_tel.png" align="absmiddle" /></a></span>
        </span>
    </div>
</div>
<!--End Header End-->
<!--Begin Login Begin-->
<div class="log_bg">
    <div class="top">
        <div class="logo"><a href="Index.html">
            <img src="${path}/images/logo.png" /></a></div>
    </div>
    <div class="regist">
        <div class="log_img">
            <img src="${path}/images/l_img.png" width="611" height="425" /></div>
        <div class="reg_c">
            <form action = "${pageContext.request.contextPath}/user/registerUser.do"
                  onsubmit="return checkRegisterUser(this)" method="post">
                <table border="0" style="width:420px; font-size:14px; margin-top:20px;" cellspacing="0" cellpadding="0">
                    <tr height="48" valign="top">
                        <td width="95">&nbsp;</td>
                        <td>
                            <span class="fl" style="font-size:24px;">注册</span>
                            <span class="fr">已有商城账号,
                                <a href="${pageContext.request.contextPath}/user/login.do" style="color:#ff4e00;">我要登录</a></span>
                        </td>
                    </tr>
                    <tr height="48">
                        <c:if test="${register!=null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;用户名 &nbsp;</td>
                            <c:if test="${registerUser.username==''}">
                                <td><input type="text" value="" class="l_user" name="username"/><span style="color: red">输入用户名!</span></td>
                            </c:if>
                            <c:if test="${registerUser.username!=''&&registerUser.username!='用户名已存在!'}">
                                <td><input type="text" value="${registerUser.username}" class="l_user" name="username"/></td>
                            </c:if>
                            <c:if test="${registerUser.username=='用户名已存在!'}">
                                <td><input type="text" value="" class="l_user" name="username"/><span style="color: red">用户名已存在!</span></td>
                            </c:if>
                        </c:if>
                        <c:if test="${register==null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;用户名 &nbsp;</td>
                            <td><input type="text" value="" class="l_user" id="username" name="username"/>
                                <span name="cusername" id="cusername"></span></td>
                        </c:if>
                    </tr>
                    <tr height="48">
                        <c:if test="${register==null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;密码 &nbsp;</td>
                            <td><input type="password" value="" class="l_pwd" name ="password" id="password"/>
                                <span name="cpassword"></span></td>
                        </c:if>
                        <c:if test="${register!=null}">
                            <c:if test="${registerUser.password==''}">
                                <td align="right"><font color="#ff4e00">*</font>&nbsp;密码 &nbsp;</td>
                                <td><input type="password" value="" class="l_pwd" name ="password"/><span style="color: red">输入密码!</span></td>
                            </c:if>
                            <c:if test="${registerUser.password=='密码不一致!'}">
                                <td align="right"><font color="#ff4e00">*</font>&nbsp;密码 &nbsp;</td>
                                <td><input type="password" value="" class="l_pwd" name ="password"/><span style="color: red">密码不一致!</span></td>
                            </c:if>
                            <c:if test="${registerUser.password!=''&&registerUser.password!='密码不一致!'}">
                                <td align="right"><font color="#ff4e00">*</font>&nbsp;密码 &nbsp;</td>
                                <td><input type="password" value="${registerUser.password}" class="l_pwd" name ="password"/></td>
                            </c:if>
                        </c:if>
                    </tr>
                    <tr height="48">
                        <c:if test="${register==null||(registerUser.username=='密码不一致!')}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;确认密码 &nbsp;</td>
                            <td><input type="password" value="" class="l_pwd" name="pwd"/><span name="cpwd"></span></td>
                        </c:if>
                        <c:if test="${register!=null}">
                            <c:if test="${pwd==''}">
                                <td align="right"><font color="#ff4e00">*</font>&nbsp;确认密码 &nbsp;</td>
                                <td><input type="password" value="" class="l_pwd" name="pwd"/><span style="color: red">输入确认密码!</span></td>
                            </c:if>
                            <c:if test="${pwd!=''}">
                                <td align="right"><font color="#ff4e00">*</font>&nbsp;确认密码 &nbsp;</td>
                                <td><input type="password" value="${pwd}" class="l_pwd" name="pwd"/></td>
                            </c:if>
                        </c:if>
                    </tr>
                    <tr height="48">
                        <c:if test="${register==null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;真实姓名 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name = "name"/><span name="cname"></span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.name==''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;真实姓名 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name = "name"/><span style="color: red">输入真实姓名!</span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.name!=''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;真实姓名 &nbsp;</td>
                            <td><input type="text" value="${registerUser.name}" class="l_email" name = "name"/></td>
                        </c:if>
                    </tr>
                    <tr height="48">
                        <c:if test="${register==null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;邮箱 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name = "email"/><span name="cemail"></span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.email==''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;邮箱 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name = "email"/><span style="color:red;">输入邮箱!</span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.email!=''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;邮箱 &nbsp;</td>
                            <td><input type="text" value="${registerUser.email}" class="l_email" name = "email"/></td>
                        </c:if>
                    </tr>
                    <tr height="48">
                        <c:if test="${register==null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;手机 &nbsp;</td>
                            <td><input type="text" value="" class="l_tel" name="phone"/><span name="cphone"></span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.phone==''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;手机 &nbsp;</td>
                            <td><input type="text" value="" class="l_tel" name="phone"/><span style="color: red">输入手机号!</span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.phone!=''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;手机 &nbsp;</td>
                            <td><input type="text" value="${registerUser.phone}" class="l_tel" name="phone"/></td>
                        </c:if>
                    </tr>
                    <tr height="48">
                        <c:if test="${register==null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;家庭地址 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name ="address"/><span name="caddress"></span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.address==''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;家庭地址 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name ="address"/><span style="color: red">输入家庭地址!</span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.address!=''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;家庭地址 &nbsp;</td>
                            <td><input type="text" value="${registerUser.address}" class="l_email" name ="address"/></td>
                        </c:if>

                    </tr>
                    <tr height="48">
                        <c:if test="${register==null}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;编号 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name="code"/><span name="ccode"></span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.code==''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;编号 &nbsp;</td>
                            <td><input type="text" value="" class="l_email" name="code"/><span style="color: red">输入编号!</span></td>
                        </c:if>
                        <c:if test="${register!=null&&registerUser.code!=''}">
                            <td align="right"><font color="#ff4e00">*</font>&nbsp;编号 &nbsp;</td>
                            <td><input type="text" value="${registerUser.code}" class="l_email" name="code"/></td>
                        </c:if>
                    </tr>
                    <tr height="58">
                        <td>&nbsp;</td>
                        <td><input type="submit" value="立即注册" class="log_btn" /></td>
                    </tr>

                </table>
            </form>
        </div>
    </div>
</div>
<!--End Login End-->
<!--Begin Footer Begin-->
<div class="btmbg">
    <div class="btm">
        备案/许可证编号:蜀ICP备12009302号-1-www.dingguagua.com   Copyright @2015-2018 商城网 All Rights Reserved. 复制必究 , Technical Support: Dgg Group <br />
        <img src="${path}/images/b_1.gif" width="98" height="33" />
        <img src="${path}/images/b_2.gif" width="98" height="33" />
        <img src="${path}/images/b_3.gif" width="98" height="33" />
        <img src="${path}/images/b_4.gif" width="98" height="33" />
        <img src="${path}/images/b_5.gif" width="98" height="33" />
        <img src="${path}/images/b_6.gif" width="98" height="33" />
    </div>
</div>
<!--End Footer End -->

</body>


<!--[if IE 6]>
<script src="${path}/zh_CN.js"></script>
<![endif]-->
</html>
