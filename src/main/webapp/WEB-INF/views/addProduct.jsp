<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/18
  Time: 11:17
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
    <title>添加商品</title>
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />
    <link rel="stylesheet" href="${path}/layui/css/layui.css">
    <script type="text/javascript" src="${path}/js/jquery.min.js"></script>
    <script>
        function checkProduct(){
            var pname = document.getElementById("pname");
            var market_price = document.getElementById("market_price");
            var shop_price = document.getElementById("shop_price");
            var pdesc = document.getElementById("pdesc");
            var image = document.getElementById("image");
            if(pname.value==''){
                alert("请输入商品名称!");
                return false;
            }
            if(market_price.value==''){
                alert('进价不能为空!');
                return false;
            }
            if(shop_price.value==''){
                alert("售价不能为空!");
                return false;
            }
            if(pdesc.value==''){
                alert('输入商品描述!');
                return false;
            }
            if(image.value==''){
                alert('上传商品图片!');
                return false;
            }
            alert("ok")
            return true;
        }
        function getchange(){
            $.ajax({
                type: "get",
                url: "${path}/categorySecond/change.do",
                data: {
                    cid:$("#cid").val()
                },
                success: function (data) {
                    var str = data.split("&")
                    $("#csid").empty();
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
                <legend>添加商品</legend>
                <div class="layui-field-box">
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-xs dw-refresh">
                            <i class="layui-icon">&#x1002;</i>刷新
                        </button>
                    </div>
                    <hr>
                    <form  method="post" action="${path}/product/addProduct.do" enctype="multipart/form-data" onsubmit="return checkProduct(this)">
                        <input type="text" name="pageNow" value="${pageBean.pageNow}" hidden="hidden"/>
                        <input type="text" name="keywords" value="${pageBean.keywords}" hidden="hidden"/>
                        <input type="text" name="csid1" value="${pageBean.csid}" hidden="hidden"/>
                        <input type="text" name="cid1" value="${pageBean.cid}" hidden="hidden"/>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品名</label>
                            <div class="layui-input-inline">
                                <input style="width:270px;" type="text"
                                       value="${product.pname}" id="pname"
                                       name="pname" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">进价</label>
                            <div class="layui-input-inline">
                                <input style="width:270px;" type="text"
                                       value="${product.market_price}" id="market_price"
                                       name="market_price" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">售价</label>
                            <div class="layui-input-inline">
                                <input style="width:270px;" type="text"
                                       value="${product.shop_price}" id="shop_price"
                                       name="shop_price" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品描述</label>
                            <div class="layui-input-inline">
                                <textarea cols="33" rows="8" name="pdesc">${product.pdesc}</textarea>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">所属一级类目</label>
                            <div class="layui-input-inline">
                                <select name="cid" style="width:270px;height:40px;"id="cid" onchange="getchange()">
                                    <c:forEach var="category" items="${categoryList}">
                                        <option value="${category.cid}">${category.cname}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">所属二级类目</label>
                            <div class="layui-input-inline">
                                <select style="width:270px;height:40px;" name="csid" id="csid">
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">是否热门</label>
                            <div class="layui-input-inline">
                                <!--
                                <input style="width:270px;" type="text"
                                       value="${sessionScope.adminUser.password}"
                                       name="shop_price" class="layui-input"/>
                                 -->
                                <select name="is_hot" style="width:270px;height:40px;">
                                    <option value="0">不热门</option>
                                    <option value="1">热门</option>
                                </select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品图片</label>
                            <div class="layui-input-inline">
                                <input type="file" id="image"
                                       name="pic" />
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
