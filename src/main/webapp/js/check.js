//更换验证码图片
function refreshimg(){document.getElementById('checkcodeimg').src = "/action/checkcode.asp?" + Math.random()}
function refreshimg2(){document.getElementById('checkcodeimg').src = "/action/checkcode2.asp?" + Math.random()}

//登入检测
function Chk_Login(OBJ){
var USN=OBJ.username.value.toLowerCase(); //toLowerCase 转化所有字母为小写字母
var PWD=OBJ.password.value;
var CODE=OBJ.checkcode.value;
if (!CheckUserName(USN)){OBJ.username.focus(); return false;}
if (!CheckPassWord(PWD)){OBJ.password.focus(); return false;}
if (CODE.length!=5){window.alert ("请输入正确的验证码！"); OBJ.checkcode.focus(); return false;}
return true;
//OBJ.submit();
}

//游客留言提交
function Chk_AskYk(OBJ){
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
var ICQ=OBJ.userqq.value;
var USM=OBJ.usermail.value.toLowerCase(); //toLowerCase 转化所有字母为小写字母
var TITLE=OBJ.title.value;
var CONTENT=OBJ.content.value;
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("联系人姓名长度4-10位，一个汉字占两位。请重新输入！");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("请选择所在省!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("请选择所在市!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("请选择所在区!");OBJ.AreaCode.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){
		OBJ.userdh.focus();
		return false;
		}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){
		OBJ.usersj.focus();
		return false;
		}
	}
}
else{
	window.alert("电话号码与手机号码请至少输入一项！");OBJ.userdh.focus();return false;
}
if(strlen(USM)>0 && !CheckUserMail(USM)){OBJ.usermail.focus();return false;}
if(strlen(ICQ)>0 && !isNumberString(ICQ)){window.alert("QQ号码只能填写数字。请重新输入！");OBJ.userqq.focus();return false;}
if(strlen(TITLE)<4){window.alert("请输入提问标题！");OBJ.title.focus();return false;}
if(strlen(CONTENT)<4){window.alert("请输入留言内容！");OBJ.content.focus();return false;}
return true;
}

//订单提交
function Chk_OrderSubmit(OBJ){
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var ADS=OBJ.userdz.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("联系人姓名长度4-10位，一个汉字占两位。请重新输入！");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("请选择所在省!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("请选择所在市!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("请选择所在区!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("联系地址长度8-100位，一个汉字占两位。请重新输入！");OBJ.userdz.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){
		OBJ.userdh.focus();
		return false;
		}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){
		OBJ.usersj.focus();
		return false;
		}
	}
}
else{
	window.alert("电话号码与手机号码请至少输入一项！");OBJ.userdh.focus();return false;
}
if(document.getElementsByName("fhfs")[0].checked==false && document.getElementsByName("fhfs")[1].checked==false && document.getElementsByName("fhfs")[2].checked==false && document.getElementsByName("fhfs")[3].checked==false){window.alert("请选择发货方式");return false;}
return true;
}

//注册检测
function Chk_Register(OBJ){
var OBJ=document.RegisterForm
var USN=OBJ.username.value.toLowerCase();
var PWD=OBJ.password.value; 
var PWD2=OBJ.password2.value; 
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var ADS=OBJ.userdz.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
var ICQ=OBJ.userqq.value;
var CODE=OBJ.checkcode.value;

if (!CheckUserName(USN)){OBJ.username.select();return false;}
if (!CheckPassWord(PWD)){OBJ.password.select();return false;}
if(PWD != PWD2){window.alert("两次输入的密码不同，请重新输入!");OBJ.password2.select();return false;}
if(USN == PWD){window.alert("用户名跟密码不能相同，请重新输入!");OBJ.password.select();return false;}
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("联系人姓名长度4-10位，一个汉字占两位。请重新输入！");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("请选择所在省!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("请选择所在市!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("请选择所在区!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("联系地址长度8-100位，一个汉字占两位。请重新输入！");OBJ.userdz.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){OBJ.userdh.focus();return false;}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){OBJ.usersj.focus();return false;}
	}
}
else{
	window.alert("电话号码与手机号码请至少输入一项！");OBJ.userdh.focus();return false;
}
if(strlen(ICQ)>0 && !isNumberString(ICQ)){window.alert("QQ号码只能填写数字。请重新输入！");OBJ.userqq.focus();return false;}
if(strlen(CODE)!=5){window.alert("请输入正确的验证码");OBJ.checkcode.focus();return false;}
OBJ.btn_reg.disabled=true;
OBJ.submit();
}

