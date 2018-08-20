/*通用头部[用户中心]hover*/
$(document).ready(function(){    
    //用户中心弹出层事件
    $('#mypop,#my_pop').hover(function(){   	
    	$('#my_pop').show();   											  
    }, function(){											  
    	$('#my_pop').hide(); 
    });    
    $('#mypop1').hover(function(){    	
    	$('#my_pop1').show();   											  
    }, function(){											  
    	$('#my_pop1').hide(); 
    });
    //用户中心和购物车详情
    $(function() {
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
        if ($('.tags dl').length === $('.tags').length) {//防止二次分割
            var tagLen = $('.tags').length;
            for(var i = 0 ; i < tagLen; i++){
                var oldDom = $($('.tags')[i]).find('dd');
                var aDom = $($('.tags>a')[i])
                var oldDomLen = oldDom.length;
                if ( oldDomLen > 5) {
                    //截断
                    var lengs = Math.floor(oldDomLen/2);
                    if (oldDomLen/2 > lengs ) {
                        var newDom1 = oldDom.slice(0,lengs+1);
                        var newDom2 = oldDom.slice(-lengs);
                        var nullDom = $('<dd>',{style:"height: 24px;"});
                        newDom2.push(nullDom[0])
                    }else{
                       var newDom1 = oldDom.slice(0,lengs);
                       var newDom2 = oldDom.slice(-lengs);
                    }
                    var newHtml1 = $('<dl>',{style:"display:none"});
                    var newHtml2 = $('<dl>',{style:"display:none;left:164px;"});
                    newHtml1.html(newDom1);
                    newHtml2.html(newDom2);
                    $($('.tags')[i]).html(aDom);
                    $($('.tags')[i]).append(newHtml1)
                    $($('.tags')[i]).append(newHtml2)
                };
            }
        };
    });
	setHeadFlowNum();
    //用户引导
    $('body').bind('.modal_box_close','click', function(e) {
        post_guide(6);
    });    
});

/* 导航搜索框 */
function checkSearchFormAction() {
	var val=$("#so_txt").val();
    if ($.trim(val) == '' ||$.trim(val) == tempso ) {
        return false
    } else {
        //if (typeof($.cookie) == 'function') $.cookie('autocomplete_words', val);
        return true
    }
}
function search_kwords(str)
{
   $("#so_txt").val(str);
   $("#sfm").val('hotwords');
   $('#searchForm').submit()
}

/* 导航查看购物车 */
function setHeadFlowNum() {
    changeUserCenterInfo();/*同时检查是否登录*/
    $.ajax({
        type: "POST",
        url: "/flow.php?step=ajaxcartnum",
        data: "t="+new Date().getTime(),
        success: function(A) {
            var re = eval("(" + A + ")");
            $("#ECS_CARTINFO").html(re.num);
            $(".cart_detail").html(re.content);
			if (re.num > 0){
                $(".basket").addClass('full');
            } else {
                 $(".basket").removeClass('full');
            }
        }
    });
}

/* 导航删除购物车中的商品 */
function dropHeadFlowNum(A) {
    $.ajax({
        type: "POST",
        url: "/flow.php?step=delete_goods",
        data: "rec_key=" + A,
        success: function(result) {
            setHeadFlowNum();
        }
    });
}

/* 收藏本站 */
function myAddBookmark(B, A) {
    if ((typeof window.sidebar == "object") && (typeof window.sidebar.addPanel == "function")) {
        window.sidebar.addPanel(B, A, "")
    } else {
        window.external.AddFavorite(A, B)
    }
}

/* ajax检测用户登录状态 */
function setHeadUserStatus() {
    var box = $("#login_message");
    $.ajax({
        dataType:'json',
		type: "POST",
        url: "user.a.asp?act=check_login",
        data: "t="+new Date().getTime(),
        success: function(re) {
            if(re.error == 1){ //已登录
            	$(box).before(re.message);
                $(box).remove();
            }else{
            	$(box).html(re.message);
            }
        }
    })
}

/*ajax检查用户是否登录并改变相应内容*/
function changeUserCenterInfo(){setHeadUserStatus()}

/*列表页排序筛选*/
function changeOrder(obj,link_id){
    if (link_id == "") {
        var url = document.location.href;
    } else {
        var url = document.getElementById(""+link_id+"").getAttribute('link');
    }
    if (url == "") return false;
    if (url.indexOf('?') < 1) url += "?r=";
    if (url.indexOf("sort") > 0) {
        url = (url+"&").replace(/sort=.*?&/g,"sort="+obj.id+"&");
    } else {
        url += "&sort="+obj.id;
    }
    if (url.substring(url.length-1,url.length) == "&") {
        url = url.substring(0,url.length-1);    
    }
    if (obj.id == "goods_price") {
        if (url.indexOf('order') < 0 || url.indexOf("order=asc") > 0){
            var order = 'desc';
        } else if(url.indexOf("order=desc") > 0){
            var order = 'asc';
        }
        url = url.replace(/&order=[a-zA-Z]+/g,'');
        url = url.replace(/order=[a-zA-Z]+/g,'');
        url += "&order="+order; 
    } else {
        url = url.replace(/&order=[a-zA-Z]+/g,'');
        url = url.replace(/order=[a-zA-Z]+/g,'');
    }
    window.location.href= url;
    return false;
}
/*引导弹出层*/
function post_guide(p){
  $.ajax({
    type:'POST',
    url:'/router.php?m=user&a=guide',
    async:(p==1 ? true : false),
    data:'step='+p,
    success:function(e){
      if (e == '') return false;
      var e = eval("("+e+")");
      if (e.error > 0) return false;
      var width = 624;
      $("#modal_box_wrapper").remove();
      $.modal_box("",e.content,true,width);
    }
  });
}