<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/11
  Time: 17:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>电商后台管理系统-登录</title>
    <link rel="stylesheet" type="text/css" href="${path}/layui/css/layui.css" media="all" />
    <link rel="stylesheet" type="text/css" href="${path}/css/loginofadmin.css" />
</head>
<body class="beg-login-bg">
<div class="beg-login-box">
    <header>
        <h1>电商后台管理系统</h1>
    </header>
    <div class="beg-login-main">
        <font color="red" size="5">${msg}</font>
        <br/>
        <form action="${path}/admin/checkAdminUser.do" method="post">
            <div class="layui-form-item">
                <label class="beg-login-icon">
                    <i class="layui-icon">&#xe612;</i>
                </label>
                <input type="text" lay-verify="required"
                       name="username" value="${temp.username}"
                       autocomplete="off"
                       placeholder="这里输入账号"
                       class="layui-input"
                       lay-verType="tips">
            </div>
            <div class="layui-form-item">
                <label class="beg-login-icon">
                    <i class="layui-icon">&#xe642;</i>
                </label>
                <input type="password" lay-verify="required"
                       name="password" autocomplete="off"
                       value="${temp.password}"
                       placeholder="这里输入密码"
                       class="layui-input"
                       lay-verType="tips"
                >
            </div>
            <div class="layui-form-item">
                <!--
                <label class="beg-login-icon">
                    <i class="layui-icon">&#xe642;</i>
                </label>
                <input type="password" lay-verify="required" name="password" autocomplete="off" placeholder="这里输入密码" class="layui-input" lay-verType="tips">
                -->
                <input style="width:22px;height:22px;"
                       name="checked" value="checked" type="checkbox"/>
                <font size="5">记住密码一周</font>
            </div>
            <div class="layui-form-item">
                <div class="beg-pull">
                    <input style="width:100%;height:30px;text-align:center;" type="submit" value="登     录"/>
                    <!--
                    <button type="button" class="layui-btn layui-btn-normal" style="width:100%;" lay-submit lay-filter="formDemo">

                    </button>
                    -->
                </div>
            </div>
        </form>
    </div>
    <footer>
        <p>power by 钟建平 © </p>
    </footer>
</div>
<script type="text/javascript" src="${path}/js/jquery.min.js"></script>
<script type="text/javascript" src="${path}/layui/layui.js"></script>
<script type="text/javascript" src="${path}/js/login.js"></script>
</body>
</html>