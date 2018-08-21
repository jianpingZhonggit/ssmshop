<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/6
  Time: 15:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <meta http-equiv="Content-Language"content="zh-cn"/>
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
    <meta http-equiv="expires" content="" />
    <title>首页</title>
    <link href="${path}/css/style2.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="${path}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${path}/js/tab.js"></script>
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />

    <link rel="stylesheet" type="text/css" href="${path}/images/normalize.css" />

    <link rel="stylesheet" type="text/css" href="${path}/images/layout.css" />

    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.4.2/jquery.min.js"></script>

    <script type="text/javascript" src="${path}/js/header.js"></script>
    <!--
    <script type="text/javascript" src="${path}/js/quwan-plugin.js"></script>
    -->
    <style>
        .col1 img {width: 233px; height: 273px}
        .col2 img{width: 478px; height: 478px; margin-left: 0px;}
        .col3 img {width: 478px; height: 233px}
        .col4 img {width: 233px; height: 478px}
    </style>
</head>
<body >


<style>.nav a.home {background: url("${path}/images/header_logo_1.png") no-repeat center;}</style>
<div id="header">
    <ul class="nav">

    </ul>

    <dl class="funcs">
        <dt>
            <form id="searchForm" name="searchForm" method="get" action="${path}/productlist.do"
                  onsubmit="return checkSearchFormAction();">
                <input class="text" name="keywords" id="so_txt" type="text"
                       value="" placeholder="请输入商品名称或条码进行搜索" />
                <input class="submit" type="submit" value="" />
            </form>
        </dt>
        <dd class="user" id="login_message">
            <c:if test="${sessionScope.user==null}">
                <a href="${path}/user/login.do">登录</a>
                <a href="${path}/user/register.do">注册</a>
            </c:if>
            <c:if test="${sessionScope.user!=null}">
                <a href="#">${sessionScope.user.username}</a>
                <a href="${path}/order/order.do">我的订单</a>
                <a href="${path}/user/exit.do">退出登录</a>
            </c:if>
        </dd>
        <dd class="funcs_dd">
            <a class="basket navitem" href="${path}/cart.do" title="购物车"></a>
            <div class="cart_detail dropdown">点击查看购物车</div>
        </dd>
    </dl>
</div>
<ul id="tags">
    <li>
        <a href="${path}/index.do">首页</a>
    </li>
    <c:forEach var="category" items="${categoryList}">
        <li>
            <a href="${path}/productList.do?cid=${category.cid}" id="catogry_340">${category.cname}</a>
        </li>
    </c:forEach>
</ul>
<div class="main" style="height:700px;">
    <section class="aui-flexView">
        <header class="aui-navBar aui-navBar-fixed">
            <div class="aui-center">
                <span class="aui-center-title">我的订单</span>
            </div>
        </header>
        <section class="aui-scrollView">
            <div class="aui-tab" data-ydui-tab>
                <ul class="tab-nav" >

                    <c:if test="${state==null}">
                        <li class="tab-nav-item tab-active">
                            <a href="${path}/order/order.do">全部</a>
                        </li>
                        <li class="tab-nav-item">
                            <a href="${path}/order/order.do?state=2">待付款</a>
                        </li>
                        <li class="tab-nav-item">
                            <a href="${path}/order/order.do?state=1">已完成</a>
                        </li>
                    </c:if>
                    <c:if test="${state=='1'}">
                        <li class="tab-nav-item">
                            <a href="${path}/order/order.do">全部</a>
                        </li>
                        <li class="tab-nav-item">
                            <a href="${path}/order/order.do?state=2">待付款</a>
                        </li>
                        <li class="tab-nav-item tab-active">
                            <a href="${path}/order/order.do?state=1">已完成</a>
                        </li>
                    </c:if>
                    <c:if test="${state=='2'}">
                        <li class="tab-nav-item">
                            <a href="${path}/order/order.do">全部</a>
                        </li>
                        <li class="tab-nav-item tab-active">
                            <a href="${path}/order/order.do?state=2">待付款</a>
                        </li>
                        <li class="tab-nav-item">
                            <a href="${path}/order/order.do?state=1">已完成</a>
                        </li>
                    </c:if>
                </ul>
                <div class="divHeight"></div>
                <div class="tab-panel">
                    <div class="tab-panel-item tab-active">


                        <c:forEach var="order" items="${orderList}">
                            <c:if test="${order.orderItemExts.size()>0}">
                            <form action="${path}/order/dealOrder.do">
                                <div class="tab-item">
                            <a href="javascript:void(0);" class="aui-well-item aui-well-item-clear">
                                <div class="aui-well-item-hd">
                                    <img src="images/icon-logo.png" alt="">
                                </div>
                                <div class="aui-well-item-bd" style="float: left;font-size: 24px;">

                                        <fmt:formatDate value="${order.ordertime}" pattern="yyyy年MM月dd日"/>

                                </div>
                                <c:if test="${order.state==1}">
                                    <span style="color:#0C0C0C;font-size: 24px;">已完成</span>
                                </c:if>
                                <c:if test="${order.state==2}">
                                    <span style="color: red;font-size: 24px;">未完成</span>
                                </c:if>

                            </a>
                            <c:set var="numbers" value="0"/>
                            <c:forEach var="orderitem" items="${order.orderItemExts}">
                            <div class="aui-mail-product" style="background-color: #d0d2d0;" >
                                <a href="javascript:;" class="aui-mail-product-item">
                                    <div class="aui-mail-product-item-hd">
                                        <img src="${path}/images/${orderitem.product.image}" alt="">
                                    </div>
                                    <div class="aui-mail-product-item-bd">
                                        <input type="text" name="pid" value="${orderitem.product.pid}" hidden="hidden"/>
                                        <input type="text" name="count" value="${orderitem.count}" hidden="hidden"/>
                                        <p style="color: #0C0C0C;font-size: 24px;">
                                            ${orderitem.product.pname}&nbsp;&nbsp;&nbsp;&nbsp;
                                            ${orderitem.product.shop_price}&nbsp;X&nbsp;${orderitem.count}
                                            &nbsp;&nbsp;&nbsp;&nbsp;${orderitem.subtotal}
                                        </p>
                                    </div>
                                </a>
                                <c:set var="numbers" value="${numbers+orderitem.count}"/>
                            </div>
                            </c:forEach>
                            <c:if test="${order.state==1}">
                                <a href="javascript:;" class="aui-mail-payment">
                                    <p style="font-size: 24px;color: #0C0C0C;">
                                        共<em>${numbers}</em>
                                        件商品 实付款: ￥<i>${order.total}</i>
                                    </p>
                                </a>
                                <div class="aui-mail-button">
                                    <input type="submit" value="再次购买"
                                           style="
                                            background: none;
                                            border: 1px solid #f0250f;
                                            color: #f0250f;
                                            font-size: 18px;
                                            border-radius: 40px;
                                            display: block;
                                            padding: 2px 14px;
                                            display: inline-block;
                                            float: right;
                                            margin-left: 8px;"/>
                                </div>
                            </c:if>
                            <c:if test="${order.state==2}">
                                <a href="javascript:;" class="aui-mail-payment">
                                    <p style="font-size: 24px;color: #0C0C0C;">
                                        共<em>${numbers}</em>
                                        件商品 应付款: ￥<i>${order.total}</i>
                                    </p>
                                </a>
                                <div class="aui-mail-button">
                                    <input type="text" name="oid" value="${order.oid}" hidden="hidden"/>
                                    <input type="submit" value="付款"
                                           style="
                                            background: none;
                                            border: 1px solid #f0250f;
                                            color: #f0250f;
                                            font-size: 18px;
                                            border-radius: 40px;
                                            display: block;
                                            padding: 2px 14px;
                                            display: inline-block;
                                            float: right;
                                            margin-left: 8px;"/>
                                </div>
                            </c:if>
                            </div>
                            </form>
                            </c:if>
                        </c:forEach>


                    </div>
                </div>
            </div>
        </section>
    </section>
