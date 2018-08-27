<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/6
  Time: 15:49
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
    <title>个护化妆-所有分类</title>
    <meta name="keywords" content="个护化妆,所有分类">
    <meta name="description" content="">
    <meta name="copyright" content="米橙电子-个护化妆">
    <link rel="stylesheet" type="text/css" href="${path}/images/normalize.css" />
    <link rel="stylesheet" type="text/css" href="${path}/images/layout.css" />
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />
    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="${path}/js/header.js"></script>
    <script type="text/javascript" src="${path}/js/quwan-plugin.js"></script>
    <script type="text/javascript" src="${path}/js/common.js"></script>
    <script type="text/javascript" src="${path}/js/action.js"></script>
    <script type="text/javascript" src="${path}/js/check.js"></script>
    <script>
        <!--
            $(document).ready(function(){setcarbackurl()})
        -->
    </script>
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
            <form id="searchForm" name="searchForm" method="get" action="${path}/productList.do">
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
        <c:if test="${pageBean==null}">
            <a style="background-color: #5c8a97;"href="${path}/index.do" id="catogry_340">首页</a>
        </c:if>
        <c:if test="${pageBean!=null}">
            <a href="${path}/index.do" id="catogry_340">首页</a>
        </c:if>

    </li>
    <c:forEach var="category" items="${categoryList}">
        <li>
            <c:if test="${pageBean.cid==category.cid}">
                <a style="background-color: #5c8a97;"href="${path}/productList.do?cid=${category.cid}" id="catogry_340">${category.cname}</a>
            </c:if>
            <c:if test="${pageBean.cid!=category.cid}">
                <a href="${path}/productList.do?cid=${category.cid}" id="catogry_340">${category.cname}</a>
            </c:if>
            </li>
    </c:forEach>
</ul>
<script type="text/javascript">
    <!--var tempso="请输入商品名称或条码进行搜索";
    $(function(){
        //导航更多按钮
        $("#more").hover(function(){$(this).children("dl").show()},function(){$(this).children("dl").hide()});
        //商品目录交互
        $("#tags li").hover(function(){$(this).addClass("current").children("dl").show()},function(){$(this).removeClass("current").children("dl").hide()});
        //搜索框的交互
        $("#so_txt").val(tempso).focus(function(){if($(this).val() == tempso){$(this).val("");}}).blur(function(){if ($(this).val() == ""){$(this).val(tempso)}});
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
                    if (!onshopnav && !onshopmenu) {
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
    })-->
</script>
<SCRIPT language="javascript">$("#catogry_"+245).addClass("current")</SCRIPT>


<div class="main" style="height:1000px;">
    <ul class="tab">

        <li style="text-indent:15px;margin-right:4px;">分类：</li>
        <!--<li>
            <c:if test="${pageBean==null}">

            </c:if>
            <c:if test="${pageBean!=null}">

            </c:if>
            <a href="plist.html?c=245" id="catogry__245">全部</a>
        </li>-->
        <c:forEach var="categorySecond" items="${categorySecondList}">
            <li>
                <c:if test="${pageBean.csid==categorySecond.csid}">
                    <a style="background-color: #5c8a97;" href="${path}/productList.do?cid=${pageBean.cid}&csid=${categorySecond.csid}"
                       id="catogry__339">${categorySecond.csname}</a>
                </c:if>
                <c:if test="${pageBean.csid!=categorySecond.csid}">
                    <a href="${path}/productList.do?cid=${pageBean.cid}&csid=${categorySecond.csid}"
                       id="catogry__339">${categorySecond.csname}</a>
                </c:if>
            </li>
        </c:forEach>

        <SCRIPT language="javascript">$("#catogry__"+245).addClass("current")</SCRIPT>
        <!--
        <li class="secondary secondary2" id="secondary_li">
            <span>排序：</span>

            <a id="goods_id" href="?c=245&o=T,D">最新</a>

            <a id="sales" href="?c=245&o=S,D">热销</a>

            <a id="goods_price" href="?c=245&o=P,A">价格</a>

        </li>
        -->
    </ul>

    <div class="waterfall bricks" id="big_div">
        <c:set var="i" value="0"/>
        <c:forEach var="product" items="${pageBean.recordList}">
            <div class="col1 brick" style="width: 244px;height:323px;">
                <a href="${path}/productDetail.do?pid=${product.pid}"  title="${product.pname}">
                    <img style="width:244px;height:293px;" onerror="imgerror(event)" src="${path}/images/${product.image}">
                </a>

                <p class="bg">

                </p>
                <dl>

                    <dd>
                        <a class="name" href="${path}/productDetail.do?pid=${product.pid}"  title="${product.pname}">
                                <span id="${product.pid}">${product.pname}</span>
                                <script>
                                    var text = document.getElementById("${product.pid}").innerHTML;
                                    var keys = document.getElementById("${product.pid}");
                                    keys.innerHTML=text.replace("${pageBean.keywords}","<font color='red'>${pageBean.keywords}</font>");
                                </script>
                        </a>
                        <span>售价:￥${product.shop_price}</span>
                        <span style="float:right">进价:<font color=red>￥${product.market_price}</font></span>
                    </dd>
                </dl>
                <div class="actions" style='display:none'>
                    <a class="buy " href="javascript:void(0);" id="246802" type="0" status="1">选购</a>
                </div>
            </div>
        </c:forEach>
    </div>
    <div id="toTop">
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
                    <a href="${path}/productList.do?pageNow=1&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">首页</a>
                </li>
                <li>
                    <a href="${path}/productList.do?pageNow=${beginPage-10}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">上一页</a></li>
            </c:if>
            <c:forEach var="i" begin="${beginPage}" end="${endPage}">

                <li>
                    <a href="${path}/productList.do?pageNow=${i}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">${i}
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
                <li><a href="${path}/productList.do?pageNow=${beginPage+10}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">下一页</a></li>
                <li><a href="${path}/productList.do?pageNow=${pageBean.pageCount}&cid=${pageBean.cid}&csid=${pageBean.csid}&keywords=${pageBean.keywords}">尾页</a></li>
            </c:if>
            <li>
                ${pageBean.pageNow}/${pageBean.pageCount}页
            </li>
        </ul>
        </c:if>
    </div>
</div>
<script type="text/javascript" src="js/waterfall.js"></script>
<script type="text/javascript">
    $(function(){
        //砖块排列配置
        $('.bricks').masonry({
            itemSelector:'.brick',columnWidth:255,isAnimated:true,isFitWidth:true});
        //var $container = $('#masonry');$container.imagesLoaded(function(){$container.masonry({itemSelector:'.brick',columnWidth:245,isFitWidth:true,isAnimated: true});});
    })
</script>


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
