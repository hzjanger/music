<%--
  Created by IntelliJ IDEA.
  User: hzj
  Date: 18-5-26
  Time: 下午7:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="assets/bootstrap-4.0.0-dist/css/bootstrap.css">
    <script src="assets/js/jquery-3.3.1.js"></script>
    <script src="assets/js/jquery-ui.js"></script>
    <script src="assets/bootstrap-4.0.0-dist/js/bootstrap.js"></script>
    <link rel="stylesheet" href="assets/css/playMusic/playMusic.css">
</head>
<body>
<div class="bg-light">
    <div class="container">
        <div class="row">
            <div class="col-3">

            </div>
            <div class="col-6">
                <nav class="navbar navbar-expand-sm">
                    <form class="form-inline form-inline-overrite">
                        <input class="form-control" type="text" placeholder="Search">
                        <button class="btn btn-success" type="button">Search</button>
                    </form>
                </nav>
            </div>
            <div class="col-3">
                <nav class="navbar navbar-expand-sm">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="#" class="nav-link">登录</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">注册</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <div class="bg-dark">
        <div class="container">
            <div class="row">
                <nav class="navbar navbar-expand-sm">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="#" class="nav-link">首页</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">榜单</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">歌单</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">歌手</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">MV</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="row">
                <div class="col-6 control-img">
                    <img src="http://placehold.it/200x200">
                </div>
                <div class="col-6">
                    <h3 class="music-name text-white">音乐名</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-light">
        <div class="container">
            <div class="row player">
                <div class="col-2 control">
                    <button class="btn btn-primary rewind">上</button>
                    <button class="btn btn-primary playback">中</button>
                    <button class="btn btn-primary fastforward">下</button>
                </div>
                <div class="col-6">
                    <div class="row">
                        <div class="col-10">
                            <div class="tag">
                                <sapn class="title">title</sapn>
                                <sapn class="time">time</sapn>
                            </div>
                            <div class="clear"></div>
                            <div class="progress overrite-progress">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    </div>

</div>
<script src="assets/js/playMusci/playMusic.js"></script>
</body>
</html>
