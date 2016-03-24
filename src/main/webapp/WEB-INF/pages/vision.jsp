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
        <div class="col-xs-10 col-sm-11">
            <div class="row" id="main">
                <div id="selectBox" class="col-xs-2"></div>
                <div id="mapHolder" class="col-xs-10" style="background-color: peachpuff"></div>
                <span class="show-control"><i class="fa fa-caret-right" title="显示"></i></span>
            </div>
            <div class="row active-image-wrapper">
                <div class="col-xs-offset-2" id="active_image">
                    <div class="left">
                        <p>title</p>

                        <div class="thumbnail">
                            <img src="resources/img/vision/police/58.118.157.61.jpg" alt="xxx" class="img-rounded">

                            <div class="caption">
                                <p>
                                    IP地址：1.1.1.1<br>
                                    经度：1，纬度：2<br>
                                    国家：澳大利亚，城市：墨尔本
                                </p>

                                <p><a href="#" class="btn btn-danger" role="button">Go Live</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <p>title</p>
                        <img src="resources/img/vision/police/58.118.157.61.jpg">
                    </div>
                    <div class="hide-control"><i class="fa fa-caret-left" title="隐藏"></i></div>
                </div>
            </div>
            <div class="row ad-gallery" id="gallery">
                <div class="ad-controls"></div>
                <div class="ad-nav">
                    <div class="ad-thumbs">
                        <ul class="ad-thumb-list">
                            <li>
                                <a href="resources/img/vision/police/58.118.157.61.jpg">
                                    <img src="resources/img/vision/police/58.118.157.61.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/police/61.164.83.133.jpg">
                                    <img src="resources/img/vision/police/61.164.83.133.jpg" title="A title for 10.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 10.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/police/61.164.83.146.jpg">
                                    <img src="resources/img/vision/police/61.164.83.146.jpg" title="A title for 11.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 11.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/police/112.5.123.80.jpg">
                                    <img src="resources/img/vision/police/112.5.123.80.jpg" title="A title for 12.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 12.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/police/120.68.14.97.jpg">
                                    <img src="resources/img/vision/police/120.68.14.97.jpg" title="A title for 13.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 13.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/police/183.196.3.219.jpg">
                                    <img src="resources/img/vision/police/183.196.3.219.jpg" title="A title for 14.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 14.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/police/218.9.65.147.jpg">
                                    <img src="resources/img/vision/police/218.9.65.147.jpg" title="A title for 2.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 2.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/school/58.116.138.133.jpg">
                                    <img src="resources/img/vision/school/58.116.138.133.jpg" title="A title for 3.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 3.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/school/58.116.100.252.jpg">
                                    <img src="resources/img/vision/school/58.116.100.252.jpg" title="A title for 4.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 4.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/school/58.116.138.141.jpg">
                                    <img src="resources/img/vision/school/58.116.138.141.jpg" title="A title for 5.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 5.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/school/58.117.142.232.jpg">
                                    <img src="resources/img/vision/school/58.117.142.232.jpg" title="A title for 6.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 6.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/school/58.118.241.190.jpg">
                                    <img src="resources/img/vision/school/58.118.241.190.jpg" title="A title for 7.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 7.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/school/117.117.208.15.jpg">
                                    <img src="resources/img/vision/school/117.117.208.15.jpg" title="A title for 8.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 8.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="resources/img/vision/school/117.117.208.19.jpg">
                                    <img src="resources/img/vision/school/117.117.208.19.jpg" title="A title for 9.jpg"
                                         alt="This is a nice, and incredibly descriptive, description of the image 9.jpg">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-2 col-sm-1" id="sidebar">
            <ul class="nav-right">
                <li><a href="/vision/secret">保密部门</a></li>
                <li><a href="/vision/police">公安部门</a></li>
                <li><a href="/vision/org">政府机关</a></li>
                <li><a href="/vision/bridge">大型桥梁</a></li>
                <li><a href="/vision/facility">基础设施</a></li>
                <li><a href="/vision/factory">工厂设备</a></li>
                <li><a href="/vision/network">网络机房</a></li>
                <li><a href="/vision/house">居民家中</a></li>
                <li><a href="/vision/office">办公场所</a></li>
                <li><a href="/vision/indoor">国外室外</a></li>
                <li><a href="/vision/outdoor">国外室内</a></li>
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
<spring:url value="resources/js/vision.js" var="vJs"/>
<script src="${vJs}"></script>

</body>
</html>