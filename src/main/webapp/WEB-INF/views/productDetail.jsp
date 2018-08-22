<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/6
  Time: 20:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
    <title>商品详细页面</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="copyright" content="米橙电子">
    <link rel="stylesheet" type="text/css" href="${path}/images/normalize.css" />
    <link rel="stylesheet" type="text/css" href="${path}/images/layout.css" />

    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.4.2/jquery.min.js">

    </script>
    <script type="text/javascript" src="${path}/js/header.js"></script>
    <script type="text/javascript" src="${path}/js/goodsnew_2013.js"></script>
    </head>
<body>
<style>.nav a.home {background: url("${path}/images/header_logo_1.png") no-repeat center;}</style>
<div id="header">
    <ul class="nav">
    </ul>

    <dl class="funcs">
        <dt>
            <form id="searchForm" name="searchForm" method="get" action="${path}/productList.do" ">
            <c:if test="${pageBean.keywords==null||pageBean.keywords==''}">
                <input class="text" name="keywords" value="${pageBean.keywords}" id="so_txt" type="text"  placeholder="请输入商品名称或条码进行搜索" autocomplete="off" />
            </c:if>
            <c:if test="${pageBean.keywords!=null&&pageBean.keywords!=''}">
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

<style>
    .sharebox{display:block;height:32px;width:200px;overflow:hidden}
    .sharebox a{
        cursor:pointer;
        display:block;
        width:32px;!important;
        height:32px;!important;
        float:left;
        margin-left:8px;
        padding:0px!important;
    }
    .sharebox a.bds_tsina {
        background-color:#f44c4f;
        background-position:-50px -2100px!important;
        background-image:url(${path}/images/icons.png);
    }
    .sharebox a.bds_tqq {
        background-color:#54bdbb;
        background-position:-50px -2150px!important;
        background-image:url(${path}/images/icons.png);
    }
    .sharebox a.bds_qzone {
        background-color:#f6bb3d;
        background-position:-50px -2200px!important;
        background-image:url(${path}/images/icons.png);
    }
    .sharebox a.bds_douban {
        background-color:#47a350;
        background-position:-50px -2060px!important;
        background-image:url(${path}/images/icons.png);
    }
    .sharebox a.bds_huaban{
        background-color:#f44c4f;
        background-position:0px 0px!important;
        background-image:url(${path}/images/icon1.png);
    }
    #countdown strong{font-size:12px;color:#999999;font-weight:normal;}
</style>
<div class="main detail">
    <div class="detai_topbox">
        <ul class="address">

        </ul>
        <div class="informations">
            <form action="${path}/cart.do" method="post">
            <input type="text" name="pid" value="${product.pid}" hidden="hidden"/>
            <div class="pic">
                <div class="wrapper">
                    <div class="itempic" style="display:block;">
                        <a class="cloud-zoom" rel="position:'inside',showTitle:false"
                           href="http://www.5jihua.com/nopic_500.gif">
                            <img src="${path}/images/${product.image}" turnxml="0"/>
                        </a>
                        <div class="mousetrap"></div>
                    </div>

                </div>
                <ul class="pic_index">
                    <li class="pic_li pic_on">
                        <img src="${path}/images/${product.image}" />
                    </li>

                </ul>
            </div>
            <div class="infor">
                <h1>${product.pname}</h1>
                <dl class="sale">
                    <dt class="discount" id="price_goods_div">
                        <strong>￥${product.shop_price}</strong>
                        / 个&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        零售价：￥${product.market_price}
                        <input type="hidden" value="0" id="main_goods_price" />
                        <input type="hidden" value="0" id="main_shop_price" />
                    </dt>
                </dl>

                <p class="purchasing">
                    <i>
                        时间:<fmt:formatDate value="${product.pdate}" pattern="yyyy-MM-dd"/>
                    </i>
                </p>

                <div  id="paykey_new">
                    <ul>
                        <li>
                            <dl class="number">
                                <dt>选购数量</dt>
                                <dd>
                                    <span class="num_dw" id="buynum_dw"></span>
                                    <input name="count" class="" id="shuliang"
                                           type="text" value="1" maxlength="4"  />
                                    <span class="num_up" id="buynum_up"></span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>选购备注</dt>
                                <dd>
                                    <input class="num_input" id="yaoqiu" type="text" value="" maxlength="25" />
                                </dd>
                            </dl>
                        </li>
                    </ul>
                    <div class="goods_but">
                        <div style="height:38px;">
                            <input style="color:#fff;
                                          width:143px;
                                          height:40px;
                                          margin-right:7px;
                                          border:none;
                                          font-size:20px;
                                          background-color:#ff4246"
                                   type="submit" value="加入购物车"/>
                            <a class="fav" id="248015" type="0" status="1" href="javascript:void(0);">收藏</a>
                        </div>
                        <p id="goumaism">请填写选购数量,点击"放入购物车"</p>
                    </div>
                    <div class="cart_pop"></div>
                    <ul class="Pref">
                        <li><i></i><div>暂无优惠信息!</div></li>
                    </ul>
                </div>
            </div>
            </form>
        </div>
    </div>

    <div class="box" id="main_l" style="margin-bottom:0;">
        <ul class="select_bar">
            <li class="current" id="all">商品详情</li>
            <li id="comment"></li>
        </ul>
    </div>
    <div class="product_mess">
        <div class="mess_box">
            <div class="gn_decri">
                <p>${product.pname}</p>
            </div>
            <div class="cs_box">
                <ul class="csList">
                    <li>
                        <b>描述:</b>
                        ${product.pdesc}
                    </li>
                    <%--<li><b>静重：</b>0 g</li>
                    <li><b>产品尺寸：</b></li>
                    <li><b>包装尺寸：</b></li>
                    <li><b>材质：</b></li>
                    <li><b>商品标签：</b></li>
                    <li><b>关键词：</b></li>--%>
                </ul>
            </div>
        </div>
    </div>
    <div class="box details">
        <p></p>
    </div>
