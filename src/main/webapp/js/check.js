//������֤��ͼƬ
function refreshimg(){document.getElementById('checkcodeimg').src = "/action/checkcode.asp?" + Math.random()}
function refreshimg2(){document.getElementById('checkcodeimg').src = "/action/checkcode2.asp?" + Math.random()}

//������
function Chk_Login(OBJ){
var USN=OBJ.username.value.toLowerCase(); //toLowerCase ת��������ĸΪСд��ĸ
var PWD=OBJ.password.value;
var CODE=OBJ.checkcode.value;
if (!CheckUserName(USN)){OBJ.username.focus(); return false;}
if (!CheckPassWord(PWD)){OBJ.password.focus(); return false;}
if (CODE.length!=5){window.alert ("��������ȷ����֤�룡"); OBJ.checkcode.focus(); return false;}
return true;
//OBJ.submit();
}

//�ο������ύ
function Chk_AskYk(OBJ){
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
var ICQ=OBJ.userqq.value;
var USM=OBJ.usermail.value.toLowerCase(); //toLowerCase ת��������ĸΪСд��ĸ
var TITLE=OBJ.title.value;
var CONTENT=OBJ.content.value;
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("��ϵ����������4-10λ��һ������ռ��λ�����������룡");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("��ѡ������ʡ!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("��ѡ��������!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("��ѡ��������!");OBJ.AreaCode.focus();return false;}
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
	window.alert("�绰�������ֻ���������������һ�");OBJ.userdh.focus();return false;
}
if(strlen(USM)>0 && !CheckUserMail(USM)){OBJ.usermail.focus();return false;}
if(strlen(ICQ)>0 && !isNumberString(ICQ)){window.alert("QQ����ֻ����д���֡����������룡");OBJ.userqq.focus();return false;}
if(strlen(TITLE)<4){window.alert("���������ʱ��⣡");OBJ.title.focus();return false;}
if(strlen(CONTENT)<4){window.alert("�������������ݣ�");OBJ.content.focus();return false;}
return true;
}

//�����ύ
function Chk_OrderSubmit(OBJ){
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var ADS=OBJ.userdz.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("��ϵ����������4-10λ��һ������ռ��λ�����������룡");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("��ѡ������ʡ!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("��ѡ��������!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("��ѡ��������!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("��ϵ��ַ����8-100λ��һ������ռ��λ�����������룡");OBJ.userdz.focus();return false;}
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
	window.alert("�绰�������ֻ���������������һ�");OBJ.userdh.focus();return false;
}
if(document.getElementsByName("fhfs")[0].checked==false && document.getElementsByName("fhfs")[1].checked==false && document.getElementsByName("fhfs")[2].checked==false && document.getElementsByName("fhfs")[3].checked==false){window.alert("��ѡ�񷢻���ʽ");return false;}
return true;
}

//ע����
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
if(PWD != PWD2){window.alert("������������벻ͬ������������!");OBJ.password2.select();return false;}
if(USN == PWD){window.alert("�û��������벻����ͬ������������!");OBJ.password.select();return false;}
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("��ϵ����������4-10λ��һ������ռ��λ�����������룡");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("��ѡ������ʡ!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("��ѡ��������!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("��ѡ��������!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("��ϵ��ַ����8-100λ��һ������ռ��λ�����������룡");OBJ.userdz.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){OBJ.userdh.focus();return false;}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){OBJ.usersj.focus();return false;}
	}
}
else{
	window.alert("�绰�������ֻ���������������һ�");OBJ.userdh.focus();return false;
}
if(strlen(ICQ)>0 && !isNumberString(ICQ)){window.alert("QQ����ֻ����д���֡����������룡");OBJ.userqq.focus();return false;}
if(strlen(CODE)!=5){window.alert("��������ȷ����֤��");OBJ.checkcode.focus();return false;}
OBJ.btn_reg.disabled=true;
OBJ.submit();
}

