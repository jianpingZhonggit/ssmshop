//��¼��ע��
function userto_login(){location.href="/user_login.asp?ReturnUrl="+encodeURIComponent(location.href);return false;}
function userto_reg(){location.href="/user_reg.asp?ReturnUrl="+encodeURIComponent(location.href);return false;}
//���ﳵ����ѡ��ҳ��
function setcarbackurl(){SetCookie('carbackurl',encodeURI(window.location.href.toString()),'','/')}
function getcarbackurl(){var backurl=GetCookie('carbackurl');if(backurl==null||backurl=="NaN"||backurl==""){backurl="/"};return decodeURI(backurl)}

function InitAjax() {
	var agt = navigator.userAgent.toLowerCase();
	var is_opera = (agt.indexOf("opera") != -1);
	var is_ie = (agt.indexOf("msie") != -1) && document.all && !is_opera;
	var is_ie5 = (agt.indexOf("msie 5") != -1) && document.all;
	if (is_ie) {
		var control = (is_ie5) ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP";
		try {
			return new ActiveXObject(control);
		} catch(e) {
			alert("You need to enable active scripting and activeX controls");
			DumpException(e);
		}
	} else {
		return new XMLHttpRequest();
	}
}
//-��ȡCity----------------------
function OnProvinceChange(){
    document.getElementById("CityCode").options.length = 1;
	document.getElementById("AreaCode").options.length = 1;
	var ajax = InitAjax();//ʵ����Ajax����
	var ProvinceCode=document.getElementById("ProvinceCode").value;
	var url="/areacode.d.asp?ProvinceCode="+ProvinceCode;

	ajax.open("GET", url, true);//ʹ��GET��ʽ��������
	ajax.onreadystatechange = function(){//��ȡִ��״̬
		if (ajax.readyState == 4 && ajax.status == 200){//���ִ��ʱ״̬��������ô�Ͱѷ��ص����ݸ�ֵ
			var result = ajax.responseText
			if(result != "none"){
			var piArray = result.split(",")
			for(var i=0;i<piArray.length;i++){
			     var ary1 = piArray[i].toString().split("|");
				 document.getElementById("CityCode").options.add(new Option(ary1[0].toString(),ary1[1].toString()));
				}
			}
			//document.getElementById("CityCont").style.display = (PCode == "000000"||result=="none") ? "none" : "";
			//document.getElementById("AreaCont").style.display = "none";
			//document.getElementById("htmlstr").innerHTML = result;
		}
	}
	ajax.setRequestHeader("Content-Type","text/xml; charset=GB2312");
	ajax.setRequestHeader("If-Modified-Since","0");
	ajax.send(null); //���Ϳ�
}
//-��ȡArea----------------------
function OnCityChange(){
    document.getElementById("AreaCode").options.length = 1;
	var ajax = InitAjax();//ʵ����Ajax����
	var CityCode=document.getElementById("CityCode").value;
	var url="/areacode.d.asp?CityCode="+CityCode;
	
	ajax.open("GET", url, true);//ʹ��GET��ʽ��������
	ajax.onreadystatechange = function(){//��ȡִ��״̬
		if (ajax.readyState == 4 && ajax.status == 200){//���ִ��ʱ״̬��������ô�Ͱѷ��ص����ݸ�ֵ
			var result = ajax.responseText
			if(result != "none"){
			var piArray = result.split(",")
			for(var i=0;i<piArray.length;i++){
			     var ary1 = piArray[i].toString().split("|");
				 document.getElementById("AreaCode").options.add(new Option(ary1[0].toString(),ary1[1].toString()));
				}
			}
			//document.getElementById("AreaCont").style.display = (CityCode == "000000"||result=="none") ? "none" : "";
			//document.getElementById("htmlstr").innerHTML = result;
		}
	}
	ajax.setRequestHeader("Content-Type","text/xml; charset=GB2312");
	ajax.setRequestHeader("If-Modified-Since","0");
	ajax.send(null); //���Ϳ�
}

