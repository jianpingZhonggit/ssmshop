//$(document).ready(function(){});
//透明背景
function Alphaback_open(){
	setSelectState('hidden');
	var BW=$("body").width();var BH=$("body").height();
	var s="<div id='Alphaback'></div>";
	if($("#Alphaback")[0]){$("#Alphaback").remove()};
	$(document.body).append(s);$('#Alphaback').css("width",BW);$('#Alphaback').css("height",BH);
}
function Alphaback_close(){
	setSelectState('visible');if($("#Alphaback")[0]){$("#Alphaback").remove()}
}

//会员登入
function UserLogin(){
	var LoginForm=document.getElementById("Form_UserLogin");
	LoginForm.btn_login.disabled=true;
	if (Chk_Login(LoginForm)){
		var username=escape(LoginForm.username.value.toLowerCase());
		var password=LoginForm.password.value;
		var checkcode=LoginForm.checkcode.value;
		$.ajax({
		 async:false,
		 type:"POST",
		 url:"/action/user_login.a.asp",
		 data:{username:username,password:password,checkcode:checkcode,MR:Math.random()},
		 dataType:"text",
		 success:function(msg){UserLogin_R(msg);},
		 error:function(){UserLogin_R("ERROR|服务器连接失败,请重试")}
		});
	}
	else LoginForm.btn_login.disabled=false;
}
function UserLogin_R(str){
	var response="";if(str==""||str==null){response="ERROR|发生错误,请重试"}else{response=str};var arr=response.split("|");
	if(arr[0]=="SUCCESS"){document.location.href="/user_home.asp"}
	else if(arr[0]=="DIRECT"){document.location.href=arr[1]}
	else{window.alert(arr[1]);document.Form_UserLogin.btn_login.disabled=false;refreshimg();};
}


