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
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${path}/images/normalize.css" />
    <link rel="stylesheet" type="text/css" href="${path}/images/layout.css" />
    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="${path}/js/header.js"></script>
    <script type="text/javascript" src="${path}/js/quwan-plugin.js"></script>
    <style>
        .col1 {width: 233px; height: 273px}
        .col1 img {width: 233px; height: 273px}
        .col2 {width: 478px; height: 478px}
        .col2 img{width: 478px; height: 478px; margin-left: 0px;}
        .col3 {width: 478px; height: 233px}
        .col3 img {width: 478px; height: 233px}
        .col4 {width: 233px; height: 478px}
        .col4 img {width: 233px; height: 478px}
    </style>
</head>
<body>


<style>.nav a.home {background: url("${path}/images/header_logo_1.png") no-repeat center;}</style>
<div id="header">
    <ul class="nav">
        <!--<li id="more"><a class="more" href="javascript:;"></a>
            <dl>
                <dt><a href="plist_new.html">新品上市</a></dt>
                <dt><a href="plist_top.html">热销排行</a></dt>

                <dd><a href="plist_buhuo.html">到货预告</a></dd>
                <dt><a href="plist_book.html">新品预订</a></dt>
            </dl>
        </li>
        <li id="home"><a class="home" href="/"></a></li>
        <li><a class="new" href="plist_new.html">新品上市</a></li>
        <li><a class="top" href="plist_top.html">热销排行</a></li>

        <li><a class="buhuo" href="plist_buhuo.html">到货预告</a></li>
        <!--li><a class="qing" href="plist_qing.html">好货清仓</a></li>
        <li><a class="book" href="plist_book.html">新品预订</a></li>

        <li><a class="old" href="index.html">订货系统</a></li>

        -->
    </ul>

    <dl class="funcs">
        <dt>
            <form id="searchForm" name="searchForm" method="get" action="${path}/productList.do"
                  onsubmit="return checkSearchFormAction();">
                <c:if test="${pageBean.keywords==null}">
                    <input class="text" name="keywords" value="${pageBean.keywords}" id="so_txt" type="text"  placeholder="请输入商品名称或条码进行搜索" autocomplete="off" />
                </c:if>
                <c:if test="${pageBean.keywords!=null}">
                    <input class="text" name="keywords" value="${pageBean.keywords}" id="so_txt" type="text"   autocomplete="off" />
                </c:if>
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
<!--<script type="text/javascript">
    var tempso="请输入商品名称或条码进行搜索";
    $(function(){
        //导航更多按钮
        $("#more").hover(function(){$(this).children("dl").show()},function(){$(this).children("dl").hide()});
        //商品目录交互
        $("#tags li").hover(function(){
            $(this).addClass("current").children("dl").show()},function(){
            $(this).removeClass("current").children("dl").hide()});
        //搜索框的交互
        $("#so_txt").val(tempso).focus(function(){if($(this).val() == tempso){$(this).val("");}}).blur(function(){
            if ($(this).val() == ""){$(this).val(tempso)}});
        //搜索提示
        $("#so_txt1").autocomplete('/psearch_tips.html', {
            minChars: 1,
            matchContains: true,
            autoFill: false,
            max: 10,
            matchCase: false,
            scroll: false,
            width: 278,
            resultUrl: 'psearch.html?keywords=',
            formatItem: function(row, i, max) {
                return row[1];
            },
            formatResult: function(row) {
                return row[1];
            }
        });
        $("input.submit").hover(function(){$(this).toggleClass("hover")});

        var $item = $(".navitem"),$menu = $(".dropdown"),onshopnav = false,onshopmenu = false,attemptinghide = false;
        var attempthide = function(ele) {
            if (!attemptinghide) {
                attemptinghide = true;
                setTimeout(function() {
                    attemptinghide = false;
                    if (!onshopnav &&!onshopmenu) {
                        dohide(ele);
                    }
                }, 250);
            }
        };
        var dohide = function(ele) {
            $(ele).siblings(".dropdown").hide();
            $(ele).removeClass('active');
        };
        $(".navitem").live('mouseover mouseleave', function(event) {
            if (event.type=='mouseover'){
                onshopnav = true;
                var $ele = $(this).parent().siblings().children(".navitem");
                $(this).addClass("active");
                $(this).siblings(".dropdown").slideDown("fast");
                dohide($ele);
            } else {
                onshopnav = false;
                if (onshopnav || onshopmenu) {
                    dohide($(this));
                }else{
                    attempthide($(this));
                }
            }
        });
        $(".dropdown").live('mouseover mouseleave', function(event) {
            if (event.type=='mouseover'){
                onshopmenu = true;
            } else {
                onshopmenu = false;
                attempthide($(this).siblings(".navitem"));
            }
        });
    })