//��ȡ��ѡ��CheckName�����д򹴵�ֵ
function Get_CheckedStr(CheckName){
	var IDStr = "";
	var CB=document.getElementsByName(CheckName);
	for(var i=0; i<CB.length; i++){
		if(CB[i].checked){IDStr += "," + CB[i].value;}
	}
	IDStr = IDStr.substring(1,IDStr.length); //ȥ����ǰ���","
	return IDStr;
}
//���COOKIE
function SetCookie(name,value,expires,path,domain,secure){
    expires = expires*24*60*60*1000;  //expires ��
    var today = new Date();
    var expires_date = new Date( today.getTime() + (expires) );
    var cookieString = name + "=" +escape(value) +
       ( (expires) ? ";expires=" + expires_date.toGMTString() : "") +
       ( (path) ? ";path=" + path : "") +
       ( (domain) ? ";domain=" + domain : "") +
       ( (secure) ? ";secure" : "");
    document.cookie = cookieString;
}
function Get_Cookie000(name) {     
   var start = document.cookie.indexOf(name+"=");    
   var len = start+name.length+1;    
   if ((!start) && (name != document.cookie.substring(0,name.length))) return null;    
   if (start == -1) return null;
   var end = document.cookie.indexOf(";",len);    
   if (end == -1) end = document.cookie.length;    
   return decodeURI(document.cookie.substring(len,end));      
}
//��ȡCOOKIE
function GetCookie(name) {
	var nameOfCookie=name+'=';
	var x=0;
	while(x<=document.cookie.length) {
		var y=(x+nameOfCookie.length);
		if(document.cookie.substring(x,y)==nameOfCookie ) {
			if((endOfCookie=document.cookie.indexOf(';',y))==-1) endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y,endOfCookie));
		}
		x=document.cookie.indexOf(' ',x)+1;
		if(x==0) break;
	}
	return '';
}
//��ȡ����COOKIE
function getcookie(nameSpace, sName){
  // cookies are separated by semicolons
  var aCookie = document.cookie.split("; ");
  for (var i=0; i < aCookie.length; i++)
  {
    // a name/value pair (a crumb) is separated by an equal sign
    var aCrumb = aCookie[i].split("=");
    if (nameSpace == aCrumb[0])
	{
      var aCrumbs = aCookie[i].split("&");
	  for(ii=0;ii<aCrumbs.length;ii++){
		  var items=aCrumbs[ii].split("=");
		  if(ii==0){
			  if(items[1]==sName){return decodeURIComponent(items[2])}
		  }
		  if(items[0]==sName){return decodeURIComponent(items[1])}
	  }
	  //return decodeURIComponent(aCrumb[1]);
	}
  }

  // a cookie with the requested name does not exist
  return null;
}
//��ȡ������Ӵ��߶�
function getBrowserHeight(){
    if ($.browser.msie){
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;   
    } else{
        return self.innerHeight;
    }
}
//��ȡ������Ӵ����
function getBrowserWidth(){
 if ($.browser.msie){
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
    } else {
        return self.innerWidth;
    }
}
//������ܿ�ס
function CheckFrame(){
	if(window!=parent){parent.navigate(self.location)}else if(top.location!=self.location){top.location=self.location}
}
//�������
function FullWindow(){self.moveTo(0,0);self.resizeTo(window.screen.availWidth,window.screen.availHeight)}
//����������ʾ
function CheckBrowser() {
  var app=navigator.appName;
  var verStr=navigator.appVersion;
  if(app.indexOf('Netscape') != -1){
    alert('ϵͳ��ʾ��\n��ʹ�õ���Netscape��Firefox����������IE����������ܻᵼ���޷�ʹ�ú�̨�Ĳ��ֹ��ܡ�������ʹ�� IE6.0 �����ϰ汾��');
	//top.location="/";
  }else if(app.indexOf('Microsoft') != -1){
    if (verStr.indexOf('MSIE 3.0')!=-1 || verStr.indexOf('MSIE 4.0') != -1 || verStr.indexOf('MSIE 5.0') != -1 || verStr.indexOf('MSIE 5.1') != -1){
      alert('ϵͳ��ʾ��\n����������汾̫�ͣ����ܻᵼ���޷�ʹ�ú�̨�Ĳ��ֹ��ܡ�������ʹ�� IE6.0 �����ϰ汾��'); 
	  //top.location="/";
	  }
  }
}

