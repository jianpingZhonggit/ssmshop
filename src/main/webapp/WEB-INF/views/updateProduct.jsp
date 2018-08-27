<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/18
  Time: 10:47
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
    <title>商品详情页</title>
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
                <legend>个人信息</legend>
                <div class="layui-field-box">
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-xs dw-refresh">
                            <i class="layui-icon">&#x1002;</i>刷新
                        </button>
                    </div>
                    <hr>
                    <form class="layui-form" method="post" enctype="multipart/form-data" action="${path}/product/updateProduct.do">
                        <input type="text" name="pageNow" value="${pageBean.pageNow}" hidden="hidden"/>
                        <input type="text" name="keywords" value="${pageBean.keywords}" hidden="hidden"/>
                        <input type="text" name="csid" value="${pageBean.csid}" hidden="hidden"/>
                        <input type="text" name="cid" value="${pageBean.cid}" hidden="hidden"/>
                        <input type="text" name="pid" value="${product.pid}" hidden="hidden"/>

                        <div class="layui-form-item">
                            <label class="layui-form-label">商品名</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text"
                                       value="${product.pname}"
                                       name="pname" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">售价</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text"
                                       value="${product.shop_price}"
                                       name="shop_price" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">进价</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text"
                                       value="${product.market_price}"
                                       name="market_price" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">是否下架</label>
                            <div class="layui-input-inline">
                                <select name="is_off">
                                    <option value="1">恢复</option>
                                    <option value="0">下架</option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品原图</label>
                            <div class="layui-input-inline">
                                <input type="text" name="image" value="${product.image}" hidden="hidden"/>
                                <img name="photo" style="width:160px;height:240px;" src="${path}/images/${product.image}"/>
                                <!--
                                <input style="width:240px;" type="text"
                                       value="${product.image}"
                                       name="market_price" class="layui-input"/>
                                -->
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">更换图片</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="file"
                                        name="pic"/>
                                <!--
                                <input style="width:240px;" type="text"
                                       value="${product.market_price}"
                                       name="market_price" class="layui-input"/>
                                -->
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block" style="float:left;">
                                <!--
                                <button class="layui-btn" lay-submit lay-filter="formDemo">修改</button>
                                -->
                                <input style="color: white;width:70px;height:38px;background-color: #009688;border:none;" type="submit" value="修改"/>
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