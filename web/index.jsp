<%--
  Created by IntelliJ IDEA.
  User: hzj
  Date: 18-5-25
  Time: 上午11:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
  <head>
    <title>music</title>
    <link rel="stylesheet" href="assets/bootstrap-4.0.0-dist/css/bootstrap.css">
    <script src="assets/js/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="assets/bootstrap-4.0.0-dist/js/bootstrap.js">
  </head>
  <body>
  hello

  <form action="/hello" method="get">
    <input type="text" name="user"><br>
    <input type="password" name="pass">
    <input type="submit" value="get提交">
  </form>
  <form action="/hello" method="post" target="_blank">
    <input type="text" name="user"><br>
    <input type="password" name="pass">
    <input type="submit" value="post提交">
  </form>
  </body>
</html>
