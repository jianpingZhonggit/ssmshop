<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/7
  Time: 14:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
    <meta http-equiv="expires" content="" />
    <title>MinCheng米橙电子 - 严格甄选，为消费者提供真正"优质、创意、低价"的产品！</title>
    <meta name="Keywords" content="米橙电子,MinCheng" />
    <meta name="Description" content="MinCheng米橙电子一直倡导“优质生活”理念，秉承“尊重消费者”的品牌精神，深入世界各地，严格把关所有商品的产地、工艺、原材料，甄选居家百货、厨房日用品、饮食等各类商品，致力于为消费者提供真正优质、创意、低价的产品！" />
    <link rel="shortcut icon" href="images/favicon.ico" />
    <link rel="icon" type="image/gif" href="images/favicon.gif" />
    <link rel="stylesheet" type="text/css" href="${path}/images/normalize.css" />
    <link rel="stylesheet" type="text/css" href="${path}/images/layout.css" />
    <link href="${path}/images/user.css" rel="stylesheet" type="text/css">
    <link href="${path}/images/user_cart.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="${path}/js/header.js"></script>
    <script type="text/javascript" src="${path}/js/quwan-plugin.js"></script>
    <script type="text/javascript" src="${path}/js/common.js"></script>
    <script type="text/javascript" src="${path}/js/action.js"></script>
    <script type="text/javascript" src="${path}/js/check.js"></script>
    <script type="text/javascript" src="${path}/js/util.js"></script>
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
            <form id="searchForm" name="searchForm" method="get" action="psearch.html" onsubmit="return checkSearchFormAction();">
                <input class="text" name="keywords" id="so_txt" type="text" value="" placeholder="请输入商品名称或条码进行搜索" autocomplete="off" />
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