var ActionFinish=1;
var Alertbox_TimeOutID = 0;
function Alertbox_Timeout(){
	if(Alertbox_TimeOutID){clearTimeout(Alertbox_TimeOutID)}
	Alertbox_TimeOutID = setTimeout("Alertbox_close()",3000)
	return Alertbox_TimeOutID
}
function Alertbox_close(){$("#Alertbox").fadeOut("normal");}
//浏览商品时返回数据
function pdetail_isatcar(shuliang,yaoqiu){
	document.getElementById('shuliang').value=shuliang;
	document.getElementById('yaoqiu').value=yaoqiu;
	document.getElementById('goumaism').innerHTML='该商品已存在您的购物车中，您可以在此修改选购信息';
	document.getElementById('goumaism').style.color='red';
}
function pdetail_isatbook(shuliang,yaoqiu){
	document.getElementById('shuliang').value=shuliang;
	document.getElementById('yaoqiu').value=yaoqiu;
	document.getElementById('yudingsm').innerHTML='该商品已存在您的预订架中，您可以在此修改预订信息';
	document.getElementById('yudingsm').style.color='red';
}
//选购产品提交表单===========================================================
function psc_numrollu(){
var tempvalue=parseInt(document.getElementById("shuliang").value)
var ntempvalue=parseInt(tempvalue+dizeng)
if(ntempvalue<=kucun){document.getElementById("shuliang").value=ntempvalue}else{document.getElementById("shuliang").value=kucun}
}
function psc_numrolld(){
var tempvalue=parseInt(document.getElementById("shuliang").value)
var j=parseInt((tempvalue-qiding)/dizeng)
var ntempvalue=parseInt(qiding+(j-1)*dizeng)
if(ntempvalue>=qiding){document.getElementById("shuliang").value=ntempvalue}else{document.getElementById("shuliang").value=qiding}
}
//加入购物车==============================================================
function add_goumai(ID,V){ //产品ID，操作页面(plist|pdetail|cart)
	var shuliang="0",yaoqiu="";
	if (V=='pdetail'){shuliang=document.getElementById("shuliang").value;yaoqiu=escape(document.getElementById("yaoqiu").value);}
	$.ajax({
	 async:true,
	 type:"GET",
	 url:"cart.a.asp?act=buys",
	 data:{id:ID,view:V,shuliang:shuliang,yaoqiu:yaoqiu},
	 dataType:"html",
	 success:function(msg){Alert_open(msg);},
	 error:function(){Alert_open("ERROR|服务器连接失败,请重试")}
	}); 
}
//加入预订==============================================================
function add_book(ID,V){  //产品ID，操作页面(quick|proview|carview)
	if(!U_islogin){Loginbox_open();return false}
	var shuliang="0",yaoqiu="";
	if (V=='proview'){shuliang=document.getElementById("shuliang").value;yaoqiu=escape(document.getElementById("yaoqiu").value);}
	$.ajax({
	 async:true,
	 type:"GET",
	 url:"user_book_add.a.asp",
	 data:{PID:ID,view:V,shuliang:shuliang,yaoqiu:yaoqiu},
	 dataType:"html",
	 success:function(msg){Alert_open(msg);},
	 error:function(){Alert_open("ERROR|服务器连接失败,请重试")}
	});
}
//加入收藏============================================================
function add_fav(ID){  //产品ID
	if(!U_islogin){Loginbox_open();return false}
	$.ajax({
	 async:true,
	 type:"GET",
	 url:"user_fav_add.a.asp",
	 data:{PID:ID},
	 dataType:"html",
	 success:function(msg){Alert_open(msg);},
	 error:function(){Alert_open("ERROR|服务器连接失败,请重试")}
	});
}
//购物车内删除
function Car_Del(RowID,A){ //序号，方式（one|more|all）
	if(RowID==""){return false};
	//Alert_open('WAIT');
	$.ajax({
	 async:true,
	 type:"GET",
	 url:"user_cart_del.a.asp",
	 data:{LID:RowID,Act:A},
	 dataType:"html",
	 success:function(msg){Car_Del_row(msg,RowID,A)},
	 error:function(){Alert_open("ERROR|服务器连接失败,请重试")}
	}); 
}
function Car_Del_row(str,RowID,A){
	var response="";
	if(str==""||str==null){response="ERROR|服务器连接出错，请重试"}else{response=str}
	//Alert_open(response);
	arr=response.split("|");
	if(arr[0]=="SUCCESS"){
		//Set_Car_Box(arr[2],arr[3],arr[4],arr[5]);
		Set_Car_End(arr[2],arr[3],arr[4],arr[5],arr[6]);
		if(A=="one"){
		var tr=document.getElementById('Car_Row_'+RowID);
		tr.parentNode.removeChild(tr);
		return false;
		}
		if(A=="more"){
		var tr=null;
		var Rarr=RowID.split(",");
			for (var i=0;i<Rarr.length;i++){
			tr=document.getElementById('Car_Row_'+Rarr[i]);
			if(tr!=null){tr.parentNode.removeChild(tr);}
			}
		return false;
		}
		if(A=="all"){document.location.href="/user_cart.asp"}
	}else{window.alert(arr[1])}
}
//预订架内删除
function Book_Del(RowID,A){ //序号，方式（one|more|all）
	if(RowID==""){return false};
	//Alert_open('WAIT');
	$.ajax({
	 async:true,
	 type:"GET",
	 url:"user_book_del.a.asp",
	 data:{ID:RowID,Act:A},
	 dataType:"html",
	 success:function(msg){Book_Del_row(msg,RowID,A)},
	 error:function(){Alert_open("ERROR|服务器连接失败,请重试")}
	}); 
}
function Book_Del_row(str,RowID,A){
	var response="";
	if(str==""||str==null){response="ERROR|服务器连接出错，请重试"}else{response=str}
	//Alert_open(response);
	arr=response.split("|");
	if(arr[0]=="SUCCESS"){
		if(A=="one"){
		var tr=document.getElementById('Book_Row_'+RowID);
		tr.parentNode.removeChild(tr);
		return false;
		}
		if(A=="more"){
		var tr=null;
		var Rarr=RowID.split(",");
			for (var i=0;i<Rarr.length;i++){
			tr=document.getElementById('Book_Row_'+Rarr[i]);
			if(tr!=null){tr.parentNode.removeChild(tr);}
			}
		return false;
		}
		if(A=="all"){document.location.href="/user_book.asp"}
	}
}
//收藏夹内删除
function Fav_Del(RowID,A){ //序号，方式（one|more|all）
	if(RowID==""){return false};
	//Alert_open('WAIT');
	$.ajax({
	 async:true,
	 type:"GET",
	 url:"user_fav_del.a.asp",
	 data:{ID:RowID,Act:A},
	 dataType:"html",
	 success:function(msg){Fav_Del_row(msg,RowID,A)},
	 error:function(){Alert_open("ERROR|服务器连接失败,请重试")}
	}); 
}
function Fav_Del_row(str,RowID,A){
	var response="";
	if(str==""||str==null){response="ERROR|服务器连接出错，请重试"}else{response=str}
	//Alert_open(response);
	arr=response.split("|");
	if(arr[0]=="SUCCESS"){
		if(A=="one"){
		var tr=document.getElementById('Fav_Row_'+RowID);
		tr.parentNode.removeChild(tr);
		return false;
		}
		if(A=="more"){
		var tr=null;
		var Rarr=RowID.split(",");
			for (var i=0;i<Rarr.length;i++){
			tr=document.getElementById('Fav_Row_'+Rarr[i]);
			if(tr!=null){tr.parentNode.removeChild(tr);}
			}
		return false;
		}
		if(A=="all"){document.location.href="/user_fav.asp"}
	}
}