</script>
-->
<div class="main">
    <div class="heading" id="headingW" style="position:relative;">
        <h1>欢迎来到米橙电子</h1>
        <p>我们一直倡导优质生活理念，并秉承“尊重消费者”的品牌精神，深入世界各地，
            严格把关所有商品的产地、工艺、原材料，致力于为消费者提供真正"优质、创意、低价"的产品！</p>
    </div>
    <h1>热门商品</h1>
    <br/>
    <div class="waterfall bricks new">
        <c:forEach var="hotProduct" items="${hotProductList}">
            <div class="col1 brick" style="width:244px;height:323px;">
                <a href="${path}/productDetail.do?pid=${hotProduct.pid}" title="${hotProduct.pname}">
                    <img  style="width:244px;height:293px;" onerror="imgerror(event)" src="${path}/images/${hotProduct.image}">
                </a>
                <p class="bg">
                </p>
                <dl>
                    <dd>
                        <a class="name" href="${path}/productDetail.do?pid=${hotProduct.pid}"
                           title="${hotProduct.pname}">${hotProduct.pname}
                        </a>
                        <span>售价:￥${hotProduct.shop_price}</span>
                        <span style="float:right">进价:<font color=red>￥${hotProduct.market_price}</font></span>
                    </dd>
                </dl>
                <div class="actions" style='display:none'>
                    <a class="buy " href="${path}/productDetail.do?pid=${hotProduct.pid}" type="0" status="1">选购</a>
                </div>
            </div>
        </c:forEach>
    </div>
    <br/>
    <h1>最新商品</h1>
    <br/>
    <div class="waterfall bricks new" id="big_div">
        <c:forEach var="newProduct" items="${newProductList}">
            <div class="col1 brick" style="width:244px;height:323px;">
                <a href="${path}/productDetail.do?pid=${newProduct.pid}" title="${newProduct.pname}">
                    <img style="width:244px;height:293px; "src ="${path}/images/${newProduct.image}">
                </a>

                <p class="bg">

                </p>
                <dl>

                    <dd>
                        <a class="name" href="${path}/productDetail.do?pid=${newProduct.pid}"
                           title="${newProduct.pname}">${newProduct.pname}
                        </a>
                        <span>售价:￥${newProduct.shop_price}</span>
                        <span style="float:right">进价:<font color=red>￥${newProduct.market_price}</font></span>
                    </dd>
                </dl>
                <div class="actions" style='display:none'>
                    <a class="buy " href="${path}/productDetail.do?pid=${newProduct.pid}" id="246802" type="0" status="1">选购</a>
                </div>
            </div>
        </c:forEach>


    </div>
    <div class="loading" next_url="router.html?m=pros&a=news_list" data="30"></div>
    <input type="hidden" value="94" id="config_id" />
</div>

<script type="text/javascript" src="js/waterfall.js"></script>
<script type="text/javascript">
    $(function(){
        //砖块排列配置
        $('.bricks').masonry({itemSelector:'.brick',columnWidth:255,isAnimated:true,isFitWidth:true});
        //var $container = $('#masonry');$container.imagesLoaded(function(){$container.masonry({
        // itemSelector:'.brick',columnWidth:255,isFitWidth:true,isAnimated: true});});
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