//修改个人资料检测
function Chk_ChangeUserinfo(OBJ){
var USN=OBJ.username.value.toLowerCase();
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var ADS=OBJ.userdz.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
var ICQ=OBJ.userqq.value;
var USM=OBJ.usermail.value.toLowerCase();
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("联系人姓名长度4-10位，一个汉字占两位。请重新输入！");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("请选择所在省!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("请选择所在市!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("请选择所在区!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("联系地址长度8-100位，一个汉字占两位。请重新输入！");OBJ.userdz.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){OBJ.userdh.focus();return false;}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){OBJ.usersj.focus();return false;}
	}
}
else{
	window.alert("电话号码与手机号码请至少输入一项！");OBJ.userdh.focus();return false;
}
if(strlen(USM)>0 && !CheckUserMail(USM)){OBJ.usermail.focus();return false;}
if(strlen(ICQ)>0 && !isNumberString(ICQ)){window.alert("QQ号码只能填写数字。请重新输入！");OBJ.userqq.focus();return false;}
return true;
//OBJ.submit();
}
//修改密码检测
function Chk_ChangePwd(OBJ){
var USN=OBJ.username.value.toLowerCase();
var PWD0=OBJ.password0.value;
var PWD=OBJ.password.value;
var PWD2=OBJ.password2.value;
if (!CheckPassWord(PWD0)){OBJ.password0.focus();return false;}
if (!CheckPassWord(PWD)){OBJ.password.focus();return false;}
if(USN == PWD){window.alert("用户名跟密码不能相同，请重新输入!"); OBJ.password.value=""; OBJ.password2.value=""; OBJ.password.focus(); return false;}
if(PWD != PWD2){window.alert("两次输入的新密码不同，请重新输入!"); OBJ.password.value=""; OBJ.password2.value=""; OBJ.password.focus(); return false;}
return true;
//OBJ.submit();
}
//取回密码检测
function Chk_GetPwd(OBJ){
var USN=OBJ.username.value.toLowerCase();
var USM=OBJ.usermail.value.toLowerCase();
var CODE=OBJ.checkcode.value;
if (!CheckUserName(USN)){OBJ.username.select();return false;}
if (!CheckUserMail(USM)){OBJ.usermail.select();return false;}
if(strlen(CODE)!=5){window.alert("请输入正确的验证码");OBJ.checkcode.focus();return false;}
OBJ.submit();
}

//收货地址提交
function Chk__User_Address(OBJ){
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var ADS=OBJ.userdz.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("联系人姓名长度4-10位，一个汉字占两位。请重新输入！");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("请选择所在省!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("请选择所在市!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("请选择所在区!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("联系地址长度8-100位，一个汉字占两位。请重新输入！");OBJ.userdz.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){OBJ.userdh.focus();return false;}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){OBJ.usersj.focus();return false;}
	}
}
else{
	window.alert("电话号码与手机号码请至少输入一项！");OBJ.userdh.focus();return false;
}

return true;
}

