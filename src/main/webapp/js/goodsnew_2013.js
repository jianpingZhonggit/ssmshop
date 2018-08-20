/*商品详细页面专用 - 位置于jquery之后*/
(function($){$.fn.jqueryzoom=function(options){var settings={xzoom:200,yzoom:200,offset:10,position:"right",lens:1,preload:1};if(options)$.extend(settings,options);var noalt='';$(this).hover(function(){var imageLeft=$(this).offset().left;var imageTop=$(this).offset().top;var imageWidth=$(this).children('img').get(0).offsetWidth;var imageHeight=$(this).children('img').get(0).offsetHeight;var noalt=$(this).children("img").attr("alt");var bigimage=$(this).children("img").attr("jqimg");$(this).children("img").attr("alt",'');$(this).children("img").attr("title",'');if($("div.zoomdiv").get().length==0){$(this).after("<div class='zoomdiv_bg'></div>");$(this).after("<div class='zoomdiv'><img class='bigimg' src='"+bigimage+"'/></div>");$(this).append("<div class='jqZoomPup'>&nbsp;</div>")};if(settings.position=="right"){if(imageLeft+imageWidth+settings.offset+settings.xzoom>screen.width){leftpos=imageLeft-settings.offset-settings.xzoom}else leftpos=imageLeft+imageWidth+settings.offset}else{leftpos=imageLeft-settings.xzoom-settings.offset;if(leftpos<0)leftpos=imageLeft+imageWidth+settings.offset};$("div.zoomdiv,.zoomdiv_bg").css({top:imageTop,left:leftpos});$("div.zoomdiv,.zoomdiv_bg").width(settings.xzoom);$("div.zoomdiv,.zoomdiv_bg").height(settings.yzoom);$("div.zoomdiv,.zoomdiv_bg").show();if(!settings.lens)$(this).css('cursor','crosshair');var bigwidth=$(".bigimg").get(0).offsetWidth;var bigheight=$(".bigimg").get(0).offsetHeight;var scaley='x';var scalex='y';if(isNaN(scalex)|isNaN(scaley)){var scalex=(800/imageWidth);var scaley=(800/imageHeight);$("div.jqZoomPup").width((settings.xzoom)/scalex);$("div.jqZoomPup").height((settings.yzoom)/scaley);$("div.jqZoomPup").css('visibility','visible')};$(document.body).mousemove(function(e){mouse=new MouseEvent(e);xpos=mouse.x-$("div.jqZoomPup").width()/2-imageLeft;ypos=mouse.y-$("div.jqZoomPup").height()/2-imageTop;if(settings.lens){xpos=(mouse.x-$("div.jqZoomPup").width()/2<imageLeft)?0:(mouse.x+$("div.jqZoomPup").width()/2>imageWidth+imageLeft)?(imageWidth-$("div.jqZoomPup").width()-2):xpos;ypos=(mouse.y-$("div.jqZoomPup").height()/2<imageTop)?0:(mouse.y+$("div.jqZoomPup").height()/2>imageHeight+imageTop)?(imageHeight-$("div.jqZoomPup").height()-2):ypos};$("div.jqZoomPup").css({top:ypos,left:xpos});scrolly=ypos;$("div.zoomdiv").get(0).scrollTop=scrolly*scaley;scrollx=xpos;$("div.zoomdiv").get(0).scrollLeft=(scrollx)*scalex})},function(){$(this).children("img").attr("alt",noalt);$(document.body).unbind("mousemove");if(settings.lens)$("div.jqZoomPup").remove();$("div.zoomdiv_bg").remove();$("div.zoomdiv").remove()});count=0;if(settings.preload){$('body').append("<div style='display:none;' class='jqPreload"+count+"'></div>");$(this).each(function(){var imagetopreload=$(this).children("img").attr("jqimg");var content=jQuery('div.jqPreload'+count+'').html();jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">')})}}})(jQuery);function MouseEvent(e){this.x=e.pageX;this.y=e.pageY}
$(document).ready(function(){
	/*放大镜*/
	$(".jqzoom").jqueryzoom({
		xzoom:286,
		yzoom:286,
		offset:15,
		position:"right",
		preload:0,
		lens:1
	});

	/*商品４个大图点击轮回*/
	$('.pic_index').find('li').hover(function(){
		$(this).addClass('pic_on').siblings().removeClass('pic_on');
		$('.wrapper').children('div').eq($('.pic_index').find('li').index(this)).show().siblings().hide();	
	}, function(){});
	
	/*关闭弹出层*/
	$(".close,.close_btn").click(function(){
		$("#popbg").fadeOut();
		$(this).parent().parent().parent().fadeOut();
	});	
	
	/*购物数量 加一件*/
	$('#buynum_up').click(function(){
		tempvalue=parseInt($('#shuliang').val());
		ntempvalue=parseInt(tempvalue+1);
		$('#shuliang').val(ntempvalue)
	});
	
	/*购物数量 减一件*/
	$('#buynum_dw').click(function(){
		tempvalue=parseInt($('#shuliang').val());
		ntempvalue=parseInt(tempvalue-1);
		if(ntempvalue<1){
			ntempvalue=1;
		}
		$('#shuliang').val(ntempvalue)
	});

	/*商品详情选项卡*/
	//$(".select_bar li").click(function(){
		//$(this).addClass("current").siblings("li").removeClass("current");
	//});
//	$("li#all").click(function(){
//		$("div.details").show();
//		$("div.promises").css({"margin-top":"0"}).show().children("h6").show();
//		$("div.comments").css({"margin-top":"0"}).show().children("h6").show();
//		$("div.consults").css({"margin-top":"0"}).show().children("h6").show();
//		$("div.faves").css({"margin-top":"0"}).show().children("h6").show();
//	});
//	$("li#comment").click(function(){
//		$("div.details").hide();
//		$("div.promises").hide();
//		$("div.comments").css({"margin-top":"-14px"}).show().children("h6").hide();
//		$("div.consults").hide();
//		$("div.faves").hide();
//	});
//	$("li#consults").click(function(){
//		$("div.details").hide();
//		$("div.promises").hide();
//		$("div.comments").hide();
//		$("div.consults").css({"margin-top":"-14px"}).show().children("h6").hide();
//		$("div.faves").hide();
//	});
//	$("li#promises").click(function(){
//		$("div.details").hide();
//		$("div.promises").css({"margin-top":"-14px"}).show().children("h6").hide();
//		$("div.comments").hide();
//		$("div.consults").hide();
//		$("div.faves").hide();
//	});
//	$("li#faves").click(function(){
//		$("div.details").hide();
//		$("div.promises").hide();
//		$("div.comments").hide();
//		$("div.consults").hide();
//		$("div.faves").css({"margin-top":"-14px"}).show().children("h6").hide();
//	});
	
	$('#comment,#faves').click(function(){
		var thePos = $('#ask_like').offset();
		$('body,html').animate({
                scrollTop: thePos.top - 100
        }, 100);
	});
	$(".ask_bar li").click(function(){
		$(this).addClass("current").siblings("li").removeClass("current");
	});
	
	$('#commentsBox').click(function(){
		$('.comments').css('display','block');
		$('.consults').css('display','none');
	});
	$('#consultsBox').click(function(){
		$('.comments').css('display','none');
		$('.consults').css('display','block');
	});
	
	/*写商品评论*/
	$(".comment_btn").live("click",function(e){
		$("#zixun_ok_pop").hide();
		$('#zixun_pop').hide();
		$('#cat_pop').hide();
		$('#cat_pop2').hide();
		$('#cat_pop1').hide();
		if($(this).attr('login') > 0){
			check_write_comment($('#goods_id').text());
		}else{
			e.stopPropagation();//阻止事件冒泡
			jQuery.loginShow();
			//location.href='/user.php?back_act=' + location.href + '@write_comment';
		}
	});
	
	/*获取商品评论和咨询信息*/
	var loaded = false;
	$(window).scroll(function(){
		if(!loaded && isInViewPort($("#main_l"))) {
			/*获取咨询*/
			getcomment($('#goods_id').text(),'1','0', -1,0);
			/*获取评论*/
			getcomment($('#goods_id').text(),'1','2', $('#comment_sum').text(),0);	
			loaded = true;
		}
	})
	
	/*咨询 - 提交问题按钮*/
	$(".sp_btn").live("click",function(e){
		$("#zixun_ok_pop").hide();
		$('#pinglun_pop').hide();
		$('#cat_pop').hide();
		$('#cat_pop2').hide();
		$('#cat_pop1').hide();
		if($(this).attr('login') > 0){
			$('#question_content').attr('clean',0);
			$('#comment_content').attr('clean',0);
			$('#zixun_pop').fadeIn();
		}else{
			e.stopPropagation();//阻止事件冒泡
			jQuery.loginShow();
			//location.href='/user.php?back_act=' + location.href + '@commentForm';
		}
	});

	/*咨询 点击我知道了 关闭弹出层*/
	$(".know_btn").click(function(){
		$("#zixun_ok_pop").fadeOut();
	});

	/*咨询框点击事件*/
	$("#question_content").focus(function(){
		if ($(this).val()=='写下您的询问：') $(this).val('');
	}).blur(function(){
		if ($(this).val()=='') $(this).val('写下您的询问：');
	});

	/*咨询框点击事件*/
	var def_comment = $('#comment_content').val();
	$("#comment_content").focus(function(){
		if ($(this).val()==def_comment) $(this).val('');
	}).blur(function(){
		if ($(this).val()=='') $(this).val(def_comment);
	});
	
	/*评论时候，星点击事件*/
	$('#star_pop1').find('a').hover(function(){
		$('#star_pop1').removeClass();
		$('#star_pop1').addClass('float_star db fl');
		$('#star_pop1').addClass('fs_'+($('#star_pop1').find('a').index(this)+1));
	}, function(){{
		$('#star_pop1').removeClass();
		$('#star_pop1').addClass('float_star db fl');
		$('#star_pop1').addClass('fs_'+$('#pingvar1').val());
		}	
	}); 
	$('#star_pop1').find('a').click(function(){	
		$('#star_pop1').removeClass();
		$('#star_pop1').addClass('float_star db fl');
		$('#star_pop1').addClass('fs_'+($('#star_pop1').find('a').index(this)+1));
		$('#pingvar1').val($('#star_pop1').find('a').index(this)+1);
	});
	$('#star_pop2').find('a').hover(function(){
		$('#star_pop2').removeClass();
		$('#star_pop2').addClass('float_star db fl');
		$('#star_pop2').addClass('fs_'+($('#star_pop2').find('a').index(this)+1));
	}, function(){{
		$('#star_pop2').removeClass();
		$('#star_pop2').addClass('float_star db fl');
		$('#star_pop2').addClass('fs_'+$('#pingvar2').val());
		}	
	}); 
	$('#star_pop2').find('a').click(function(){	
		$('#star_pop2').removeClass();
		$('#star_pop2').addClass('float_star db fl');
		$('#star_pop2').addClass('fs_'+($('#star_pop2').find('a').index(this)+1));
		$('#pingvar2').val($('#star_pop2').find('a').index(this)+1);
	});
	$('#star_pop3').find('a').hover(function(){
		$('#star_pop3').removeClass();
		$('#star_pop3').addClass('float_star db fl');
		$('#star_pop3').addClass('fs_'+($('#star_pop3').find('a').index(this)+1));
	}, function(){{
		$('#star_pop3').removeClass();
		$('#star_pop3').addClass('float_star db fl');
		$('#star_pop3').addClass('fs_'+$('#pingvar3').val());
		}	
	}); 
	$('#star_pop3').find('a').click(function(){	
		$('#star_pop3').removeClass();
		$('#star_pop3').addClass('float_star db fl');
		$('#star_pop3').addClass('fs_'+($('#star_pop3').find('a').index(this)+1));
		$('#pingvar3').val($('#star_pop3').find('a').index(this)+1);
	});
	
	/*更新产品价格区域*/
	update_goods_price($('#goods_id').text());
});

/*检测是否可以写评论*/
function check_write_comment(goods_id){
	$.ajax({
		type:'POST',
		data:{goods_id:goods_id},
		cache:false,
		url:'source/goods_recom.php?act=check_comment&t='+Math.random(),
		dataType:'json',
		success:function(o){
			if(o.error==0){
				$('#star_pop1').removeClass();
				$('#star_pop1').addClass('float_star db fl fs_0');
				$('#star_pop2').removeClass();
				$('#star_pop2').addClass('float_star db fl fs_0');
				$('#star_pop3').removeClass();
				$('#star_pop3').addClass('float_star db fl fs_0');
				$('#pingvar1').val('0');
				$('#pingvar2').val('0');
				$('#pingvar3').val('0');
				$('#comment_content').attr('clean',0);
				$('#pl_order_id').val(o.order_id);
				$('#pinglun_pop').fadeIn();
			}else{
				alert(o.message);
			}			
		},error:function(){}
	})
}

/*判断是否在视窗内部*/
function isInViewPort(el) {
	var dh = $(window).height();
	var s = $(el).offset().top - $(window).scrollTop();
	return s < dh ? true : false;
}

/*获取商品评论*/
function getcomment(goods_id, page_num, ctype, totalrecord, ranks){
	if (goods_id && ctype){
		var label = '';
		var btn ='';
		if(ctype == '0'){
			label = "#show_comments";
			btn = ".sp_btn";
		}else if (ctype == '2'){
			label = "#tc";
			btn = ".pl_btn";
		}else{
			return false
		}
	}
	else{
		return false
	}
	$.ajax({
		type: "GET",
		url: "source/goods_recom.php?act=get_comment&" + Math.random(),
		data: "type="+ctype+"&goods_id="+goods_id+"&totalrecord="+totalrecord+"&ranks="+ranks+"&page="+page_num+"&tp=2013&t=" + Math.random(),
		beforeSend:function(){
			/*$(label).text("数据查询中... ...");*/
		},
		success: function(msg){
			var re = eval("(" + msg + ")");
			$(label).html(re.content);
			$(btn).attr('login',re.user_id);
		}
	})
}

/*加入购物车 ok*/
function inToCartAction(good_id, good_name, isRefesh, isIntegral, position,fm) {
	var gs  = parseInt($("#gs").val(),10);
	var gns = parseInt($("#shuliang").val(),10); 
	var lms = parseInt($("#lianmeng_buy_num").val(),10);
	if (gns == 0){
		alert("购物数量不能为0。");
	}else if(gs < gns){
		alert("数量超出库存，请重新填写。");
	}else{
		if(lms > 0 && gns > lms ){
			alert("很抱歉，每单最多购买"+lms+"个");
		}else{
			var r = limit_buy_goods(good_id, good_name);
			if (r) GoodsinTooCartAction(good_id, good_name,isRefesh,0,isIntegral, position,fm);
		}
	}
}

/*关闭收藏提示窗口 ok*/
function close_sc(){
	$("#clt_msg").animate({top:"10px",height:"0"},200)	
}
/*收藏商品 ok*/
function collectGoodsNewAction(A) {
	$.ajax({
		type: "GET",
		url: "user.php?act=collect&t="+Math.random(),
		cache: false,
		data: "id=" + A + "&backurl=goods_2013.php?id=" + A,
		success: function(C) {
			C = eval("("+C+")");
			if (C.error == "1") {
				location.href = "/user.php?action=collect&id=" + A + "&backurl=" + location.href
			}else if(C.error == "2"){
				$("#clt_msg").html("<span class='sc_2'>您已收藏过</span>");
			}else if(C.error == "0"){
				$("#clt_msg").html("<span class='sc_1'>收藏成功</span>");
			}
			if(C.error == "2" || C.error == "0"){
				$("#clt_msg").animate({top:"-52px",height:"60px"},200)
				setTimeout(close_sc,1000);			
			}
		}
	})
}

/*人气组合加入购物车 ok*/
function checkPackaginggoods(A,B){
	$("#zixun_ok_pop").hide();
	$('#zixun_pop').hide();
	$('#pinglun_pop').hide();
	$('#cat_pop').hide();
	$('#cat_pop2').hide();
	$('#cat_pop1').hide();
	var giftidArr = document.forms['packaging_'+A].elements['packaging_goods_id'+A+'[]'];
	var mainGoodsid = $('#goods_id').text();
	var selected_goods_id = new Array();
	var j = 0;
	for (i = 0; i < giftidArr.length; i++){
	  if(giftidArr[i].checked){
		selected_goods_id[j]=giftidArr[i].value;
		j++;
	  }
	}
	selected_goods_id[selected_goods_id.length] = mainGoodsid;
	var goods_id = selected_goods_id.join(',');
	$.ajax({
	  type: "POST",
	  url:  "source/flow_add_to_cart_pack.php?t="+Math.random(),
	  data: '&goods_id_arr=' + goods_id+'&'+ Math.random(),
	  success:function(msg){
		var re = eval("(" + msg + ")");
		if (0 == re.error){
		  $('#cat_pop').fadeIn();
		  setTimeout('$("#cat_pop").hide()',4000);
		  /*重新加载导航购物车*/
		  setHeadFlowNum();
		}else if (1 == re.error){
			alert(re.content);
		}
	  }
	});
}

/*商品信息加入购物车 ok*/
function GoodsinTooCartAction(goodsId, goodsName, isRefesh, parentId, isIntegral, position,fm) {
	$("#zixun_ok_pop").hide();
	$('#zixun_pop').hide();
	$('#pinglun_pop').hide();
	$('#cat_pop').hide();
	$('#cat_pop2').hide();
	$('#cat_pop1').hide();
	var goods = new Object();
	var spec_arr = new Array();
	var fittings_arr = new Array();
	var select = "";
	var p = parentId == "" ? false: true;
	var number = parseInt($("#shuliang").val(),10);
	var refresh = 0;
	if (isRefesh) {
		refresh = 1
	}
	if ($("#goods_type_select")) {
		select = $("#goods_type_select").value
	}
	goods = '{"spec": "","select": "' + select + '", "goods_id":"' + goodsId + '", "number": "' + number + '","parent": "0", "isIntegral": "' + isIntegral + '","fm": "' + fm + '" }';
	$.ajax({
		type: "POST",
		url: "flow.php?step=add_to_cart&t="+Math.random(),
		data: "goods=" + goods,
		success: function(){
			 $.ajax({
					type: "POST",
					url: "/flow.php?step=ajaxcartnum&t="+Math.random(),
					data: "step=ajaxcartnum",
					success: function(A) {
						var re = eval("(" + A + ")");
						$("#ECS_CARTINFO").html(re.num);
						$(".cart_detail").html(re.content);
						$('.basket').addClass('full');
					}
				})
		},
		complete: function(XMLHttpRequest, status) {
			result = eval("(" + XMLHttpRequest.responseText + ")");
			if (!result.error) {
				if (refresh == 1) {			
					switch(position)
					{
						case 1:
							$('#cat_pop1').fadeIn();
							setTimeout('$("#cat_pop1").hide()',4000);
							break;
						case 2:
							$('#cat_pop2').fadeIn();
							setTimeout('$("#cat_pop2").hide()',4000);	
							break;
						case 3:
							$('#cat_pop1').hide();
							$('#cat_pop2').hide();
							$('#cart_detail').fadeIn();		
							break;
						default:
							break;
					}
					
				} else {
					window.location="flow.php";
				}
			} else {
				if (result.error == 2) {
					if (confirm(result.message)) {
						location.href = "user.php?act=add_booking&id=" + result.goods_id
					}
				} else {
					if (result.error == 6) {
						if (confirm(result.message)) {
							location.href = "goods.php?id=" + result.goods_id
						}
					} else {
						alert(result.message)
					}
				}
			}
		}
	})
}

/*提交评论（咨询）信息*/
function submitComment(frm){
	var cmt_error_email = "电子邮件地址格式不正确";
	var cmt_empty_content = "您没有输入评论的内容";
	var cmt = new Object;
	cmt.email           = frm.elements['email'].value;
	cmt.content         = frm.elements['content'].value;
	cmt.id              = frm.elements['id'].value;
	cmt.type			= frm.elements['type'].value;
	if (cmt.email.length > 0){
		if (!(isEmail(cmt.email))){
			alert(cmt_error_email);
			return false;
		}
	}
	if (cmt.content.length == 0){
		return false;
	}
	/*评论*/
	if(cmt.type == 2){
		if($('#comment_content').attr('clean') == 1){
			return false;
		}
		cmt.order_id      = frm.elements['order_id'].value;
		cmt.rank      = frm.elements['comment_rank'].value;
		cmt.rank_1      = frm.elements['comment_rank_1'].value;
		cmt.rank_2      = frm.elements['comment_rank_2'].value;
		if((cmt.rank == 0) || (cmt.rank_1 == 0) || (cmt.rank_2 == 0)){
			return false;
		}
	}else if(cmt.type == 0){/*咨询*/
		if($('#question_content').attr('clean') == 1){
			return false;
		}
	}
	$.ajax({
		type: "POST",
		url: "source/goods_recom.php?act=add_comment&t="+Math.random(),
		data: 'cmt='+ $.toJSON(cmt),
		success: function(result){
			result = eval('('+result+')');
			$('#zixun_pop').fadeOut();
			$('#pinglun_pop').fadeOut();
			if (result.error == 0){
				if(cmt.type == 0){
					/*重新加载咨询*/
					$('#zixun_ok_pop').fadeIn();
					/*getquestion($('#goods_id').text(),'1',0);*/
					getcomment($('#goods_id').text(),'1','2', $('#comment_sum').text(),0);
				}else if(cmt.type == 2){
					window.location.reload();
				}
			}else if(result.error == 2){
				location.href='/user.php?back_act=' + location.href;
			}else {
				if (result.message){
					alert(result.message);
				}
			}
		}
	});
	return false;
}

/*更新详细页面 - 产品价格信息*/
function update_goods_price(goods_id){
	if (goods_id){
		var id = goods_id
	}
	$.ajax({
		type: "GET",
		url: "source/goods_recom.php?act=ajax_price&id="+id+"&tp=2013&m=" + Math.random(),
		date: "",
		success: function(msg){
       			var re = eval("(" + msg + ")");
          		if (0 == re.err_msg){
            		if(re.number == 0){
            			$('#price_goods_div').hide();
            		return;
            	}
            	$('#price_goods_div').html(re.content);
				$('#price_goods_div').show();
				if(re.price.goods_price_now >= 99){
					$('#ship_fee').html('运费说明：<span class="c_red">购买此商品，整单免运费</span>');
				}else{
					$('#ship_fee').html('运费说明：快递:10 元　货到付款:15 元　<span class="c_red">全场购物满99元免运费</span>');
				}
          }
		}
	})
}

/*人气组合相关操作*/
function checkGift(A,B,C){
	var giftidArr = document.forms['packaging_'+A].elements['packaging_goods_id'+A+'[]'];
	var giftpriceArr = document.forms['packaging_'+A].elements['packaging_goods_price'+A+'[]'];
	var giftshoppriceArr = document.forms['packaging_'+A].elements['packaging_shop_price'+A+'[]'];
	var mainGoodsprice =  $('#main_goods_price').val();
	var mainShopprice =  $('#main_shop_price').val();
	var j = 0;
	var k = 0;
	var n = 0;
	for (i = 0; i < giftidArr.length; i++){
		if(giftidArr[i].checked){
			n++;
			j += Number(giftpriceArr[i].value);
			k += Number(giftshoppriceArr[i].value);
			$('#jiahao'+A+(i+1)).removeClass();
			$('#jiahao'+A+(i+1)).addClass('zh_box_add');
		}else{
			$('#jiahao'+A+(i+1)).removeClass();
			$('#jiahao'+A+(i+1)).addClass('zh_box_add_nomal');	
		}
	}
	if(k == 0){
		alert('请至少保留一件组合购买商品');
		B.checked = true;
		$('#jiahao'+A+(C-1)).removeClass();
		$('#jiahao'+A+(C-1)).addClass('zh_box_add');
	}else{
		k += Number(mainShopprice);
		k = formatnumber(k,2);
		j += Number(mainGoodsprice);
		j = formatnumber(j,2);
		n++;
		$('#zuhe_num'+A).html('已选择'+n+'个商品');
		$('#pre_price'+A).html('￥'+k);
		$('#pack_price'+A).html('￥'+j);
		$('#save_price'+A).html('￥'+formatnumber((k*1-j*1),2));/*add-20130603*/
	}
}

/*获取指定小数位数的数字 - 服务于人气组合操作*/
function formatnumber(value,num){
	var a,b,c,i
	a = value.toString();
	b = a.indexOf('.');
	c = a.length;
	if (num==0){
		if (b!=-1)
			a = a.substring(0,b);
		}else{
			if (b==-1){
				a = a + ".";
				for (i=1;i<=num;i++)
					a = a + "0";
			}else{
				a = a.substring(0,b+num+1);
				for (i=c;i<=b+num;i++)
					a = a + "0";
		}
	}
	return a
}

/*单品限购 - 2013-6-7*/
function limit_buy_goods(goods_id, goods_name){
	if(isNaN(goods_id)) return false;
	var rs = $.ajax({
		type:'POST',
		async:false,/*同步请求*/
		url:"flow.php?step=limit_single_goods&t="+Math.random(),
		data:"goods_id="+goods_id
	}).responseText;
	rs = eval("("+rs+")");
	if (rs.error == '0') return true;
	if (rs.error == '1') alert("很抱歉，您不能同时购买以下商品:\n1、"+rs.goods_name+"\n2、"+goods_name);
	return false;
}