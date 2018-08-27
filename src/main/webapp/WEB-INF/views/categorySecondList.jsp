<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/13
  Time: 14:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
    <link rel="stylesheet" href="${path}/css/global.css">
    <link rel="stylesheet" href="${path}/icheck/minimal/red.css">
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
                    <a href="${path}/admin/indexofadmin.do">首页</a>
                </li>
                <li class="layui-nav-item">
                    <a class="" href="${path}/admin/personal.do">个人中心</a>
                </li>
                <li class="layui-nav-item">
                    <a href="user.html">用户管理</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/user/userList.do">订单管理</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/category/categoryList.do">一级类目</a>
                </li>
                <li class="layui-nav-item layui-nav-itemed">
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
                <legend>二级类目 - 类目列表</legend>
                <div class="layui-field-box">
                    <form class="layui-form" action="${path}/categorySecond/categorySecondList.do?pageNow=${pageBean.pageNow}">
                        <div class="layui-form-item" style="text-align:center;">
                            <div class="layui-inline">
                                <div class="layui-input-inline">
                                    <input autocomplete="off" class="layui-input"
                                           placeholder="请输入类目名称" type="text"
                                           name="keywords" value="${pageBean.keywords}">
                                </div>
                            </div>
                            <div class="layui-inline" style="text-align:left;">
                                <div class="layui-input-inline">
                                    <button class="layui-btn"><i class="layui-icon">&#xe615;</i>查询</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr>
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-xs layui-btn-normal dw-dailog">
                            <i class="layui-icon">&#xe654;</i>
                            <a href="${path}/categorySecond/addCategorySecondBefore.do?pageNow=${pageBean.pageNow}&keywords=${pageBean.keywords}">新增</a>
                        </button>
                        <!--
                        <button class="layui-btn layui-btn-xs layui-btn-danger dw-batch-delete" dw-url="./delete.json">
                            <i class="layui-icon">&#xe640;</i>删除
                        </button>
                        -->
                        <button class="layui-btn layui-btn-xs dw-refresh">
                            <i class="layui-icon">&#x1002;</i>刷新
                        </button>
                    </div>
                    <hr>
                    <table class="layui-table">
                        <colgroup>
                            <col width="150">
                            <col width="150">
                            <col width="200">
                            <col>
                            <col>
                        </colgroup>
                        <thead>
                        <tr>
                            <!--
                            <th class="selectAll">
                                &nbsp;&nbsp;
                                全选
                                &nbsp;
                                <input type="checkbox">
                            </th>
                            -->
                            <th style="text-align:center;">类目名称</th>
                            <th style="text-align:center;">所属一级类目</th>
                            <th style="text-align:center;">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach var="categorySecond" items="${pageBean.recordList}">
                        <tr>
                            <!--
                            <td>
                                <input type="checkbox" name="id" value="1">
                            </td>
                            -->
                            <td>${categorySecond.csname}</td>
                            <td>${categorySecond.category.cname}</td>
                            <td class="text-center">
                                <div class="layui-btn-group">
                                    <button class="layui-btn layui-btn-xs layui-btn-normal dw-dailog">
                                        <i class="layui-icon">&#xe642;</i>
                                        <a style="color: white;" href="${path}/categorySecond/toUpdateCategorySecond.do?pageNow=${pageBean.pageNow}&keywords=${pageBean.keywords}&csid=${categorySecond.csid}">编辑</a>
                                    </button>
                                    <button class="layui-btn layui-btn-xs layui-btn-danger dw-delete" >
                                        <i class="layui-icon">&#xe640;</i>
                                        <a style=" color: white;"href="${path}/categorySecond/delCategorySecond.do?csid=${categorySecond.csid}&pageNow=${pageBean.pageNow}&keywords=${pageBean.keywords}">
                                            删除
                                        </a>
                                    </button>
                                    <c:if test="${delCategoryId==categorySecond.csid}">
                                        <button style="width:10px;border: none;"/>
                                        <button class="layui-btn layui-btn-xs layui-btn-danger dw-delete">
                                            无法删除!
                                        </button>
                                    </c:if>
                                </div>
                            </td>
                        </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                    <c:if test="${pageBean.pageCount>1}">
                        <c:set var="beginPage" value="${pageBean.pageNow-pageBean.pageNow%10+1}"/>
                        <c:if test="${pageBean.pageNow%10==0}">
                            <c:set var="beginPage" value="${beginPage-10}"/>
                        </c:if>
                        <c:if test="${beginPage+9>pageBean.pageCount}">
                            <c:set var="endPage" value="${pageBean.pageCount}"/>
                        </c:if>
                        <c:if test="${beginPage+9<=pageBean.pageCount}">
                            <c:set var="endPage" value="${beginPage+9}"/>
                        </c:if>
                        <ul id="menu">
                            <c:if test="${beginPage>10}">
                                <li>
                                    <a href="${path}/categorySecond/categorySecondList.do?pageNow=1&keywords=${pageBean.keywords}">首页</a>
                                </li>
                                <li>
                                    <a href="${path}/categorySecond/categorySecondList.do?pageNow=${beginPage-10}&keywords=${pageBean.keywords}">上一页</a></li>
                            </c:if>
                            <c:forEach var="i" begin="${beginPage}" end="${endPage}">
                                <li><a href="${path}/categorySecond/categorySecondList.do?pageNow=${i}&keywords=${pageBean.keywords}">${i}</a></li>
                            </c:forEach>
                            <c:if test="${pageBean.pageCount%10==0}">
                                <c:set var="group" value="${pageBean.pageCount/10}"/>
                            </c:if>
                            <c:if test="${pageBean.pageCount%10!=0}">
                                <c:set var="group" value="${(pageBean.pageCount-pageBean.pageCount%10)/10+1}"/>
                            </c:if>
                            <c:if test="${(beginPage-beginPage%10)/10+1!=group}">
                                <li><a href="${path}/categorySecond/categorySecondList.do?pageNow=${beginPage+10}&keywords=${pageBean.keywords}">下一页</a></li>
                                <li><a href="${path}/categorySecond/categorySecondList.do?pageNow=${pageBean.pageCount}&keywords=${pageBean.keywords}">尾页</a></li>
                            </c:if>
                            <li>
                                    ${pageBean.pageNow}/${pageBean.pageCount}页
                            </li>
                        </ul>
                    </c:if>
                </div>
            </fieldset>
        </div>
    </div>
    <div class="layui-footer">
    </div>
</div>
<script type="text/javascript" src="${path}/js/jquery.min.js"></script>
<script type="text/javascript" src="${path}/layui/layui.js"></script>
<script type="text/javascript" src="${path}/icheck/icheck.js"></script>
<script type="text/javascript" src="${path}/js/dw.js"></script>
</body>
</html>