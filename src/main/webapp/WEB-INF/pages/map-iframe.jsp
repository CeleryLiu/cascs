<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
    String basePathWithoutContextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>定位</title>
    <%--arcgis api for javascript--%>
    <link rel="stylesheet" type="text/css"
          href="<%=basePathWithoutContextPath%>/arcgis_js_api/library/3.15/3.15/dijit/themes/tundra/tundra.css">
    <link rel="stylesheet" type="text/css"
          href="<%=basePathWithoutContextPath%>/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
    <spring:url value="resources/css/map.css" var="mapCss"/>
    <link rel="stylesheet" href="${mapCss}">
    <script type="text/javascript">
        var djConfig = {parseOnLoad: true}
    </script>
    <script type="text/javascript" src="<%=basePathWithoutContextPath%>/arcgis_js_api/library/3.15/3.15/init.js"></script>
</head>
<body>
<div class="map-wrapper">
    <div class="mapHolder" id="mapHolder"></div>
    <div id="legend-wrapper">
        <div id="legend"></div>
    </div>
    <%--<div id="homeButton"></div>--%>
    <div class="btn-group" role="group" id="tool-wrapper">
        <button type="button" class="btn btn-default open" id="sidebarCtrl">
            <span class="glyphicon glyphicon-triangle-left"></span>
            隐藏侧栏
        </button>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                分布图
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li class="map-layer"><a href="#" id="country" class="">按国家 <span
                        class="glyphicon"></span></a>
                </li>
                <li class="map-layer"><a href="#" id="province" class="">按省份 <span
                        class="glyphicon"></span></a>
                </li>
                <li class="map-layer"><a href="#" id="city" class="">按城市 <span
                        class="glyphicon"></span></a>
                </li>
            </ul>
        </div>
        <button type="button" class="btn btn-default" id="mapSidebarCtrl">显示数据
            <span class="glyphicon glyphicon-triangle-right"></span>
        </button>
    </div>
    <div id="featureInfo">
        地理位置：<strong class="f-country"></strong><br>
        目标数量：<strong class="f-count"></strong></div>
    <div id="mapSidebar" class="">
        <div class="content">
            <ul class="map-device-list"></ul>
        </div>
        <div class="pager-wrapper demo4 customBootstrap map">
            <ul id="map_pager" class="pagination pagination4"></ul>
        </div>
    </div>
</div>
<%--<button class="menu-button" id="open-button">Open Menu</button>--%>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
<spring:url value="resources/js/libs/bootstrap.min.js" var="bsJs"/>
<script src="${bsJs}"></script>
<spring:url value="resources/js/libs/jqPaginator.min.js" var="pagerJs"/>
<script src="${pagerJs}"></script>
<spring:url value="resources/js/static.js" var="staticJs"/>
<script src="${staticJs}"></script>
<spring:url value="resources/js/helper.js" var="helperJs"/>
<script src="${helperJs}"></script>
<spring:url value="resources/js/noData.js" var="noData"/>
<script src="${noData}"></script>
<spring:url value="resources/js/LoadData.js" var="ajax"/>
<script src="${ajax}"></script>
<spring:url value="resources/js/Session.js" var="sessionJs"/>
<script src="${sessionJs}"></script>
<spring:url value="/resources/js/Map.js" var="mapJs"/>
<script src="${mapJs}"></script>
</body>
</html>
