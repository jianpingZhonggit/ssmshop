<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/12
  Time: 19:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>电商后台</title>
    <style type="text/css">
        *{margin:0;padding:0;list-style:none;}
        html{background-color:#E3E3E3; font-size:14px; color:#000; font-family:'微软雅黑'}
        h2{line-height:30px; font-size:20px;}
        a,a:hover{ text-decoration:none;}
        pre{font-family:'微软雅黑'}
        .box{width:970px; padding:10px 20px; background-color:#fff; margin:10px auto;}
        .box a{padding-right:20px;}
        .demo1,.demo2,.demo3,.demo4,.demo5,.demo6{margin:25px 0;}
        h3{margin:10px 0;}
        .layinput{height: 22px;line-height: 22px;width: 150px;margin: 0;}
    </style>
    <script type="text/javascript" src="${path}/js/laydate.js"></script>
    <link rel="stylesheet" href="${path}/css/style.css" media="screen" type="text/css" />
    <link rel="stylesheet" href="${path}/layui/css/layui.css">
    <link rel="stylesheet" href="${path}/css/global.css">
    <link rel="stylesheet" href="${path}/icheck/minimal/red.css">
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">电商后台</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                    ${sessionScope.adminUser.username}
                </a>
                <dl class="layui-nav-child">
                    <dd><a href="">基本资料</a></dd>
                    <dd><a href="">安全设置</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a href="${path}/admin/exit.do">退出登录</a>
            </li>
        </ul>
    </div>
    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree"  lay-filter="test">
                <li class="layui-nav-item">
                    <a href="${path}/indexOfAdmin.do">首页</a>
                </li>
                <li class="layui-nav-item">
                    <a class="" href="${path}/admin/personal.do">个人中心</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/user/userList.do">用户管理</a>
                </li>
                <li class="layui-nav-item layui-nav-itemed">
                    <a href="${path}/order/orderList.do">订单管理</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/category/categoryList.do">一级类目</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/categorySecond/categorySecondList.do">二级类目</a>
                </li>
                <li class="layui-nav-item">
                    <a href="${path}/product/productListOfAdmin.do">商品管理</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
            <fieldset class="layui-elem-field">
                <legend>订单管理 - 订单列表</legend>
                <div class="layui-field-box">
                    <form  action="${path}/order/orderList.do">
                        <div class="layui-form-item" style="text-align:center;">
                            <input  style="height:40px;" class="laydate-icon" id="demo"
                                   name="startTime" value="${pageBean.startTime}" placeholder="订单起始时间">
                            <input  style="height:40px;" class="laydate-icon" id="demo1"
                                   name="endTime" value="${pageBean.endTime}" placeholder="订单结束时间">
                            <select name="state" id="state" style="width:150px;height:40px;" onchange="getchange()">
                                <option value="">订单完成情况</option>
                                <option value="">全部订单</option>
                                <c:if test="${pageBean.state==1}">
                                    <option selected="selected" value="1">已完成</option>
                                    <option value="2">未完成</option>
                                </c:if>
                                <c:if test="${pageBean.state==2}">
                                    <option value="1">已完成</option>
                                    <option selected="selected" value="2">未完成</option>
                                </c:if>
                                <c:if test="${pageBean.state==''||pageBean.state==null}">
                                    <option value="1">已完成</option>
                                    <option value="2">未完成</option>
                                </c:if>

                            </select>
                            <div class="layui-inline">
                                <div class="layui-input-inline">
                                    <input autocomplete="off" class="layui-input"
                                           placeholder="请输入订单人" type="text"
                                           name="keywords" value="${pageBean.keywords}">
                                </div>
                            </div>
                            <div class="layui-inline" style="text-align:left;">
                                <div class="layui-input-inline">
                                    <button class="layui-btn">
                                        <i class="layui-icon">&#xe615;
                                        </i>查询
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr>
                    <div class="layui-btn-group">
                        <!--
                        <button class="layui-btn layui-btn-xs layui-btn-normal dw-dailog" dw-url="create.html" dw-title="新增用户" dw-width="100%" dw-height="100%">
                            <i class="layui-icon">&#xe654;</i>新增
                        </button>
                        -->
                        <button class="layui-btn layui-btn-xs layui-btn-danger dw-batch-delete" dw-url="./delete.json">
                            <i class="layui-icon">&#xe640;</i>删除
                        </button>
                        <button class="layui-btn layui-btn-xs dw-refresh">
                            <i class="layui-icon">&#x1002;</i>刷新
                        </button>
                    </div>
                    <hr>
                    <table class="layui-table">
                        <colgroup>
                            <col width="150">
                            <col width="150">
                            <col width="200">
                            <col>
                            <col>
                        </colgroup>
                        <thead>
                        <tr>
                            <th class="selectAll">
                                &nbsp;&nbsp;&nbsp;全选&nbsp;&nbsp;
                                <input type="checkbox">
                            </th>
                            <th style="text-align:center;">订单日期</th>
                            <th style="text-align:center;">下单人</th>
                            <th style="text-align:center;">总费用</th>
                            <th style="text-align:center;">完成情况</th>
                            <th style="text-align:center;">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach var="orderWapper" items="${pageBean.recordList}">
                        <tr>
                            <td>
                                <input type="checkbox" name="id" value="1"/>
                            </td>
                            <td>
                                <fmt:formatDate value="${orderWapper.ordertime}" pattern="yyyy-MM-dd"/>
                            </td>
                            <td>${orderWapper.user.username}</td>
                            <td>${orderWapper.total}</td>
                            <c:if test="${orderWapper.state==1}">
                                <td>已完成</td>
                            </c:if>
                            <c:if test="${orderWapper.state!=1}">
                                <td>未完成</td>
                            </c:if>
                            <td class="text-center">
                                <div class="layui-btn-group">
                                    <button class="layui-btn layui-btn-xs layui-btn-normal dw-dailog" dw-url="create.html?id=1" dw-title="编辑用户">
                                        <i class="layui-icon">&#xe642;</i>
                                        <a style="color:white;" href="${path}/order/orderDetail.do?pageNow=${pageBean.pageNow}&startTime=${pageBean.startTime}&endTime=${pageBean.endTime}&keywords=${pageBean.keywords}&state=${pageBean.state}&oid=${orderWapper.oid}">编辑</a>
                                    </button>
                                    <!--删除按钮-->
                                    <!--
                                    <button class="layui-btn layui-btn-xs layui-btn-danger dw-delete" dw-url="delete.html?id=1" dw-title="小明">
                                        <i class="layui-icon">&#xe640;</i>
                                        <a style="color:white;" href="${path}/order/delOrder.do?pageNow=${pageBean.pageNow}&startTime=${pageBean.startTime}&endTime=${pageBean.endTime}&keywords=${pageBean.keywords}&state=${pageBean.state}&oid=${orderWapper.oid}">删除</a>
                                    </button>
                                    <c:if test="${orderWapper.oid==delOid}">
                                    <button style="width:10px;border: none;"/>
                                    <button class="layui-btn layui-btn-xs layui-btn-danger dw-delete" dw-url="delete.html?id=1" dw-title="小明">
                                        无法删除!
                                    </button>
                                    </c:if>
                                    -->
                                </div>
                            </td>
                        </tr>
                        </c:forEach>
                        </tbody>
                    </table>
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
                                <a href="${path}/order/orderList.do?pageNow=1&startTime=${pageBean.startTime}&endTime=${pageBean.endTime}&state=${pageBean.state}&keywords=${pageBean.keywords}">首页</a>
                            </li>
                            <li>
                                <a href="${path}/order/orderList.do?pageNow=${beginPage-10}&startTime=${pageBean.startTime}&endTime=${pageBean.endTime}&state=${pageBean.state}&keywords=${pageBean.keywords}">上一页</a></li>
                        </c:if>
                        <c:forEach var="i" begin="${beginPage}" end="${endPage}">
                            <li><a href="${path}/order/orderList.do?pageNow=${i}&startTime=${pageBean.startTime}&endTime=${pageBean.endTime}&state=${pageBean.state}&keywords=${pageBean.keywords}">${i}</a></li>
                        </c:forEach>
                        <c:if test="${pageBean.pageCount%10==0}">
                            <c:set var="group" value="${pageBean.pageCount/10}"/>
                        </c:if>
                        <c:if test="${pageBean.pageCount%10!=0}">
                            <c:set var="group" value="${(pageBean.pageCount-pageBean.pageCount%10)/10+1}"/>
                        </c:if>
                        <c:if test="${(beginPage-beginPage%10)/10+1!=group}">
                            <li><a href="${path}/order/orderList.do?pageNow=${beginPage+10}&startTime=${pageBean.startTime}&endTime=${pageBean.endTime}&state=${pageBean.state}&keywords=${pageBean.keywords}">下一页</a></li>
                            <li><a href="${path}/order/orderList.do?pageNow=${pageBean.pageCount}&startTime=${pageBean.startTime}&endTime=${pageBean.endTime}&state=${pageBean.state}&keywords=${pageBean.keywords}">尾页</a></li>
                        </c:if>
                        <li>
                            ${pageBean.pageNow}/${pageBean.pageCount}页
                        </li>
                    </ul>
                    </c:if>
                </div>
            </fieldset>
        </div>
    </div>
    <div class="layui-footer">
    </div>
</div>
<script type="text/javascript" src="${path}/js/jquery.min.js"></script>
<script type="text/javascript" src="${path}/layui/layui.js"></script>
<script type="text/javascript" src="${path}/icheck/icheck.js"></script>
<script type="text/javascript" src="${path}/js/dw.js"></script>
<script type="text/javascript">
    !function(){
        laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
        laydate({elem: '#demo'});//绑定元素
    }();
    !function(){
        laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
        laydate({elem: '#demo1'});//绑定元素
    }();


    //日期范围限制
    var start = {
        elem: '#start',
        format: 'YYYY-MM-DD',
        min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16', //最大日期
        istime: true,
        istoday: false,
        choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };

    var end = {
        elem: '#end',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        max: '2099-06-16',
        istime: true,
        istoday: false,
        choose: function(datas){
            start.max = datas; //结束日选好后，充值开始日的最大日期
        }
    };
    laydate(start);
    laydate(end);

    //自定义日期格式
    laydate({
        elem: '#test1',
        format: 'YYYY年MM月DD日',
        festival: true, //显示节日
        choose: function(datas){ //选择日期完毕的回调
            alert('得到：'+datas);
        }
    });

    //日期范围限定在昨天到明天
    laydate({
        elem: '#hello3',
        min: laydate.now(-1), //-1代表昨天，-2代表前天，以此类推
        max: laydate.now(+1) //+1代表明天，+2代表后天，以此类推
    });
</script>
</body>
</html>