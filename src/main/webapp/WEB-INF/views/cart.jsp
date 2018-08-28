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
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <title>购物车</title>
    <!--css类引用-->
    <link rel="stylesheet" href="${path}/js/layui/css/layui.css" />
    <link rel="stylesheet" href="${path}/js/eleme-ui/index.css" />
    <link rel="stylesheet" href="${path}/css/ShoppingCart.css" />
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <meta http-equiv="Content-Language"content="zh-cn"/>
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
    <meta http-equiv="expires" content="" />
    <title>首页</title>
    <link rel="stylesheet" href="${path}/css/reset.css">
    <link rel="stylesheet" href="${path}/css/carts.css">
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${path}/images/normalize.css" />
    <link rel="stylesheet" type="text/css" href="${path}/images/layout.css" />
    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="${path}/js/header.js"></script>
    <script type="text/javascript" src="${path}/js/quwan-plugin.js"></script>
    <style>
        .col1 img {width: 233px; height: 233px}
        .col2 img{width: 478px; height: 478px; margin-left: 0px;}
        .col3 img {width: 478px; height: 233px}
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
        <li><a class="book" href="plist_book.html">新品预订</a></li

        <li><a class="old" href="index.html">订货系统</a></li>

     -->
    </ul>

    <dl class="funcs">
        <dt>
            <form id="searchForm" name="searchForm" method="get" action="${path}/productList.do" onsubmit="return checkSearchFormAction();">
                <c:if test="${pageBean.keywords==null}">
                    <input class="text" name="keywords" value="${pageBean.keywords}" id="so_txt" type="text"  placeholder="请输入商品名称进行搜索" autocomplete="off" />
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
<script type="text/javascript">
    var tempso="请输入商品名称或条码进行搜索";
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
<br/><br/>
<br/><br/><br/>
<section class="cartMain">
    <h1>${message}</h1>
    <div class="cartMain_hd">
        <ul class="order_lists cartTop">
            <li class="list_chk">
                <input type="checkbox" id="all" class="whole_check">
                <label for="all"></label>
                全选
            </li>
            <li class="list_con">商品名</li>
            <li class="list_info">商品描述</li>
            <li class="list_price">单价</li>
            <li class="list_amount">数量</li>
            <li class="list_sum">金额</li>
            <li class="list_op">操作</li>
        </ul>
    </div>
    <form action="${path}/cart/shopping.do" method="post">
    <div class="cartBox">
        <div class="order_content">
            <c:set var="i" value="1"/>
            <c:forEach var="cartItem" items="${sessionScope.cart.cartItems}">
                <ul class="order_lists">
                    <li class="list_chk">
                        <input value="${cartItem.product.pid}" type="checkbox" name="checked" id="checkbox_${i}" class="son_check">
                        <label for="checkbox_${i}"></label>
                    </li>
                    <li class="list_con">
                        <div class="list_img">
                            <img style="width:80px;height:100px;" src="${path}/images/${cartItem.product.image}" alt=""></a>
                        </div>
                        <div class="list_text">
                            ${cartItem.product.pname}
                        </div>
                    </li>
                    <li class="list_info">
                        ${cartItem.product.pdesc}
                    </li>
                    <li class="list_price">
                        <p class="price">￥${cartItem.product.shop_price}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="javascript:;" class="reduce reSty">-</a>
                            <input type="text" value="${cartItem.product.pid}" hidden="hidden"/>
                            <c:if test="${cartItem.count<1}">
                                <input type="text" name="count" style="height: 22px;" value="1" class="sum">
                            </c:if>
                            <c:if test="${cartItem.count>=1}">
                                <input type="text" name="count" style="height: 22px;" value="${cartItem.count}" class="sum">
                            </c:if>
                            <a href="javascript:;" class="plus">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">￥${cartItem.subTotal}</p>
                    </li>
                    <li class="list_op">
                        <p class="del">
                            <a href="${path}/cart/delCartItem.do?pid=${cartItem.product.pid}" class="delBtn">移除商品</a>
                        </p>
                    </li>
                </ul>
                <c:set var="i" value="${i+1}"/>
            </c:forEach>
        </div>
    </div>
    <!--底部-->
    <div class="bar-wrapper">
        <div class="bar-right">
            <div class="piece"><!--已选商品<strong class="piece_num">0</strong>件--></div>
            <div class="totalMoney">共计:<strong class="total_text">￥0.0</strong></div>
            <div class="calBtn">
               <input style="display: block;
                              width: 120px;
                              height: 50px;
                              color: #fff;
                              background: red;
                              font-size: 22px;
                              letter-spacing: 5px;
                              text-decoration: none;
                              line-height: 50px;
                              text-align: center;
                              border-radius: 2px;"
                       type="submit" value="提交订单"/>
                <!--<a href="javascript:;">结算</a>-->
            </div>
        </div>
    </div>
    </form>
