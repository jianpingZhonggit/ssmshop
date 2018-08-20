<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/16
  Time: 9:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>电商后台</title>
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
                    贤心
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
                    <a href="${path}/indexOfAdmin.do">首页</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/admin/personal.do">个人中心</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/user/userList.do">用户管理</a>
                </li>
                <li class="layui-nav-item layui-nav-itemed">
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
                <legend>订单信息</legend>
                <div class="layui-field-box">
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-xs dw-refresh">
                            <i class="layui-icon">&#x1002;</i>刷新
                        </button>
                    </div>
                    <hr>
                    <form  action="${path}/order/updateOrder.do">
                        <input type="text" name="pageNow" value="${pageBean.pageNow}" hidden="hidden"/>
                        <input type="text" name="startTime" value="${pageBean.startTime}" hidden="hidden"/>
                        <input type="text" name="endTime" value="${pageBean.endTime}" hidden="hidden"/>
                        <input type="text" name="keywords" value="${pageBean.keywords}" hidden="hidden"/>
                        <input type="text" name="state1" value="${pageBean.state}" hidden="hidden"/>
                        <!--
                        <div class="layui-form-item">
                            <label class="layui-form-label">订单号</label>
                            <div class="layui-input-block">
                                <input style="width:240px;" type="text" name="oid" value="${orderExt.oid}"  class="layui-input">
                            </div>
                        </div>
                        -->
                        <div class="layui-form-item">
                            <label class="layui-form-label">订单号</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text" name="oid" value="${orderExt.oid}" readonly="true" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">下单人</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text" value="${orderExt.user.username}" readonly="true" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">下单时间</label>
                            <div class="layui-input-inline">
                                <!--
                                <input type="text"  value="<fmt:formatDate value="${orderExt.ordertime}" pattern="yyyy-MM-dd HH:mm:ss" />" >

                                <fmt:formatDate value="${orderExt.ordertime}" pattern="yyyy-MM-dd"/>
                                -->

                                <input style="width:240px;" type="date"  value="<fmt:formatDate value="${orderExt.ordertime}" pattern="yyyy-MM-dd" />" readonly="true" class="layui-input">

                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">交易金额</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text" name="total" value="${orderExt.total}" readonly="true" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">收货人联系方式</label>
                            <div class="layui-input-inline">
                                <input style="width:240px;" type="text" name="phone" value="${orderExt.phone}" readonly="true" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">完成情况</label>
                            <div class="layui-input-inline">
                                <select name="state" style="height:30px;width:240px;">
                                    <c:if test="${orderExt.state==1}">
                                        <option selected="selected" value="1">已完成</option>
                                        <option value="2">未完成</option>
                                    </c:if>
                                    <c:if test="${orderExt.state==2}">
                                        <option value="1">已完成</option>
                                        <option selected="selected" value="2">未完成</option>
                                    </c:if>

                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">购买商品</label>
                            <div class="layui-input-inline" style="width:600px;">
                                <table>
                                    <c:forEach var="orderExt" items="${orderExt.orderItemExts}">
                                        <tr>
                                            <td >
                                                 ${orderExt.product.pname}
                                            </td>
                                            <td>${orderExt.product.shop_price}
                                            X${orderExt.count}&nbsp;&nbsp;&nbsp;
                                            ${orderExt.subtotal}
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </table>
                                <!--<input style="width:240px;" type="text" class="layui-input">-->
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block" style="float:left;">
                                <input style="color: white;width:70px;height:38px;background-color: #009688;border:none;" type="submit" value="修改" />
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