//�޸ĸ������ϼ��
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
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("��ϵ����������4-10λ��һ������ռ��λ�����������룡");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("��ѡ������ʡ!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("��ѡ��������!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("��ѡ��������!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("��ϵ��ַ����8-100λ��һ������ռ��λ�����������룡");OBJ.userdz.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){OBJ.userdh.focus();return false;}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){OBJ.usersj.focus();return false;}
	}
}
else{
	window.alert("�绰�������ֻ���������������һ�");OBJ.userdh.focus();return false;
}
if(strlen(USM)>0 && !CheckUserMail(USM)){OBJ.usermail.focus();return false;}
if(strlen(ICQ)>0 && !isNumberString(ICQ)){window.alert("QQ����ֻ����д���֡����������룡");OBJ.userqq.focus();return false;}
return true;
//OBJ.submit();
}
//�޸�������
function Chk_ChangePwd(OBJ){
var USN=OBJ.username.value.toLowerCase();
var PWD0=OBJ.password0.value;
var PWD=OBJ.password.value;
var PWD2=OBJ.password2.value;
if (!CheckPassWord(PWD0)){OBJ.password0.focus();return false;}
if (!CheckPassWord(PWD)){OBJ.password.focus();return false;}
if(USN == PWD){window.alert("�û��������벻����ͬ������������!"); OBJ.password.value=""; OBJ.password2.value=""; OBJ.password.focus(); return false;}
if(PWD != PWD2){window.alert("��������������벻ͬ������������!"); OBJ.password.value=""; OBJ.password2.value=""; OBJ.password.focus(); return false;}
return true;
//OBJ.submit();
}
//ȡ��������
function Chk_GetPwd(OBJ){
var USN=OBJ.username.value.toLowerCase();
var USM=OBJ.usermail.value.toLowerCase();
var CODE=OBJ.checkcode.value;
if (!CheckUserName(USN)){OBJ.username.select();return false;}
if (!CheckUserMail(USM)){OBJ.usermail.select();return false;}
if(strlen(CODE)!=5){window.alert("��������ȷ����֤��");OBJ.checkcode.focus();return false;}
OBJ.submit();
}

//�ջ���ַ�ύ
function Chk__User_Address(OBJ){
var FUN=OBJ.userxm.value;
var PCD=OBJ.ProvinceCode.value;
var CCD=OBJ.CityCode.value;
var ACD=OBJ.AreaCode.value;
var ADS=OBJ.userdz.value;
var TEL=OBJ.userdh.value;
var MOB=OBJ.usersj.value;
if(strlen(FUN)<4 || strlen(FUN)>10 ){window.alert("��ϵ����������4-10λ��һ������ռ��λ�����������룡");OBJ.userxm.focus();return false;}
if(PCD=="000000"){window.alert("��ѡ������ʡ!");OBJ.ProvinceCode.focus();return false;}
if(CCD=="000000" && OBJ.CityCode.options.length!=1){window.alert("��ѡ��������!");OBJ.CityCode.focus();return false;}
if(ACD=="000000" && OBJ.AreaCode.options.length!=1){window.alert("��ѡ��������!");OBJ.AreaCode.focus();return false;}
if(strlen(ADS)<8 || strlen(ADS)>100 ){window.alert("��ϵ��ַ����8-100λ��һ������ռ��λ�����������룡");OBJ.userdz.focus();return false;}
if(strlen(TEL)>0 || strlen(MOB)>0){
	if(strlen(TEL)>0){
		if(!CheckTel(TEL)){OBJ.userdh.focus();return false;}
	}
	if(strlen(MOB)>0){
		if(!CheckMob(MOB)){OBJ.usersj.focus();return false;}
	}
}
else{
	window.alert("�绰�������ֻ���������������һ�");OBJ.userdh.focus();return false;
}

return true;
}