<form action="${path}/order/pay.do" method="post" onsubmit=" return check(this)">
<div class="main user">
    <div class="bodycenter" style="background-color:#fff">
            <div style="
                        margin-bottom:10px;
                        height:26px;
                        border-bottom:2px solid #999;
                        text-align:left;
                        FONT-SIZE:16px;
                        COLOR: #333333;
                        FONT-FAMILY:'黑体';
                        line-height:26px">
                填写收货信息
            </div>
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td width="10%" height="30" bgcolor="#FFFFFF">
                        <div align="right">收货人姓名:</div>
                    </td>
                    <td width="90%" bgcolor="#FFFFFF">
                        <input type="text"
                               name="name"
                               class="textbox"
                               value="${sessionScope.user.username}" size="15" maxlength="10">
                    </td>
                </tr>
                <tr>
                    <td height="30" bgcolor="#FFFFFF">
                        <div align="right">收货地址：</div>
                    </td>
                    <td bgcolor="#FFFFFF">
                        <input type="text" class="textbox"
                               name="addr"
                               id="userdz" value="${sessionScope.user.address}" size="30" maxlength="100">
                        <!--
                        <span class="red">*</span>
                        <span class="s999999">用于收货</span>
                        -->
                    </td>
                </tr>
                <tr>
                    <td height="30" bgcolor="#FFFFFF">
                        <div align="right">邮政编码：</div>
                    </td>
                    <td bgcolor="#FFFFFF">
                        <input type="text"
                               class="textbox" id="useryb"
                               name="code"
                               value="${sessionScope.user.code}" size="10" maxlength="10" style="IME-MODE:disabled">
                        <!--
                        <span class="red">*</span>
                        <span class="s999999">用于收货</span>
                        -->
                    </td>
                </tr>
                <tr>
                    <td height="30" bgcolor="#FFFFFF">
                        <div align="right">电话号码:</div></td>
                    <td bgcolor="#FFFFFF">
                        <input type="text"
                               class="textbox" id="userdh"
                               name="phone" value="${sessionScope.user.phone}"
                               size="20" maxlength="30" style="IME-MODE:disabled">
                    </td>
                </tr>
                <tr>
                    <td height="60" bgcolor="#FFFFFF">
                        <div align="right">购买的商品:
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                    <td bgcolor="#FFFFFF">
                        <table>
                            <tr>
                                <td style="width:180px;text-align:center;">商品名</td>
                                <td style="width:30px;text-align:center;">单价</td>
                                <td style="width:60px;text-align:center;">购买数量</td>
                                <td style="width:30px;text-align:center;">小计</td>
                            </tr>
                            <c:forEach var="cartItem" items="${shop}">
                                <tr>
                                    <td style="width:180px;text-align:center;">${cartItem.product.pname}</td>
                                    <td style="width:30px;text-align:center;">${cartItem.product.shop_price}</td>
                                    <td style="width:60px;text-align:center;">${cartItem.count}</td>
                                    <td style="width:30px;text-align:center;">${cartItem.subTotal}</td>
                                </tr>
                            </c:forEach>
                        </table>

                    </td>
                </tr>
            </table>
            <div style="margin-top:10px;margin-bottom:10px;height:26px;border-bottom:2px solid #999;text-align:left;FONT-SIZE:16px;COLOR: #333333;FONT-FAMILY:'黑体';line-height:26px">选择发货方式</div>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top:3px;">
                <tr>
                    <td width="13%" height="40"><div style="padding-left:25px"><input name="fhfs" id="fhfs1" type="radio" value="上门取货" onclick="checkfhfs()"><label for="fhfs1"> 上门取货</label></div></td>
                    <td width="26%">到货时间：当天</td>
                    <td width="61%">亲自到本公司仓库提货（地址：义乌市北苑秋实路商城创业园B1幢1单元4楼，电话：4006860016）</td>
                </tr>
                <tr>
                    <td height="40"><div style="padding-left:25px"><input type="radio" name="fhfs" id="fhfs2" value="物流汽运" onclick="checkfhfs()"><label for="fhfs2"> 物流汽运</label></div></td>
                    <td>到货时间：江浙沪2-3天，其它地区5-7天</td>
                    <td>专线运输公司配送，不送货上门，一般到当地县城托运站后自提。运费10-25元/箱，可装30公斤；如有中转可能会高出5-10元（运费到付）</td>
                </tr>
                <tr>
                    <td colspan="3"><div id="fhfs20" style="margin-left:50px; padding:5px; border:2px solid #F30; display:none; color:#F30">如果您以前在义乌其它网站进过货，有用过觉得满意的物流公司，请在以下框中输入公司名称及电话号码(可以询问您进货的批发网)，我们可以往那里发货<br>
                        <input name="fhfs0" type="text" id="fhfs0" value="" size="50" maxlength="50">
                    </div></td>
                </tr>
                <tr>
                    <td height="40"><div style="padding-left:25px"><input type="radio" name="fhfs" id="fhfs3" value="顺丰快递" onclick="checkfhfs()"><label for="fhfs3"> 顺丰快递</label></div></td>
                    <td>到货时间：江浙沪1-2天，其它地区2-3天</td>
                    <td>价格较贵、快速安全，2公斤以下推荐（运费到付）</td>
                </tr>
                <tr>
                    <td height="40"><div style="padding-left:25px"><input type="radio" name="fhfs" id="fhfs4" value="其它快递" onclick="checkfhfs()"><label for="fhfs4"> 其它快递</label></div></td>
                    <td>到货时间：江浙沪1-2天，其它地区2-4天</td>
                    <td>韵达、圆通、EMS等，4公斤以下推荐（江浙沪预付30元，其它地区预付35元，多退少补）<a href="/hdetail.html?mc=express" target="_blank" class="aFF3300">查看价格表</a></td>
                </tr>
            </table>


            <input name="fhyf" id="fhyf" type="hidden" value="0">
            <div style="margin-top:10px;margin-bottom:10px;height:26px;border-bottom:2px solid #999;text-align:left;FONT-SIZE:16px;COLOR: #333333;FONT-FAMILY:'黑体';line-height:26px">确认订单信息</div>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top:3px;">
                <tr>
                    <td width="10%" height="40"><div style="padding-left:35px">订单货款：</div></td>
                    <td width="90%"><span style="font-size:13px;font-weight:bold;color:#F30;">${total}</span>&nbsp;元
                    </td>
                </tr>
                <tr>
                    <td height="40"><div style="padding-left:35px">预付运费：</div></td>
                    <td><span id="sjyf" style="font-size:13px;font-weight:bold;color:#F30;">0</span>&nbsp;元（按发货后实际运费多退少补）</td>
                </tr>
                <tr>
                    <td width="10%" height="40"><div style="padding-left:35px">使用红包：</div></td>
                    <td width="90%">
                        <SELECT name="bonus" id="bonus" onChange="changebonus(this)">
                            <option value="0|0">-请选择-</option>

                        </SELECT>
                    </td>
                </tr>
                <tr>
                    <td height="40"><div style="padding-left:35px">合计应付：</div></td>
                    <td><span id="hjyf" style="font-size:20px;font-weight:bold;color:#F30;">${total}</span>&nbsp;元</td>
                </tr>
            </table>
        <script language="javascript">
            var kx_ddje=3371.28;
            var kx_sjyf=0;
            var kx_bonus=0;
            function changebonus(){
                kx_bonus=document.getElementById("bonus").value.split("|")[1]
                kx_bonus=Number(kx_bonus).toFixed(2);
                T=Number(kx_ddje+kx_sjyf-kx_bonus).toFixed(2)
                if(T<kx_sjyf){T=kx_sjyf};
                $("#hjyf").text(T);
            }
            function checkfhfs(){
                if(document.getElementsByName("fhfs")[1].checked==true){$('#fhfs20').slideDown('fast')}else{$('#fhfs20').slideUp('fast')}
                if(document.getElementsByName("fhfs")[3].checked==true){
                    var P=$("#ProvinceCode").val()
                    if (P=="310000" || P=="320000" || P=="330000"){kx_sjyf=30}else{kx_sjyf=35}
                    $("#fhyf").val(kx_sjyf);$("#sjyf").text(kx_sjyf);
                }else{$("#fhyf").val("0");$("#sjyf").text("0.00");kx_sjyf=0;}

                T=Number(kx_ddje+kx_sjyf-kx_bonus).toFixed(2)
                if(T<kx_sjyf){T=kx_sjyf};
                $("#hjyf").text(T);
            }
            function OrderSubmit(){
                if(Chk_OrderSubmit(document.BuyForm)){document.BuyForm.submit()}else{return false;}
            }
        </script>

        <table width="100%" border="0" align="center" cellpadding="10" cellspacing="0" style="margin-top:10px;">
            <tr>
                <td width="100%" height="60">
                    <!--<a href="user_cart.html" class="btn_cartclear" style="float:left;">返回购物车</a>-->
                    <input type="text" value="${oid}" name="oid" hidden="hidden"/>
                    <input style="
                              display: block;
                              width: 120px;
                              height: 50px;
                              color: #fff;
                              background: red;
                              font-size: 22px;
                              letter-spacing: 5px;
                              text-decoration: none;
                              line-height: 50px;
                              text-align: center;
                              border-radius: 2px;
                              border:none;
                              " type="submit" value="付款"/>
                    <!--
                    <a href="${path}/order/pay.do?oid=${oid}" class="btn_cartsubmit">付款</a>
                    -->
                    <!--
                    <a href="javascript:;" onClick="OrderSubmit()" class="btn_cartsubmit">付款</a>
                    -->
                    <!--<a href="javascript:;" onclick="location.href=getcarbackurl()" class="btn_carttobuy">继续选购商品</a>-->
                </td>
            </tr>
        </table>
    </div>
</div>
</form>

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
    $('.kfBut').click(function(){if($('.kfqq_box').hasClass('none')){$('.kfqq_box').removeClass('none');}else{$('.kfqq_box').addClass('none');}});
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
    <p><a class="credits" href="article-57.html">积分计划</a><a href="article-133.html">优惠券/礼品卡</a><a href="article-569.html">商品兑换券</a><a class="invoice" href="article-135.html">发票制度</a><a href="article-15.html">配送说明</a><a href="article-136.html">退换货保障</a></p>
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
        <p>&copy;米橙电子 - 版权所有 浙ICP备xxxxx号 | <a href="images/jyxbeian.jpg" target="_blank">经营性ICP许可证：浙B2-xxxx</a></p>
    </div>
</div>

</body>
</html>