/*������汾
if(ieVer('notie')) alert('Your browser is not IE!');
if(ieVer('isie')) alert('Your browser is IE!');
if(ieVer('not',8)) alert('Your browser is not IE8!');
if(ieVer('is',6)) alert('Your browser is IE6!');
if(ieVer('gt',5.5)) alert('Your IE browser version is greater than 5.5!');
if(ieVer('gte',6)) alert('Your IE browser version is greater than or equal to 6!');
if(ieVer('lte',7)) alert('Your IE browser version is less than or equal to 7!');
if(ieVer('it',8)) alert('Your IE browser version is less than 8!');
notie : Is not IE
isie  : Is IE
is    : Equal to                  ==
not   : Not equal to              !=
lte   : Less than or equal to     <=
lt    : Less than                 <
gte   : Greater than or equal to  >=
gt    : Greater than              >
*/
function ieVer(c,i){
var v = navigator.appVersion.replace(/(.*)MSIE /, '').replace(/\;(.*)/, '');
if(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4){
	if(c == 'isie'){return true;}
	if(c == 'is'){return (v == i);}
	if(c == 'not'){return (v != i);}
	if(c == 'lte'){return (v <= i);}
	if(c == 'lt'){return (v < i);}
	if(c == 'gte'){return (v >= i);}
	if(c == 'gt'){return (v > i);}
	}else{
	if(c == 'notie'){return true;}
}
return false;
}

var ie55 = /MSIE ((5\.[56789])|([6789]))/.test( navigator.userAgent ) && navigator.platform == "Win32";

//ǰ��ո���**************************************************************
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

//********************************************************************************************************************************************************

