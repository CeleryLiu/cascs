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
            href="http://localhost:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>--%>
    <link rel="stylesheet" type="text/css"
          href="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
    <!--[if IE]>
    <script type="text/javascript">
        var console = {
            log: function () {
                console.log("Not support IE, please use Chrome");
            }
        };
    </script>
    <![endif]-->
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-10 col-lg-11">
            <div class="row" id="main">
                <div id="selectBox" class="col-xs-2">
                    <input id="search_hideseek" name="search" placeholder="筛选国家" type="text"
                           data-list=".list"
                           onkeypress=""
                           autocomplete="off">
                    <ul class="list"></ul>
                </div>
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
                            <img src="" class="img-rounded">

                            <div class="caption">
                                <p></p>

                                <p><a href="#" class="btn btn-danger disabled" role="button" id="goLive">Go Live</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-7 col-sm-8 right">
                        <p>CAMERA TIMELAPSE</p>
                        <img src="" alt="暂时无法获取实时图片" id="img_right" class="img img-rounded">
                    </div>
                </div>
            </div>
            <div class="row ad-gallery" id="gallery">
                <%--<div class="ad-controls"></div>--%>
                <div class="ad-nav">
                    <div class="ad-thumbs">
                        <ul class="ad-thumb-list"></ul>
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
<spring:url value="resources/js/libs/jquery.hideseek.min.js" var="hideseek"/>
<script src="${hideseek}"></script>
<%--arcgis lib and map js--%>
<script type="text/javascript">
    var djConfig = {parseOnLoad: true}
</script>
<%--<script type="text/javascript" src="http://localhost:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>--%>
<script defer type="text/javascript"
        src="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>
<spring:url value="resources/js/libs/pace.min.js" var="paceJs"/>
<script src="${paceJs}"></script>
<spring:url value="resources/js/LoadData.js" var="ajax"/>
<script src="${ajax}"></script>
<spring:url value="resources/js/vision.js" var="vJs"/>
<script src="${vJs}"></script>
<script type="text/javascript">
    $(function () {
        var initMap = function () {
            require(["esri/map", "esri/geometry/Extent", "esri/SpatialReference", "dojo/domReady!"], function (Map, Extent, SpatialReference) {
                var initExtent = new Extent({
                    "xmin": -13638620,
                    "ymin": 4541429,
                    "xmax": -13621422,
                    "ymax": 4552895,
                    "spatialReference": {"latestWkid": 3857, "wkid": 102100}
                });
                var lods = [{"level": 13, "resolution": 19.1092570712683, "scale": 72223.819286},
                    {"level": 14, "resolution": 9.55462853563415, "scale": 36111.909643},
                    {"level": 15, "resolution": 4.77731426794937, "scale": 18055.954822},
                    {"level": 16, "resolution": 2.38865713397468, "scale": 9027.977411},
                    {"level": 17, "resolution": 1.19432856685505, "scale": 4513.988705},
                    {"level": 18, "resolution": 0.597164283559817, "scale": 2256.994353}];
                var lods2 = [
                    {level: 1, resolution: 78271.51696399994, scale: 295828763.795777},
                    {level: 2, resolution: 39135.75848200009, scale: 147914381.897889},
                    {level: 3, resolution: 19567.87924099992, scale: 73957190.948944},
                    {level: 4, resolution: 9783.93962049996, scale: 36978595.474472},
                    {level: 5, resolution: 4891.96981024998, scale: 18489297.737236},
                    {level: 6, resolution: 2445.98490512499, scale: 9244648.868618},
                    {level: 7, resolution: 1222.992452562495, scale: 4622324.434309},
                    {level: 8, resolution: 611.4962262813797, scale: 2311162.217155},
                    {level: 9, resolution: 305.74811314055756, scale: 1155581.108577},
                    {level: 10, resolution: 152.87405657041106, scale: 577790.554289}
                ];
                var Mercator2lonLat = function (mercator) {
                    var lonLat = {};
                    var x = mercator.x / 20037508.34 * 180,
                            y = mercator.y / 20037508.34 * 180;
                    y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
                    lonLat.x = x;
                    lonLat.y = y;
                    return lonLat;
                };
                var baseExtent;
                var map = new Map("mapHolder", {
                    center: [-189.323, 34.355],
                    zoom: 1,
                    minZoom: 1,
                    maxZoom: 8,
                    basemap: "dark-gray",
                    slider: false,
                    logo: false
                });
                map.on('load', function () {
                    baseExtent = map.extent;
                    console.log(baseExtent);
                });
                map.on('pan-end', function (e) {
                    if (map.extent.ymin < baseExtent.ymin || map.extent.ymax > baseExtent.ymax) {
                        baseExtent.xmin = map.extent.xmin;
                        baseExtent.xmax = map.extent.xmax;
//                        map.setExtent(baseExtent);
                    }
                });
                map.on('zoom-end', function (e) {
                    var ext = map.extent;
                    console.log(map.getLevel());
                    console.log(ext);
                    /*baseExtent.xmin = ext.xmin;
                     baseExtent.xmax = ext.xmax;
                     if (ext.ymin < baseExtent.ymin) {
                     console.log(ext.ymin);
                     baseExtent.ymin = ext.ymin;
                     }
                     if (ext.ymax > baseExtent.ymax) {
                     baseExtent.ymax = ext.ymax;
                     }*/
//                    map.setExtent(baseExtent);
                });
                map.on('click', function (e) {
//                    console.log(map.extent);
                    console.log(e.mapPoint);
                });
            });
        };
        initMap();
    });
</script>
</body>
</html>