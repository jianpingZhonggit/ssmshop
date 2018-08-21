<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/21
  Time: 14:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="${path}/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="${path}/ueditor/ueditor.all.js"></script>
    <script type="text/javascript" src="${path}/ueditor/lang/zh-cn/zh-cn.js"></script>
</head>
<!--主体,包含具体说明内容-->
<body>
  <form action="${path}/test/read.do" method="post">
      用户名:<input type="text" name="username"/><br/>
      描述:<script type="text/plain" name="content" id="myEditor">
                    <p>
                    静夜思<br/>
                  床头明月光,<br/>
                  疑是地上霜.<br/>
                  举头望明月,<br/>
                  低头思故乡.<br/>
                  </p>
          </script>
      <!--
      <textarea name="content" id="myEditor"></textarea>
      -->
      <input type="submit" value="提交"/>
  </form>
  <script type="text/javascript">
    var ue = UE.getEditor("myEditor");
  </script>
</body>
</html>