//=========================================================================
//检测用户名
function CheckUserName(USN){
if (isspit(USN,"-")||isspit(USN,"_")||isspit(USN,".")){
window.alert("用户名首位和末位不能是下划线、减号、点号");return false;
}
if (!isUserNameStringCEN(USN)){
window.alert("用户名只能由中文、字母、数字、下划线、减号、点号组成。");return false;
}
if (!isUserNameString2(USN)){
window.alert("用户名中不能出现连续两个或两个以上的下划线、减号、点号");return false;
}
if(strlen(USN)<4 || strlen(USN)>18 ){
window.alert("用户名长度4-18位，请重新输入！");return false;
}
return true;
}
//检测密码
function CheckPassWord(PWD){
if(strcn(PWD)){
window.alert("密码中不能含有中文字符！");return false;
}
if(strlen(PWD)<6 || strlen(PWD)>18 ){
window.alert("密码长度6-18位，请重新输入！");return false;
}
return true;
}
//检测Email
function CheckUserMail(USM){
if (isWhiteSpace(USM)){
window.alert("邮箱中含有非法字符，请重新输入！");return false;
}
if (!isEmailString(USM)){
window.alert("邮箱格式错误，请重新输入！");return false;
}
if (!isEmailStr(USM)){
window.alert("邮箱格式错误，请重新输入！");return false;
}
return true;
}
//检测MSN
function CheckMSN(MSN){ 
if (isWhiteSpace(MSN)){
window.alert("MSN中含有非法字符，请重新输入！");return false;
}
if (!isEmailString(MSN)){
window.alert("MSN格式错误，请重新输入！");return false;
}
if (!isEmailStr(MSN)){
window.alert("MSN格式错误，请重新输入！");return false;
}
return true;
}
//检测电话号码
function CheckTel(TEL){
if (isspit(TEL,"-")||isspit(TEL,"/")){
window.alert("电话号码只能以数字开头和结尾。如：010-88888888/66666666");return false;
}
if (!isPhoneString(TEL)){
window.alert("电话号码只能由数字、减号或斜杠（/）组成。如：010-88888888/66666666");return false;
}
if(strlen(TEL)<7 || strlen(TEL)>30){
window.alert("电话号码长度7-30位，请重新输入！");return false;
}
return true;
}

