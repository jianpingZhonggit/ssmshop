<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 钟建平
  Date: 2018/8/20
  Time: 10:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>Title</title>
</head>
<body>
  <form action="${path}/test/upload.do" enctype="multipart/form-data" method="post">
      上传用户:<input type="text" name="username"/><br/>
      上传文件1:<input type="file" name="file1"><br/>
      上传文件2:<input type="file" name="file2"/><br/>
      <input type="submit" value="提交"/>
  </form>
</body>
</html>
