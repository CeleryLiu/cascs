<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
&lt;%&ndash;arcgis api for javascript&ndash;%&gt;
<link rel="stylesheet" type="text/css"
      href="<%=arcgisPath%>:8080/arcgis_js_api/library/3.15/3.15/dijit/themes/tundra/tundra.css">
<link rel="stylesheet" type="text/css"
      href="<%=arcgisPath%>:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
<script type="text/javascript">
    var djConfig = {parseOnLoad: true}
</script>
<script type="text/javascript" src="<%=arcgisPath%>:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>
--%>
<div class="map-wrapper">
    <div class="mapHolder" id="mapHolder"></div>
    <div id="legend_wrapper">
        <div id="legend"></div>
    </div>
    <%--<div id="homeButton"></div>--%>
    <div class="btn-group" role="group" id="tool_wrapper">
        <button type="button" class="btn btn-default open" id="sidebarCtrl">
            <span class="fa fa-caret-left"></span>
            隐藏侧栏
        </button>
        <div class="btn-group disabled" role="group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                分布图
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li class="map-layer"><a href="#" id="country" class="open">按国家 <span
                        class="fa fa-caret-right"></span></a>
                </li>
                <li class="map-layer"><a href="#" id="province" class="">按省份(中国) <span
                        class="fa"></span></a>
                </li>
                <li class="map-layer"><a href="#" id="city" class="">按城市(中国) <span
                        class="fa"></span></a>
                </li>
            </ul>
        </div>
        <button type="button" class="btn btn-default disabled" id="mapSidebarCtrl">显示数据
            <span class="fa fa-caret-right"></span>
        </button>
        <button type="button" class="btn btn-default active" id="labelLayerCtrl">隐藏数量
            <span class="fa fa-caret-right"></span>
        </button>
    </div>
    <div id="featureInfo">
        地理位置：<strong class="f-country"></strong><br>
        目标数量：<strong class="f-count"></strong>
    </div>
    <div id="mapSidebar" class="">
        <div class="content">
            <ul class="map-device-list"></ul>
        </div>
        <div class="pager-wrapper demo4 customBootstrap map">
            <ul id="map_pager" class="pagination pagination4"></ul>
        </div>
    </div>
</div>
<%--<button class="menu-button" id="open-button">Open Menu</button>

<script src="resources/js/map.js"></script>--%>
