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
                <h2><span></span><span>网络空间物联网设备安全态势感知系统</span></h2>

                <div class="img-wrapper">
                    <img src="resources/img/showcase/sys_2_gray.png" id="sysImg">
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
    <div class="section black-bg" id="page3_1">
        <div id="scrollcombidy2d"></div>
    </div>
    <div class="section black-bg" id="page3_2">
        <h1>最近一次设备扫描结果</h1>

        <div id="map"></div>
        <%--<div id="multilevelpie" class="full-height p60" style="display: none"></div>--%>
    </div>
    <div class="section black-bg" id="page3_3">
        <h1>最近一次设备扫描结果</h1>

        <div id="pie3Ds"></div>
    </div>
    <div class="section black-bg" id="page4">
        <div class="inner transparent">
            <ul class="img-nav"></ul>
            <div class="img-container">
                <img src="">
                <img src="">
                <img src="">
                <img src="">
                <img src="">
                <img src="">
            </div>
        </div>
        <div class="real-time-img-wrapper">
            <img src="">

            <div class="real-img-footer">
                <section class="playContainer">
                    <li class="playBtn">
                        <a href="#" title="start">Start</a>
                    </li>
                    <li class="pauseBtn">
                        <a href="#" title="pause">Pause</a>
                    </li>
                </section>
                <section class="ip-wrapper">
                    IP：<br> <span class="ip"></span>
                </section>
                <section class="attack-text">
                    <textarea disabled></textarea>
                </section>
            </div>
            <div class="close-win">
                <div class="line"></div>
            </div>
        </div>
    </div>
    <div class="section black-bg" id="page5">
        <div class="section-inner">
            <header>
                <h1>成就</h1>
            </header>
            <section id="dg-container" class="dg-container">
                <div class="dg-wrapper">
                    <a href="#"><img src="resources/img/showcase/ct/2014-12-01.png" alt="2014-12-01">

                        <div>原创漏洞证明 2014-12-01</div>
                    </a>
                    <a href="#"><img src="resources/img/showcase/ct/2014-12-09.png" alt="2014-12-09">

                        <div>原创漏洞证明 2014-12-09</div>
                    </a>
                    <a href="#"><img src="resources/img/showcase/ct/2015-04-11.png" alt="2015-04-11">

                        <div>原创漏洞证明 2015-04-11</div>
                    </a>
                    <a href="#"><img src="resources/img/showcase/ct/2015-04-13.png" alt="2015-04-13">

                        <div>原创漏洞证明 2015-04-13</div>
                    </a>
                    <a href="#"><img src="resources/img/showcase/ct/2015-04-23.png" alt="2015-04-23">

                        <div>原创漏洞证明 2015-04-23</div>
                    </a>
                    <a href="#"><img src="resources/img/showcase/ct/2015-05-07.png" alt="2015-05-07">

                        <div>原创漏洞证明 2015-05-07</div>
                    </a>
                    <a href="#"><img src="resources/img/showcase/ct/2015-06-04.png" alt="2015-06-04">

                        <div>原创漏洞证明 2015-06-04</div>
                    </a>
                    <a href="#"><img src="resources/img/showcase/ct/2015-07-23.png" alt="2015-07-23">

                        <div>原创漏洞证明 2015-07-23</div>
                    </a>
                </div>
            </section>
        </div>
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
<script src="resources/js/libs/jquery.gallery.js"></script>
<script src="resources/js/libs/jquery.fullpage.min.js"></script>
<script src="resources/js/showcase.js"></script>
</body>
</html>