var isIe=(window.ActiveXObject)?true:false;
var pageLinkUrl="";
var ajaxUrl="";
function g(nodeId)
{
   return document.getElementById(nodeId);
}
function setInnerHtml(objName,dcontent)
{
   if(g(objName)!=null)
   {g(objName).innerHTML=dcontent;}
}
function getPos(obj){
	this.Left=0;
	this.Top=0;
	this.Height=obj.offsetHeight;
	this.Width=obj.offsetWidth;
	var tempObj=obj;
	while (tempObj.tagName.toLowerCase()!="body" && tempObj.tagName.toLowerCase()!="html"){
		this.Left+=tempObj.offsetLeft;
		this.Top+=tempObj.offsetTop;
		tempObj=tempObj.offsetParent;
	}
}
function getNullPos()
{
   return {Left:0,Top:0}
}
function getMousePos(ev)
{
	if(ev.pageX || ev.pageY)
	{
		return {Left:ev.pageX, Top:ev.pageY};
	}
	return {
		Left:ev.clientX + document.documentElement.scrollLeft,Top:ev.clientY + document.documentElement.scrollTop
		}; 
}
function clearWaitInfo()
{
   var newd=g("waitInfo");
   if(newd!=null)
   {
      newd.parentNode.removeChild(newd);
   }
}
function setGrowHidden(obj,intAlphaStep,intTimeStep)
{
    
    try{
        if(obj==null){return;}
        if(isIe) 
        { 
            try{
            obj.filters.alpha.opacity-=intAlphaStep; 
            if (obj.filters.alpha.opacity>0) { 
            setTimeout(function(){setGrowHidden(obj,intAlphaStep,intTimeStep);},intTimeStep); 
            } 
            else {closeWindow();}
            }catch(e){closeWindow();}
        } 
        else 
        { 
            var curOpacity=obj.style.opacity;
            curOpacity-=intAlphaStep/100; 
            if (curOpacity>0) { 
            obj.style.opacity =curOpacity; 
            setTimeout(function(){setGrowHidden(obj,intAlphaStep,intTimeStep);},intTimeStep); 
            } 
            else {closeWindow();} 
        }
    }catch(e){}
}
function showMessageBoxBase(content,pos,wWidth,windowId)
{
   closeWindowBase(windowId);
   var bWidth=parseInt(document.documentElement.scrollWidth);
    var bHeight=parseInt(document.documentElement.scrollHeight);
	var mesW=document.createElement("div");
	mesW.id=windowId;
	mesW.innerHTML=content;
	if(bWidth-pos.Left<wWidth)
	{
	   styleStr="left:"+(pos.Left-wWidth)+"px;";
	}
	else
	{
	   styleStr="left:"+(pos.Left)+"px;";
	}
	styleStr+="top:"+pos.Top+"px;position:absolute;width:"+wWidth+"px;";
	mesW.style.cssText=styleStr;
	document.body.appendChild(mesW);
		
}
function showMessageBox(content,pos,wWidth)
{
   showMessageBoxBase(content,pos,wWidth,"mesWindow");	
}
function closeWindowBase(windowId)
{
    if(g(windowId)!=null)
    {  
       g(windowId).parentNode.removeChild(g(windowId));
    }
}
function closeWindow()
{
   closeWindowBase("mesWindow")
}
//ҳ�涨λ
function setScroll(objId)
{
   if(g(objId))
   {
      
      var objPos=new getPos(g(objId));
      scroll(0,objPos.Top);
   }
}
//ajaxͨ�÷���
function createXmlHttp(){
  var ajaxObj=null;
  if(window.ActiveXObject)
  {
     ajaxObj=new ActiveXObject("Microsoft.XMLHTTP");
  }else{
    if(window.XMLHttpRequest){
    ajaxObj=new XMLHttpRequest();
    }
  }
  return ajaxObj;
}
function setAjax_getRes(requst,resObjId)
{
   setAjax("GET",requst,null,false,null,resObjId,null);
}
function setAjax_runCode(requst,runCode)
{
   setAjax("GET",requst,null,false,null,null,runCode);
}
function setAjax_runCodeAndBtn(requst,curBtn,runCode)
{
   setAjax("GET",requst,null,false,curBtn,null,runCode);
}
function setAjax_getResAndRunCode(requst,resObjId,runCode)
{
   setAjax("GET",requst,null,false,null,resObjId,runCode);
}
function setAjax(postType,requst,postXml,isXml,curBtn,resObjId,runCode)
{   
    setAjaxBase(postType,requst,postXml,isXml,curBtn,resObjId,runCode,null);
}
function setAjaxBase(postType,requst,postXml,isXml,curBtn,resObjId,runCode,onOverRunCode)
{   
    
    if(curBtn!=null){curBtn.disabled=true;}
    var xmlHttp=createXmlHttp();
    xmlHttp.onreadystatechange=function(){backAjaxValue(xmlHttp,curBtn,resObjId,runCode,onOverRunCode)};
    if(postType=="GET"){
		xmlHttp.open(postType,pageLinkUrl+ajaxUrl+'?roid='+Math.random()+'&'+requst);
		xmlHttp.send(null);
    }else
    {
        xmlHttp.open(postType,pageLinkUrl+ajaxUrl+'?roid='+Math.random()+'&'+requst,true);
       if(!isXml){xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");}
       xmlHttp.send(postXml);
    }
}
function backAjaxValue(xmlHttp,curBtn,resObjId,runCode,onOverRunCode)
{
 
   if(xmlHttp.readyState==4)
   {
        clearWaitInfo();
		if(curBtn!=null){curBtn.disabled=false;}
		
		if(onOverRunCode!=null)eval(onOverRunCode);
		
		if(xmlHttp.status==200)
		{
		    var backValue=xmlHttp.responseText;
		    if(!checkErrorFromBackValue(backValue))
		    {
		       return;
		    }
		    if(resObjId!=null && g(resObjId)!=null)
		    {
		        g(resObjId).innerHTML=xmlHttp.responseText;
		    }
		    if(runCode!=null)
		    {
		    var backValue=xmlHttp.responseText;
		    eval(runCode);}
		    
		}
	}
}
function checkErrorFromBackValue(bakValue)
{
   if(bakValue!=null)
   {
      if(bakValue.indexOf('error_')==0)
      {
         if(bakValue.length>6)
         {bakValue=bakValue.substr(6);}
         else{bakValue='��������δ֪�������ٴγ��ԣ�';}
         alert(bakValue);
         return false;
      }
       return true;
   }
   return true;
}








function getFormXmlBySign(sign)
{
  var xmlDoc="";
    var eList=document.getElementsByTagName("input");
    for(var i=0;i<eList.length;i++)
    {                  
		if( eList[i].id == "" )
			continue;
		if(isDataControl(eList[i].id,sign))
		{
		    var columnName=getDataColumnName(eList[i].id,sign);
		    if(eList[i].type=="checkbox" || eList[i].type=="radio")
		    {
		       if(eList[i].checked)
			   {
			      xmlDoc+="<"+columnName+">1</"+columnName+">";
			   }else
			   {  xmlDoc+="<"+columnName+">0</"+columnName+">";}
		    }else
		    {
				
				xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";		    
				columnName=null;
			}
		}			
    }
    eList=document.getElementsByTagName("select");
    for(var i=0;i<eList.length;i++)
    {        
    	if( eList[i].id == "" )
			continue;
          
		if(isDataControl(eList[i].id,sign))
		{
		    var columnName=getDataColumnName(eList[i].id,sign);
			xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";		    
			columnName=null;
		}			
    }
    eList=document.getElementsByTagName("textarea");
    for(var i=0;i<eList.length;i++)
    {           
    	if( eList[i].id == "" )
			continue;
       
		if(isDataControl(eList[i].id,sign))
		{
		    var columnName=getDataColumnName(eList[i].id,sign);
			xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";		    
			columnName=null;
		}			
    }
	return xmlDoc;   
}
function getFormXml()
{   
    return getFormXmlBySign('t_');
}
function isDataControl(controlId,sign){if(controlId.substring(0,sign.length)==sign){return true;}else{return false;}}
function getDataColumnName(controlId,sign){return controlId.substr(sign.length);} 

//�Ƿ��ַ�����
function is_forbid(temp_str)
{
    temp_str=trimTxt(temp_str);
	temp_str = temp_str.replace('*',"@");
	temp_str = temp_str.replace('--',"@");
	temp_str = temp_str.replace('/',"@");
	temp_str = temp_str.replace('+',"@");
	temp_str = temp_str.replace('\'',"@");
	temp_str = temp_str.replace('\\',"@");
	temp_str = temp_str.replace('$',"@");
	temp_str = temp_str.replace('^',"@");
	temp_str = temp_str.replace('.',"@");
	temp_str = temp_str.replace('#',"@");
	//temp_str = temp_str.replace('(',"@");
	//temp_str = temp_str.replace(')',"@");
	//temp_str = temp_str.replace(',',"@");
	temp_str = temp_str.replace(';',"@");
	temp_str = temp_str.replace('<',"@");
	temp_str = temp_str.replace('>',"@");
	//temp_str = temp_str.replace('?',"@");
	temp_str = temp_str.replace('"',"@");
	temp_str = temp_str.replace('=',"@");
	temp_str = temp_str.replace('{',"@");
	temp_str = temp_str.replace('}',"@");
	//temp_str = temp_str.replace('[',"@");
	//temp_str = temp_str.replace(']',"@");
	var forbid_str=new String('@,%,~,&');
	var forbid_array=new Array();
	forbid_array=forbid_str.split(',');
	for(i=0;i<forbid_array.length;i++)
	{
		if(temp_str.search(new RegExp(forbid_array[i])) != -1)
		return false;
	}
	return true;
}
function checknumber(String) 
{ 
    if(trimTxt(String)=="")
    {
       return false;
    }
    var Letters = "1234567890"; 
    var i; 
    var c; 
    for( i = 0; i < String.length; i ++ ) 
    { 
        c = String.charAt( i ); 
        if (Letters.indexOf( c ) ==-1) 
        { 
           return false; 
        } 
    } 
    return true; 
} 
function trimTxt(txt)
{
   return txt.replace(/(^\s*)|(\s*$)/g, "");
}
//����Ƿ�Ϊ��
function isEmpty(inputId)
{
   if(trimTxt(g(inputId).value)==''){return true}
   return false;
}
//�����Ƿ����ʾ
function setDisplay(nodeId,state)
{
   if(g(nodeId)!=null){g(nodeId).style.display=state;}
}
//ɾ��Ԫ��
function removeNode(nodeId)
{
   if(g(nodeId)!=null){g(nodeId).parentNode.removeChild(g(nodeId));}
}

//��ʾ��ʾ��Ϣ
function showAlert(info,obj,infoSign)
{
   if(g(infoSign)!=null){return;}
   var newd=document.createElement("span");
   newd.id=infoSign;
   newd.className='alertInfo';
   newd.innerHTML=info;
   obj.appendChild(newd);
}
//ɾ����ʾ��Ϣ
function removeAlert(infoSign)
{
   if(g(infoSign)==null){return;}
   g(infoSign).parentNode.removeChild(g(infoSign));
}
//��ʾ�ȴ���Ϣ
function showWaitInfo(info,obj)
{
   try{
   if(obj==null)return;
   clearWaitInfo();
   var newd=document.createElement("span");
   newd.className='waitInfo';
   newd.id='waitInfo';
   newd.innerHTML=info;
   obj.parentNode.appendChild(newd);
   }catch(e){}
}
function showWaitInfoOnInner(info,obj)
{
   try{
   if(obj==null)return;
   clearWaitInfo();
   var newd=document.createElement("span");
   newd.className='waitInfo';
   newd.id='waitInfo';
   newd.innerHTML=info;
   obj.innerHTML='';
   obj.appendChild(newd);
   }catch(e){}
}
function clearWaitInfo()
{
   try{
   if(g('waitInfo')!=null){g('waitInfo').parentNode.removeChild(g('waitInfo'));}
   }catch(e){}
}
//�������ڸ�ʽ
function checkDateFormat(str) 
{ 
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
  if(r==null)return false; 
   var d= new Date(r[1], r[3]-1, r[4]); 
   return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]); 
} 
function checkDoubleFormat(str)
{
  var myReg=/^[\-\+]?([0-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)(\.\d+)?$/;
  return myReg.test(str);
}
function checkChinese(str)
{
   var reg = /^[\u4e00-\u9fa5]+$/i;
   return reg.test(str);
}
//����radio��Ĭ��ֵ
function setRadioDefaultItem(radioName,valueId)
{
   var rList=document.getElementsByName(radioName);
   if(rList.length==0){return;}
   var defaultRadioIndex=-1;
   
   for(var i=0;i<rList.length;i++)
   {
       if(rList[i].disabled)
       {
          continue;
       }
       if(rList[i].checked || defaultRadioIndex<0)
       {
          defaultRadioIndex=i;
       }
   }
   if(defaultRadioIndex>-1)
   {
     if(!rList[defaultRadioIndex].checked)
     {
        rList[defaultRadioIndex].click();
     }
     if(g(valueId)!=null)g(valueId).value=rList[defaultRadioIndex].value;
   }
   
}

function TimeSpan(secs)
{
   this.hour=Math.floor(secs/3600);
   this.minute=Math.floor((secs-3600*this.hour)/60);
   this.second=(secs-3600*this.hour-60*this.minute)%60;
}

function request(paras){
	var url = location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
}