//=========================================================================
//����û���
function CheckUserName(USN){
if (isspit(USN,"-")||isspit(USN,"_")||isspit(USN,".")){
window.alert("�û�����λ��ĩλ�������»��ߡ����š����");return false;
}
if (!isUserNameStringCEN(USN)){
window.alert("�û���ֻ�������ġ���ĸ�����֡��»��ߡ����š������ɡ�");return false;
}
if (!isUserNameString2(USN)){
window.alert("�û����в��ܳ��������������������ϵ��»��ߡ����š����");return false;
}
if(strlen(USN)<4 || strlen(USN)>18 ){
window.alert("�û�������4-18λ�����������룡");return false;
}
return true;
}
//�������
function CheckPassWord(PWD){
if(strcn(PWD)){
window.alert("�����в��ܺ��������ַ���");return false;
}
if(strlen(PWD)<6 || strlen(PWD)>18 ){
window.alert("���볤��6-18λ�����������룡");return false;
}
return true;
}
//���Email
function CheckUserMail(USM){
if (isWhiteSpace(USM)){
window.alert("�����к��зǷ��ַ������������룡");return false;
}
if (!isEmailString(USM)){
window.alert("�����ʽ�������������룡");return false;
}
if (!isEmailStr(USM)){
window.alert("�����ʽ�������������룡");return false;
}
return true;
}
//���MSN
function CheckMSN(MSN){ 
if (isWhiteSpace(MSN)){
window.alert("MSN�к��зǷ��ַ������������룡");return false;
}
if (!isEmailString(MSN)){
window.alert("MSN��ʽ�������������룡");return false;
}
if (!isEmailStr(MSN)){
window.alert("MSN��ʽ�������������룡");return false;
}
return true;
}
//���绰����
function CheckTel(TEL){
if (isspit(TEL,"-")||isspit(TEL,"/")){
window.alert("�绰����ֻ�������ֿ�ͷ�ͽ�β���磺010-88888888/66666666");return false;
}
if (!isPhoneString(TEL)){
window.alert("�绰����ֻ�������֡����Ż�б�ܣ�/����ɡ��磺010-88888888/66666666");return false;
}
if(strlen(TEL)<7 || strlen(TEL)>30){
window.alert("�绰���볤��7-30λ�����������룡");return false;
}
return true;
}

//����ֻ�����
function CheckMob(MOB){
if (!isMobString(MOB)){
window.alert("��������ȷ���ֻ��ţ��磺13888888888");return false;
}
return true;
}
//--------------------------------------
//�����ֵ��ִ�����
function strlen(str){
	var len;
	var i;
	len = 0;
	for (i=0;i<str.length;i++){
		if (str.charCodeAt(i)>255) len+=2; else len++;
	}
	return len;
}
//���к��֣�����true
function strcn(str){
	var len;
	var i;
	len = 0;
	for (i=0;i<str.length;i++){
		if (str.charCodeAt(i)>255) return true;
	}
	return false;
}
//���пո񣬷���true
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
//�ִ�ǰ���ǲ�����ָ���ķ���"s"
function isspit(InputValue,s){
  var flag=false;
  var IVL=InputValue.length;
  if((InputValue.substr(0,1)==s)||(InputValue.substr(IVL-1,1)==s))
	  flag=true;
  return flag;
}
//�û����в��ܳ��������������������ϵ��»��ߡ����š����
function isUserNameString2(str){
	var i;
	for(i=0; i<str.length; i++){
		var c=str.charAt(i);
        if ((str.charAt(i)=='_'&&str.charAt(i+1) =='_') || (str.charAt(i)=='-'&&str.charAt(i+1) =='-') || (str.charAt(i) =='.'&&str.charAt(i+1)=='.'))
			return false;
	}
	return true;
}
//������ִ�(�û��������ġ���ĸ�����֡��»��ߡ����š����)
function isUserNameStringCEN(str){
var reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9-_.])*$"); 
if(!reg.test(str)){return false}
return true; 
}
//������ִ�(�û�������ĸ�����֡��»��ߡ����š����)
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
//������ִ�(����)
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
//������ִ�(�ֻ�)
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
//������ִ�(�绰����)
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
//������ִ�(EMAIL)
function isEmailString(USM)
{
	var re=/^[0-9a-z][\w-.@]*[0-9a-z]$/i;
	if(re.test(USM))
		return true;
	else
		return false;
}
//�ж��Ƿ�Ϸ���Email
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
