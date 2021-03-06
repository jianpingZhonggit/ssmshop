<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/12
  Time: 19:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
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
    <script type="text/javascript" src="${path}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${path}/layui/layui.js"></script>
    <script type="text/javascript" src="${path}/icheck/icheck.js"></script>
    <script type="text/javascript" src="${path}/js/dw.js"></script>
    <script>
        function getchange(){
            $.ajax({
                type: "get",
                url: "${path}/categorySecond/change.do",
                data: {
                    cid:$("#cid").val()
                },
                success: function (data) {
                    if(data!=''){
                        var str = data.split("&")
                        $("#csid").empty();
                        $("#csid").append("<option value=''>二级类目</option>");
                        for(var i=0;i<str.length;i++){
                         var strs = str[i].split("?");
                        /*if($("#tempcsid").val()==strs[1]){
                            $("#csid").append("<option selected='selected' value='"+strs[1]+"'>"+strs[0]+"</option>");
                        }else{
                            $("#csid").append("<option value='"+strs[1]+"'>"+strs[0]+"</option>");

                        }*/
                        $("#csid").append("<option value='"+strs[1]+"'>"+strs[0]+"</option>");
                        }
                    }

                }
            });
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
                <a href="${path}/admin/exit.do">退出登录</a>
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
                <li class="layui-nav-item layui-nav-itemed">
                    <a href="${path}/product/productListOfAdmin.do">商品管理</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
            <fieldset class="layui-elem-field">
                <legend>商品管理 - 商品列表</legend>
                <div class="layui-field-box">
                    <form  action="${path}/product/productListOfAdmin.do?pageNow=${pageBean.pageNow}">
                        <div class="layui-form-item" style="text-align:center;">
                            <select name="cid" id="cid" style="width:150px;height:40px;" onchange="getchange()">
                                <option value="">一级类目</option>
                                <c:forEach var="category" items="${categoryList}">
                                    <c:if test="${category.cid==pageBean.cid}">
                                        <option selected="selected" value="${category.cid}">${category.cname}</option>
                                    </c:if>
                                    <c:if test="${category.cid!=pageBean.cid}">
                                        <option value="${category.cid}">${category.cname}</option>
                                    </c:if>
                                </c:forEach>

                            </select>
                            <input type="text" id="tempcsid" value="${pageBean.csid}" hidden="hidden"/>
                            <select name="csid" id="csid" style="width:150px;height:40px;">
                                <option value="">二级类目</option>
                                <c:forEach var="categorySecond" items="${categorySecondList}">
                                    <c:if test="${categorySecond.csid==pageBean.csid}">
                                        <option selected="selected" value="${categorySecond.csid}">${categorySecond.csname}</option>
                                    </c:if>
                                    <c:if test="${categorySecond.csid!=pageBean.csid}">
                                        <option value="${categorySecond.csid}">${categorySecond.csname}</option>
                                    </c:if>
                                </c:forEach>
                            </select>
                            <div class="layui-inline">
                                <div class="layui-input-inline">
                                    <input autocomplete="off" class="layui-input"
                                           placeholder="请输入商品名称" type="text"
                                           name="keywords" value="${pageBean.keywords}">
                                </div>
                            </div>
                            <div class="layui-inline" style="text-align:left;">
                                <div class="layui-input-inline">
                                    <button class="layui-btn">
                                        <i class="layui-icon">&#xe615;</i>
                                        查询
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form action="${path}/product/batchDelProduct.do?pageNow=${pageBean.pageNow}&keywords=${pageBean.keywords}" method="post">
                    <hr>
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-xs layui-btn-normal dw-dailog" dw-url="create.html" dw-title="新增用户" dw-width="100%" dw-height="100%">
                            <i class="layui-icon">&#xe654;</i>
                            <a style="color:white;" href="${path}/product/addProduct.do?pageNow=${pageBean.pageNow}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">新增</a>
                        </button>
                        <!--
                        <button class="layui-btn layui-btn-xs layui-btn-danger dw-batch-delete" dw-url="./delete.json">
                            <i class="layui-icon">&#xe640;</i>
                            <input style="border:none;" class="layui-btn layui-btn-xs layui-btn-danger dw-batch-delete"
                                   type="submit" value="删除">
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
                            <th style="text-align:center;">商品名</th>
                            <th style="text-align:center;">上市时间</th>
                            <th style="text-align:center;">进价</th>
                            <th style="text-align:center;">售价</th>
                            <th style="text-align:center">下架</th>
                            <th style="text-align:center;">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach var="product" items="${pageBean.recordList}">
                        <tr>
                            <!--
                            <td>
                                <input type="checkbox" name="checked" value="${product.pid}">
                            </td>
                            -->
                            <td>${product.pname}</td>
                            <td>
                                <fmt:formatDate value="${product.pdate}" pattern="yyyy-MM-dd"/>

                            </td>
                            <td>${product.market_price}</td>
                            <td>${product.shop_price}</td>
                            <td>
                                <c:if test="${product.is_off=='0'}">
                                    已下架
                                </c:if>
                                <c:if test="${product.is_off=='1'}">
                                    在售
                                </c:if>
                            </td>
                            <td class="text-center">
                                <div class="layui-btn-group">
                                    <button class="layui-btn layui-btn-xs layui-btn-normal dw-dailog">
                                       <!--
                                        <i class="layui-icon">&#xe642;</i>
                                        -->
                                        <a style="color: white;" href="${path}/product/productDetail.do?pageNow=${pageBean.pageNow}&keywords=${pageBean.keywords}&csid=${pageBean.csid}&cid=${pageBean.cid}&pid=${product.pid}">编辑</a>
                                    </button>
                                    <!--删除按钮-->

                                    <button class="layui-btn layui-btn-xs layui-btn-danger dw-delete">
                                        <i class="layui-icon">&#xe640;</i>
                                        <a href="${path}/product/delProduct.do?pid=${product.pid}&pageNow=${pageBean.pageNow}&keywords=${pageBean.keywords}&cid=${pageBean.cid}&csid=${pageBean.csid}"style="color:white">删除</a>
                                    </button>
                                    <c:if test="${delPid==product.pid}">
                                        <button style="border: none;width: 10px;"/>
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
                    </form>
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
                                    <a href="${path}/product/productListOfAdmin.do?pageNow=1&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">首页</a>
                                </li>
                                <li>
                                    <a href="${path}/product/productListOfAdmin.do?pageNow=${beginPage-10}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">上一页</a></li>
                            </c:if>
                            <c:forEach var="i" begin="${beginPage}" end="${endPage}">
                                <li>
                                    <a href="${path}/product/productListOfAdmin.do?pageNow=${i}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">${i}
                                    </a>
                                </li>
                            </c:forEach>
                            <c:if test="${pageBean.pageCount%10==0}">
                                <c:set var="group" value="${pageBean.pageCount/10}"/>
                            </c:if>
                            <c:if test="${pageBean.pageCount%10!=0}">
                                <c:set var="group" value="${(pageBean.pageCount-pageBean.pageCount%10)/10+1}"/>
                            </c:if>
                            <c:if test="${(beginPage-beginPage%10)/10+1!=group}">
                                 <li>
                                    <a href="${path}/product/productListOfAdmin.do?pageNow=${beginPage+10}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">下一页
                                    </a>
                                </li>
                                <li>
                                    <a href="${path}/product/productListOfAdmin.do?pageNow=${pageBean.pageCount}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">尾页
                                    </a>
                                </li>
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
</body>
</html>
