<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/11
  Time: 10:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>电商后台大布局 - Layui</title>
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />
    <link rel="stylesheet" href="${path}/layui/css/layui.css">
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">电商后台</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                    ${sessionScope.adminUser.username}
                </a>
                <dl class="layui-nav-child">
                    <dd><a href="">基本资料</a></dd>
                    <dd><a href="">安全设置</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a href="${path}/admin/exit.do">退出登录</a>
            </li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree"  lay-filter="test">
                <li class="layui-nav-item">
                    <a class="layui-this" href="${path}/admin/indexOfAdmin.do">首页</a>
                    </li>
                <li class="layui-nav-item">
                    <a class="" href="${path}/admin/personal.do">个人中心</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/user/userList.do">用户管理</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/order/orderList.do">订单管理</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/category/categoryList.do">一级类目</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/categorySecond/categorySecondList.do">二级类目</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/product/productListOfAdmin.do">商品管理</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
            <fieldset class="layui-elem-field">
                <!--
                <legend>控制台-系统信息</legend>
                <div class="layui-field-box">
                    <table class="layui-table">
                        <colgroup>
                            <col width="150">
                            <col width="200">
                            <col>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>昵称</th>
                            <th>加入时间</th>
                            <th>签名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>贤心</td>
                            <td>2016-11-29</td>
                            <td>人生就像是一场修行</td>
                        </tr>
                        <tr>
                            <td>许闲心</td>
                            <td>2016-11-28</td>
                            <td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>
                        </tr>
                        <tr>
                            <td>sentsin</td>
                            <td>2016-11-27</td>
                            <td> Life is either a daring adventure or nothing.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                -->
            </fieldset>
            <fieldset class="layui-elem-field">
                <legend>Welcome</legend>
                <div class="layui-field-box">
                    <br/>
                    <br/>
                    <h1>欢迎进入后台管理系统</h1>
                    <br/><br/>
                    <br/><br/>
                    <!--
                    <table class="layui-table">
                        <colgroup>
                            <col width="150">
                            <col width="200">
                            <col>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>昵称</th>
                            <th>加入时间</th>
                            <th>签名</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>贤心</td>
                            <td>2016-11-29</td>
                            <td>人生就像是一场修行</td>
                        </tr>
                        <tr>
                            <td>许闲心</td>
                            <td>2016-11-28</td>
                            <td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>
                        </tr>
                        <tr>
                            <td>sentsin</td>
                            <td>2016-11-27</td>
                            <td> Life is either a daring adventure or nothing.</td>
                        </tr>
                        </tbody>
                    </table>
                    -->
                </div>
            </fieldset>
        </div>
    </div>
    <div class="layui-footer">
        <!-- 底部固定区域 -->
        © layui.com - 底部固定区域
    </div>
</div>
<script type="text/javascript" src="${path}/js/jquery.min.js"></script>
<script type="text/javascript" src="${path}/layui/layui.js"></script>
<script type="text/javascript" src="${path}/js/index.js"></script>
</body>
</html>