</div>
<!--<script>
    var qiding=40;
    var dizeng=40;
    var kucun=2980;
    try{
        document.getElementById("shuliang").value=40
    }catch(e){

    };
</script>-->

<!--div class="goTop_box">
  <div class="kfBut">
    <div class="kfqq_box none">
    <a href="http://wpa.qq.com/msgrd?v=3&uin=726090666&site=qq&menu=yes" target="_blank" class="keone">客服1</a>
    <a href="http://wpa.qq.com/msgrd?v=3&uin=726090666&site=qq&menu=yes" target="_blank" class="ketow">客服2</a>
    </div>
  </div>
  <div id="toTop"></div>
</div>
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
        <a class="dib" target="_blank" href="#"><img src="images/footer_01.png" alt="分销合作"></a>
        <a class="dib" target="_blank" href="#"><img src="images/footer_02.png" alt="30天退换货保障"></a>
        <a class="dib" target="_blank" href="#"><img src="images/footer_03.png" alt="VIP大宗采购"></a>
        <a class="dib" target="_blank" href="#"><img src="images/footer_04.png" alt="客服电话"></a>
        <a class="dib" target="_blank" href="#"><img src="images/footer_05.png" alt="意见反馈"></a>
        <a class="dib" target="_blank" href="#"><img src="images/footer_06.png" alt="新浪微博"></a>
        <a class="dib"><img src="images/footer_07.png" alt="腾讯微信"></a>
    </ul>
    <p><a class="credits" href="article-57.html">积分计划</a><a href="article-133.html">优惠券/礼品卡</a>
    <a href="article-569.html">商品兑换券</a><a class="invoice" href="article-135.html">发票制度</a>
    <a href="article-15.html">配送说明</a><a href="article-136.html">退换货保障</a></p>
</div-->
<div id="footer">
    <div class="wraps">
        <!--ul>
          <li><a href="about.html?cd=101">关于我们</a></li>
          <li><a href="about.html?cd=102">联系我们</a></li>
          <li><a href="help.html?cd=301">新手指南</a></li>
          <li><a href="help.html?cd=401">配送方式</a></li>
          <li><a href="help.html?cd=501">如何付款</a></li>
          <li><a href="help.html?cd=601">售后服务</a></li>
          <li><a class="join" href="http://www.MinCheng.cn/" target="_blank">连锁加盟</a></li>
        </ul-->
        &copy;米橙电子 - 版权所有 浙ICP备xxxxx号 | <a href="images/jyxbeian.jpg" target="_blank">经营性ICP许可证：浙B2-xxxx</a>
    </div>
</div>

</body>
</html>