//检测手机号码
function CheckMob(MOB){
if (!isMobString(MOB)){
window.alert("请输入正确的手机号，如：13888888888");return false;
}
return true;
}
//--------------------------------------
//含汉字的字串长度
function strlen(str){
	var len;
	var i;
	len = 0;
	for (i=0;i<str.length;i++){
		if (str.charCodeAt(i)>255) len+=2; else len++;
	}
	return len;
}
//如有汉字，返回true
function strcn(str){
	var len;
	var i;
	len = 0;
	for (i=0;i<str.length;i++){
		if (str.charCodeAt(i)>255) return true;
	}
	return false;
}
//如有空格，返回true
function isWhiteSpace (str){
  var WhiteSpace = " \t\n\r";
  var i;
  for (i = 0; i < str.length; i++){   
     var c = str.charAt(i);
     if (WhiteSpace.indexOf(c) >= 0) {
		  return true;
	  }
   }
   return false;
}
//字串前后是不是有指定的符号"s"
function isspit(InputValue,s){
  var flag=false;
  var IVL=InputValue.length;
  if((InputValue.substr(0,1)==s)||(InputValue.substr(IVL-1,1)==s))
	  flag=true;
  return flag;
}
//用户名中不能出现连续两个或两个以上的下划线、减号、点号
function isUserNameString2(str){
	var i;
	for(i=0; i<str.length; i++){
		var c=str.charAt(i);
        if ((str.charAt(i)=='_'&&str.charAt(i+1) =='_') || (str.charAt(i)=='-'&&str.charAt(i+1) =='-') || (str.charAt(i) =='.'&&str.charAt(i+1)=='.'))
			return false;
	}
	return true;
}
//允许的字串(用户名：中文、字母、数字、下划线、减号、点号)
function isUserNameStringCEN(str){
var reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9-_.])*$"); 
if(!reg.test(str)){return false}
return true; 
}
//允许的字串(用户名：字母、数字、下划线、减号、点号)
function isUserNameString(str){
	var Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_.";
	var i;
	for(i=0; i<str.length; i++){
		var c=str.charAt(i);
		if(Letters.indexOf(c)<0)
			return false;
	}
	return true;
}
//允许的字串(数字)
function isNumberString(str){
	var Letters = "1234567890";
	var i;
	for(i=0; i<str.length; i++){
		var c=str.charAt(i);
		if(Letters.indexOf(c)<0)
			return false;
	}
	return true;
}
//允许的字串(手机)
function isMobString(str){
     var mobile=str
	 if (mobile != ""){
         //var reg0 = /^0\d{9,11}$/;  //057985428925
		 //var reg0 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/  //086-0579-85428925
		 //var reg0 = /^0\d{2,3}-\d{7,8}$/  //0579-85428925
		 var reg1 = /^13\d{9}$/;
         var reg2 = /^15\d{9}$/;
		 var reg3 = /^18\d{9}$/;
         var my = false;
         //if (reg0.test(mobile))my=true;
         if (reg1.test(mobile))my=true;
         if (reg2.test(mobile))my=true;
		 if (reg3.test(mobile))my=true;
         if (!my){return false;}
     }
	 return true;
}
//允许的字串(电话号码)
function isPhoneString(str){
	var Letters = "1234567890/-";
	var i;
	for(i=0; i<str.length; i++){
		var c=str.charAt(i);
		if(Letters.indexOf(c)<0)
			return false;
	}
	return true;
}
//允许的字串(EMAIL)
function isEmailString(USM)
{
	var re=/^[0-9a-z][\w-.@]*[0-9a-z]$/i;
	if(re.test(USM))
		return true;
	else
		return false;
}
//判断是否合法的Email
function isEmailStr(argValue)
{
	var emailStr=argValue.toLowerCase();
	var checkTLD=1;
	var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|mobi|museum)$/;
	var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	var validChars="\[^\\s" + specialChars + "\]";
	var quotedUser="(\"[^\"]*\")";
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom=validChars + '+';
	var word="(" + atom + "|" + quotedUser + ")";
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
	var emailPat=/^(.+)@(.+)$/;
	var matchArray=emailStr.match(emailPat);
	if (matchArray==null)
	{
		return false;
	}
	var user=matchArray[1];
	var domain=matchArray[2];
	for (i=0; i<user.length; i++)
	{
		if (user.charCodeAt(i)>127)
		{
			return false;
		}
	}
	for (i=0; i<domain.length; i++)
	{
		if (domain.charCodeAt(i)>127)
		{
			return false;
		}
	}
	if (user.match(userPat)==null)
	{
		return false;
	}
	var IPArray=domain.match(ipDomainPat);
	if (IPArray!=null)
	{
		for (var i=1;i<=4;i++)
		{
			if (IPArray[i]>255)
			{
				return false;
			}
		}
		return true;
	} 
	var atomPat=new RegExp("^" + atom + "$");
	var domArr=domain.split(".");
	var len=domArr.length;
	for (i=0;i<len;i++)
	{
		if (domArr[i].search(atomPat)==-1)
		{
			return false;
		}
	}
	if (checkTLD && domArr[domArr.length-1].length!=2 && domArr[domArr.length-1].search(knownDomsPat)==-1)
	{
		return false;
	}
	if (len<2)
	{
		return false;
	}
	return true;
}
/**************************************************************/
function LTrim(str){
	var i;
	for(i=0;i<str.length;i++){
	 if(str.charAt(i)!=" "&&str.charAt(i)!=" ") 
			break;
	}
	str = str.substring(i,str.length);
	return str;
}

function RTrim(str){
	var i;
	for(i=str.length-1;i>=0;i--){
		if(str.charAt(i)!=" "&&str.charAt(i)!=" ") 
			break;
	}
	str = str.substring(0,i+1);
	return str;
}

function Trim(str){
	return LTrim(RTrim(str));
}
var ie55 = /MSIE ((5\.[56789])|([6789]))/.test( navigator.userAgent ) && navigator.platform == "Win32";