</section>
<section class="model_bg"></section>
<script src="${path}/js/jquery.min.js"></script>
<script>
    /**
     * Created by Administrator on 2017/5/24.
     */

    $(function () {

        //全局的checkbox选中和未选中的样式
        var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
            $wholeChexbox = $('.whole_check'),
            $cartBox = $('.cartBox'),                       //每个商铺盒子
            $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
            $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
        $allCheckbox.click(function () {
            if ($(this).is(':checked')) {
                $(this).next('label').addClass('mark');
            } else {
                $(this).next('label').removeClass('mark')
            }
        });

        //===============================================全局全选与单个商品的关系================================
        $wholeChexbox.click(function () {
            var $checkboxs = $cartBox.find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
                $checkboxs.next('label').addClass('mark');
            } else {
                $checkboxs.prop("checked", false);
                $checkboxs.next('label').removeClass('mark');
            }
            totalMoney();
        });


        $sonCheckBox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：所有单个商品是否勾选
                    var len = $sonCheckBox.length;
                    var num = 0;
                    $sonCheckBox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }
                } else {
                    //单个商品取消勾选，全局全选取消勾选
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');
                }
            })
        })

        //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

        //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
        $shopCheckbox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：店铺全选中，则全局全选按钮打对勾。
                    var len = $shopCheckbox.length;
                    var num = 0;
                    $shopCheckbox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                    $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
                } else {
                    //否则，全局全选按钮取消对勾
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                    $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });


        //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

        //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
        $cartBox.each(function () {
            var $this = $(this);
            var $sonChecks = $this.find('.son_check');
            $sonChecks.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                        var len = $sonChecks.length;
                        var num = 0;
                        $sonChecks.each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                            }
                        });
                        if (num == len) {
                            $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                            $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                        }

                    } else {
                        //否则，店铺全选取消
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                    }
                    totalMoney();
                });
            });
        });


        //=================================================商品数量==============================================
        var $plus = $('.plus'),
            $reduce = $('.reduce'),
            $all_sum = $('.sum');
        $plus.click(function () {
            var $pid = $(this).prev().prev(),
                $inputVal = $(this).prev('input'),
                $count = parseInt($inputVal.val())+1,
                $obj = $(this).parents('.amount_box').find('.reduce'),
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                $priceTotal = parseFloat($count*$price.substring(1));
            $inputVal.val($count);
            $priceTotalObj.html('￥'+$priceTotal.toFixed(2));
            if($inputVal.val()>1 && $obj.hasClass('reSty')){
                $obj.removeClass('reSty');
            }
            totalMoney();
            $.ajax({
                type: "get",
                url: "${path}/cart/add.do",
                data: {
                    pid: $pid.val()
                },
                success: function (data) {
                }
            });
        });

        $reduce.click(function () {
            var $pid = $(this).next(),
                $inputVal = $(this).next().next(),
                $count = parseInt($inputVal.val())-1,
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                $priceTotal = parseFloat($count*$price.substring(1));
            if($inputVal.val()>1){
                $inputVal.val($count);
                $priceTotalObj.html('￥'+$priceTotal.toFixed(2));
            }
            if($inputVal.val()==1 && !$(this).hasClass('reSty')){
                $(this).addClass('reSty');
            }
            totalMoney();
            $.ajax({
                type: "get",
                url: "${path}/cart/dec.do",
                data: {
                    pid: $pid.val()
                },
                success: function (data) {
                }
            });
        });

        $all_sum.keyup(function () {
            var $pid = $(this).prev(),
                $count = 0,
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                $priceTotal = 0;
            if($(this).val()==''){
                $(this).val('1');
            }
            $(this).val($(this).val().replace(/\D|^0/g,''));
            $count = $(this).val();
            $priceTotal = parseFloat($count*$price.substring(1));
            $(this).attr('value',$count);
            $priceTotalObj.html('￥'+$priceTotal.toFixed(2));
            totalMoney();
            $.ajax({
                type: "get",
                url: "${path}/cart/changeCount.do",
                data: {
                    pid: $pid.val(),
                    count:$count
                },
                success: function (data) {
                }
            });
        })

        //======================================移除商品========================================

        var $order_lists = null;
        var $order_content = '';
        $('.delBtn').click(function () {
            $order_lists = $(this).parents('.order_lists');
            $order_content = $order_lists.parents('.order_content');
            $('.model_bg').fadeIn(300);
            $('.my_model').fadeIn(300);
        });

        //关闭模态框
        $('.closeModel').click(function () {
            closeM();
        });
        $('.dialog-close').click(function () {
            closeM();
        });
        function closeM() {
            $('.model_bg').fadeOut(300);
            $('.my_model').fadeOut(300);
        }
        //确定按钮，移除商品
        $('.dialog-sure').click(function () {
            $order_lists.remove();
            if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
                $order_content.parents('.cartBox').remove();
            }
            closeM();
            $sonCheckBox = $('.son_check');
            totalMoney();
        })

        //======================================总计==========================================

        function totalMoney() {
            var total_money = 0;
            var total_count = 0;
            var calBtn = $('.calBtn a');
            $sonCheckBox.each(function () {
                if ($(this).is(':checked')) {
                    var goods = parseFloat($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                    var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
                    total_money += goods;
                    total_count += num;
                }
            });
            $('.total_text').html('￥'+total_money.toFixed(2));
            $('.piece_num').html(total_count);

            // console.log(total_money,total_count);

            if(total_money!=0 && total_count!=0){
                if(!calBtn.hasClass('btn_sty')){
                    calBtn.addClass('btn_sty');
                }
            }else{
                if(calBtn.hasClass('btn_sty')){
                    calBtn.removeClass('btn_sty');
                }
            }
        }
    });
</script>
</body>
</html>