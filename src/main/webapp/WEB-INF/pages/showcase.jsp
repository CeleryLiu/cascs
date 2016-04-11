<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN" class="no-js">
<head>
    <title>演示</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="author" content="LiuYanping"/>
    <link href="resources/css/normalize.css" rel="stylesheet">
    <link href="resources/css/jquery.fullpage.min.css" rel="stylesheet">
    <link href="resources/css/showcase.css" rel="stylesheet">
    <script src="resources/js/libs/modernizr.js"></script>
</head>
<body>
<div id="pagewrapper">
    <div class="section" id="page1">
        <div class="banner sys-banner">
            <div class="am-container">
                <h2><span></span><span>系统架构</span></h2>

                <div class="img-wrapper">
                    <img src="resources/img/showcase/sys_2_gray.png">
                </div>
            </div>
            <!-- 背景square -->
            <ul class="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
    <div class="section black-bg" id="page2">
        <div class="inner">
            <div class="map-bg"></div>
            <div class="point"></div>
        </div>
    </div>
    <div class="section black-bg" id="page3">
        <div id="scrollcombidy2d" class="full-height p60 mb50"></div>
        <div id="map" class="full-height mb50"></div>
        <div id="multilevelpie" class="full-height p60" style="display: none"></div>
        <div id="pie3Ds" class="p60"></div>
    </div>
    <div class="section" id="page4">
        <div class="slide">
            <ul class="img-nav">
                <li>1</li>
                <li>2</li>
            </ul>
            <div class="container">
                <a href="#"><img src="resources/img/vision/picture20160327/1.51.204.144_1435161600000.jpg"/></a>
                <a href="#"><img src="resources/img/vision/picture20160327/1.51.218.65_1435161600000.jpg"/></a>
                <a href="#"><img src="resources/img/vision/picture20160327/1.51.218.66_1435161600000.jpg"/></a>
                <br>
                <a href="#"><img src="resources/img/vision/picture20160327/1.51.218.67_1435161600000.jpg"/></a>
                <a href="#"><img src="resources/img/vision/picture20160327/1.51.218.68_1435161600000.jpg"/></a>
                <a href="#"><img src="resources/img/vision/picture20160327/1.51.218.69_1435161600000.jpg"/></a>
            </div>
            <%--            <div class="wavewarp commenwave stick-bottom">
                            <div class="allwave">
                                <div class="wavebom"><p></p></div>
                                <div class="wavetop"><p></p></div>
                            </div>
                            <canvas id="wave"></canvas>
                        </div>--%>
        </div>
        <div class="slide">第二屏</div>
    </div>
</div>
<script src="resources/js/libs/jquery-1.11.3.min.js"></script>
<script src="resources/js/libs/jQuery.fontFlex.js"></script>
<script src="resources/js/libs/jquery.slimscroll.min.js"></script>
<script src="resources/js/libs/fusioncharts/fusioncharts.js"></script>
<script src="resources/js/libs/fusioncharts/themes/fusioncharts.theme.fint.js"></script>
<script src="resources/js/libs/fusioncharts/fusioncharts.maps.js"></script>
<script src="resources/js/libs/fusioncharts/fusioncharts.powercharts.js"></script>
<script src="resources/js/libs/fusioncharts/fusioncharts-jquery-plugin.js"></script>
<script src="resources/js/libs/jquery.fullpage.min.js"></script>
<script src="resources/js/showcase.js"></script>
</body>
</html>