</div>

<script type="text/javascript" src="js/waterfall.js"></script>
<script type="text/javascript">
    $(function(){
        //砖块排列配置
        $('.bricks').masonry({itemSelector:'.brick',columnWidth:245,isAnimated:true,isFitWidth:true});
        //var $container = $('#masonry');$container.imagesLoaded(function(){$container.masonry({
        // itemSelector:'.brick',columnWidth:245,isFitWidth:true,isAnimated: true});});
    })
</script>

<script type="text/javascript">
$(function(){
    //客服
    $('.kfBut').click(function(){if($('.kfqq_box').hasClass('none')){$('.kfqq_box').removeClass('none');
    }else{$('.kfqq_box').addClass('none');}});
    //回到顶部
    $(window).scroll(function(){if($(this).scrollTop() > 0){$("#toTop").fadeIn();}else{$("#toTop").fadeOut();}});
    $("#toTop").click(function(){$("html,body").animate({scrollTop: "0"}, 500);return false;});
})
</script>

<div class="services">
    <ul class="guarantees wrap">
        <a class="dib" target="_blank" href="#">
            分销合作
            <!--<img src="${path}/images/footer_01.png" alt="分销合作">-->
        </a>
        <a class="dib" target="_blank" href="#">
            |&nbsp;&nbsp;30天退换货保障
            <!--<img src="${path}/images/footer_02.png" alt="30天退换货保障">-->
        </a>
        <a class="dib" target="_blank" href="#">
            |&nbsp;&nbsp;VIP大宗采购
            <!--<img src="${path}/images/footer_03.png" alt="VIP大宗采购">-->
        </a>
        <a class="dib" target="_blank" href="#">
            |&nbsp;&nbsp;客服电话
            <!--<img src="${path}/images/footer_04.png" alt="客服电话">-->
        </a>
        <a class="dib" target="_blank" href="#">
            |&nbsp;&nbsp;意见反馈
            <!--<img src="${path}/images/footer_05.png" alt="意见反馈">-->
        </a>
        <a class="dib" target="_blank" href="#">
            |&nbsp;&nbsp;新浪微博
            <!--<img src="${path}/images/footer_06.png" alt="新浪微博">-->
        </a>
        <a class="dib" href="#">
            |&nbsp;&nbsp;腾讯微信
            <!--<img src="${path}/images/footer_07.png" alt="腾讯微信">-->
        </a>
    </ul>
    <p>
        <a class="credits" href="article-57.html">积分计划</a>
        <a href="article-133.html">优惠券/礼品卡</a>
        <a href="article-569.html">商品兑换券</a>
        <a class="invoice" href="article-135.html">发票制度</a>
        <a href="article-15.html">配送说明</a>
        <a href="article-136.html">退换货保障</a>
    </p>
</div>
<div id="footer">
    <div class="wraps">
        &copy;米橙电子 - 版权所有 浙ICP备xxxxx号 | <a href="images/jyxbeian.jpg" target="_blank">经营性ICP许可证：浙B2-xxxx</a>
    </div>
</div>
</body>
</html>