//修改购物车内数量
function numrolld(K,ID,PID){     //增或减(u|d)  行ID  产品ID
	var actobj=document.getElementById("numinput"+ID)
	var shuliang=parseInt(actobj.value,10);
	if(isNaN(shuliang)){
	alert("我很脆弱,请慢一点!");
	return false;
	}else{
	actobj.value="…";actobj.className="numinput_a";
	$.ajax({
	 async:true,
	 type:"POST",
	 url:"user_cart.a.asp",
	 data:{K:K,ID:ID,PID:PID,SL:shuliang},
	 dataType:"text",
	 success:function(msg){ResInput(ID,shuliang,msg)},
	 error:function(){ResInput(ID,shuliang,"ERROR|服务器连接失败,请重试")}
	});
	}
}
function ResInput(ID,oldshuliang,str){
	var actobj=document.getElementById("numinput"+ID)
	var response="";if(str==""||str==null||str=="NaN"){response="ERROR|发生错误,请重试"}else{response=str};arr=response.split("|");
	if(arr[0]=="SUCCESS"){
		if(arr[1]=="0"){if(confirm("选购数量少于起订量,点击确定将从购物车移除本商品?")){Car_Del(ID,'one')}else{actobj.value=oldshuliang;actobj.className="numinput";}}
		else{
			actobj.value=arr[1];actobj.className="numinput";
			//Set_Car_Box(arr[2],arr[3],arr[4],arr[5]);
			Set_Car_End(arr[2],arr[3],arr[4],arr[5],arr[6]);
			var price=document.getElementById("Car_List_price_"+ID).innerText;price=price.replace(/[^\d\.]/g,'');
			var jifen=document.getElementById("Car_List_jifen_"+ID).innerText;jifen=jifen.replace(/[^\d\.]/g,'');
			document.getElementById("Car_List_pricet_"+ID).innerText=parseFloat(parseFloat(price)*parseInt(arr[1])).toFixed(2);
			document.getElementById("Car_List_jifent_"+ID).innerText=parseFloat(parseFloat(jifen)*parseInt(arr[1])).toFixed(0);
		}
	}
	else{
		actobj.value=oldshuliang;actobj.className="numinput";alert(arr[1]);
	}
}
//预订架内修改数量
function numrolld_book(K,ID,PID){     //增或减(u|d)  行ID  产品ID
	var actobj=document.getElementById("numinput"+ID)
	var shuliang=parseInt(actobj.value,10);
	if(isNaN(shuliang)){
	alert("我很脆弱,请慢一点!");return false;
	}else{
	actobj.value="…";actobj.className="numinput_a";
	$.ajax({
	 async:true,
	 type:"POST",
	 url:"user_book.a.asp",
	 data:{K:K,ID:ID,PID:PID,SL:shuliang},
	 dataType:"text",
	 success:function(msg){ResInput_book(ID,shuliang,msg)},
	 error:function(){ResInput_book(ID,shuliang,"ERROR|服务器连接失败,请重试")}
	});
	}
}
function ResInput_book(ID,oldshuliang,str){
	var actobj=document.getElementById("numinput"+ID)
	var response="";
	if(str==""||str==null||str=="NaN"){response="ERROR|发生错误,请重试"}else{response=str}
	arr=response.split("|");
	if(arr[0]=="SUCCESS"){
		if(arr[1]=="0"){if(confirm("预订数量少于起订量,点击确定将从预订架中移除本商品?")){Book_Del(ID,'one')}else{actobj.value=oldshuliang;actobj.className="numinput";}}
		else{
			actobj.value=arr[1];actobj.className="numinput";
		}
	}
	else{
		actobj.value=oldshuliang;actobj.className="numinput";
		alert(arr[1]);
	}
}
//购物车内修改要求
var oldYaoqiu=null;
function EditYqInput(ID){
	var actobj=document.getElementById("Yqinput"+ID)
	if(actobj.readOnly==true){alert('请慢一点，正在上传数据…')}
		else{
		oldYaoqiu=actobj.value;actobj.className="yqinpute";
	}
}
function UpdateYqInput(ID){
	var actobj=document.getElementById("Yqinput"+ID);
	var Yaoqiu=actobj.value;
	//alert(shuliang);
	if(Yaoqiu==oldYaoqiu){actobj.className="yqinput";return false;}
	Yaoqiu=escape(Yaoqiu);
	actobj.value="…";actobj.className="yqinputu";actobj.readOnly=true;
	$.ajax({
	 async:true,
	 type:"POST",
	 url:"user_cart_yq.a.asp",
	 data:{LID:ID,YQ:Yaoqiu},
	 dataType:"text",
	 success:function(msg){ResYqInput(ID,msg)},
	 error:function(){ResYqInput(ID,"ERROR|服务器连接失败,请重试")}
	});
}
function ResYqInput(ID,str){
	var actobj=document.getElementById("Yqinput"+ID)
	var response="";
	if(str==""||str==null||str=="NaN"){response="ERROR|发生错误,请重试"}else{response=str}
	arr=response.split("|");
	if(arr[0]=="SUCCESS"){
		actobj.value=arr[2];actobj.className="yqinput";actobj.readOnly=false;
	}
	else{
		actobj.value=arr[2];actobj.className="yqinput";actobj.readOnly=false;
		alert(arr[1]);
	}
	oldYaoqiu=null;
}

//更新购物车页面修改记录行
function Set_Car_List(ID,a,b,c){
	document.getElementById("Car_Lista_"+ID).innerText=a;
	document.getElementById("Car_Listb_"+ID).innerText=b;
	document.getElementById("Car_Listc_"+ID).innerText=c;
}

//更新购物车页面底部统计信息
function Set_Car_End(k,j,y,f,z){
	document.getElementById("mycar_end_k").innerText=k;
	document.getElementById("mycar_end_j").innerText=j;
	document.getElementById("mycar_end_y").innerText=y;
	document.getElementById("mycar_end_f").innerText=f;
	document.getElementById("mycar_end_z").innerText=z;
}
