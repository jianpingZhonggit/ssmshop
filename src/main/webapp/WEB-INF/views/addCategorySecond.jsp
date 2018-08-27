<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/25
  Time: 15:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>电商后台</title>
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />
    <link rel="stylesheet" href="${path}/layui/css/layui.css">
    <script>
        function checkCategorySecond(){
            var csname = document.getElementById("csname");
            if(canem.val()==''){
                alert("请输入类目名称!");
                return false;
            }
            return true;
        }
    </script>
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
                <a href="">退出登录</a>
            </li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree"  lay-filter="test">
                <li class="layui-nav-item">
                    <a href="${path}/admin/indexOfAdmin.do">首页</a>
                </li>
                <li class="layui-nav-item layui-nav-itemed">
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
                <legend>添加一级类目</legend>
                <div class="layui-field-box">
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-xs dw-refresh">
                            <i class="layui-icon">&#x1002;</i>刷新
                        </button>
                    </div>
                    <hr>
                    <form  action="${path}/categorySecond/addCategorySecond.do" method="post" onsubmit="checkCategorySecond()">
                        <input type="text" value="${pageBean.pageNow}" name="pageNow" hidden="hidden"/>
                        <input type="text" value="${pageBean.keywords}" name="keywords" hidden="hidden"/>
                        <div class="layui-form-item">
                            <label class="layui-form-label">类目名</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text"
                                       value="" id="csname"
                                       name="csname" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">所属一级类目</label>
                            <div class="layui-input-inline">
                                <select name="cid" style="width:240px;height:40px;">
                                    <c:forEach var="category" items="${categoryList}">
                                        <option value="${category.cid}">${category.cname}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block" style="float:left;">
                                <!--
                                <button class="layui-btn" lay-submit lay-filter="formDemo">修改</button>
                                -->
                                <input style="color: white;width:70px;height:38px;background-color: #009688;border:none;" type="submit" value="添加"/>
                            </div>
                        </div>
                    </form>
                </div>
            </fieldset>
        </div>
    </div>
    <div class="layui-footer">
    </div>
</div>
<script type="text/javascript" src="${path}/js/jquery.min.js"></script>
<script type="text/javascript" src="${path}/layui/layui.js"></script>
<script type="text/javascript" src="${path}/js/sys_config.js"></script>
</body>
</html>
