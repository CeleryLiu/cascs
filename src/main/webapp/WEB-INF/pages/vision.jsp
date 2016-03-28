<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
    String basePathNoPort = request.getScheme() + "://" + request.getServerName();
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>看世界</title>
    <meta name="author" content="LiuYanping"/>
    <meta name="description" content="index"/>
    <meta name="keywords" content="cyberspace,device,fingerprint,security,search engine,scan,web"/>
    <%--↓css libs--%>
    <spring:url value="resources/css/bootstrap.min.css" var="bsCss"/>
    <link rel="stylesheet" href="${bsCss}">
    <spring:url value="resources/css/font-awesome-4.2.0/css/font-awesome.min.css" var="awsFont"/>
    <link rel="stylesheet" href="${awsFont}">
    <spring:url value="resources/css/themes/pace-theme-mac-osx.css" var="paceCss"/>
    <link rel="stylesheet" href="${paceCss}">
    <spring:url value="resources/css/vision.css" var="visionCss"/>
    <link rel="stylesheet" href="${visionCss}">
    <%--  <link rel="stylesheet" type="text/css"
    <%--  <link rel="stylesheet" type="text/css"
            href="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>--%>
    <!--[if IE]>
    <script type="text/javascript">
        var console = {
            log: function () {
                console.log("Not support IE, please use Chrome");
            }
        };
    </script>
    <![endif]-->
    <%--arcgis lib and map js--%>
    <%--    <script type="text/javascript">
            var djConfig = {parseOnLoad: true}
        </script>--%>
    <%--<script type="text/javascript" src="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>--%>
    <style type="text/css">

    </style>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-10 col-lg-11">
            <div class="row" id="main">
                <div id="selectBox" class="col-xs-2"></div>
                <div id="mapHolder" class="col-xs-10" style="background-color: peachpuff"></div>
                <span class="show-control" title="显示"><i class="fa fa-caret-right"></i></span>
            </div>
            <div class="row active-image-wrapper">
                <div id="active_image">
                    <div class="col-xs-2 col-sm-1 hide-control" title="隐藏">
                        <%--<i class="fa fa-caret-left"></i>--%>
                        <div id="triangle-left"></div>
                    </div>
                    <div class="col-xs-3 col-sm-3 left">
                        <p>CAMERA INFO</p>

                        <div class="thumbnail" id="image_container">
                            <img src="" alt="xxx" class="img-rounded">

                            <div class="caption">
                                <p>
                                    IP地址：1.1.1.1<br>
                                    经纬度：2<br>
                                    国家：澳大利亚<br>
                                    城市：墨尔本<br>
                                    时间：2011-1-1
                                </p>

                                <p><a href="#" class="btn btn-danger" role="button">Go Live</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-7 col-sm-8 right">
                        <p>CAMERA TIMELAPSE</p>
                        <img src="" id="img_right" class="img img-rounded">
                    </div>
                </div>
            </div>
            <div class="row ad-gallery" id="gallery">
                <div class="ad-controls"></div>
                <div class="ad-nav">
                    <div class="ad-thumbs">
                        <ul class="ad-thumb-list">
                            <li>
                                <a href="resources/img/vision/picture20160327/1.51.204.144_1435161600000.jpg">
                                    <img src="resources/img/vision/picture20160327/1.51.204.144_1435161600000.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/picture20160327/1.51.218.68_1435161600000.jpg">
                                    <img src="resources/img/vision/picture20160327/1.51.218.68_1435161600000.jpg"
                                         data-ip="123"
                                         data-country="中国"
                                         data-city="北京"
                                         data-time="2016-03-25"
                                         data-lng="132.5"
                                         data-lat="132.6">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-2 col-lg-1" id="sidebar">
            <ul class="nav-right">
                <li class="active"><a href="javascript:void(0)">保密部门</a></li>
                <li><a href="javascript:void(0)">公安部门</a></li>
                <li><a href="javascript:void(0)">政府机关</a></li>
                <li><a href="javascript:void(0)">基础设施</a></li>
                <li><a href="javascript:void(0)">工厂设备</a></li>
                <li><a href="javascript:void(0)">网络机房</a></li>
                <li><a href="javascript:void(0)">居民家中</a></li>
                <li><a href="javascript:void(0)">办公场所</a></li>
                <li><a href="javascript:void(0)">交通设施</a></li>
                <li><a href="javascript:void(0)">营业场所</a></li>
                <li><a href="javascript:void(0)">银行金融</a></li>
                <li><a href="javascript:void(0)">公安部门</a></li>
                <li><a href="javascript:void(0)">室内</a></li>
                <li><a href="javascript:void(0)">室外</a></li>
                <li><a href="javascript:void(0)">景区</a></li>
                <li><a href="javascript:void(0)">学校</a></li>
                <li><a href="javascript:void(0)">医院</a></li>
            </ul>
        </div>
    </div>
</div>
<%--↓js libs--%>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
<spring:url value="resources/js/libs/bootstrap.min.js" var="bsJs"/>
<script src="${bsJs}"></script>
<spring:url value="resources/js/libs/jQuery.fontFlex.js" var="fontJs"/>
<script src="${fontJs}"></script>
<spring:url value="resources/js/libs/jquery.ad-gallery.js" var="gaJs"/>
<script src="${gaJs}"></script>
<spring:url value="resources/js/static.js" var="staticJs"/>
<script src="${staticJs}"></script>
<spring:url value="resources/js/libs/pace.min.js" var="paceJs"/>
<script src="${paceJs}"></script>
<spring:url value="resources/js/LoadData.js" var="ajax"/>
<script src="${ajax}"></script>
<spring:url value="resources/js/vision.js" var="vJs"/>
<script src="${vJs}"></script>

</body>
</html>