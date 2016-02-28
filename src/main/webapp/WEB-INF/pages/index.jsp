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
    <title>CASCS</title>
    <meta name="author" content="LiuYanping"/>
    <meta name="description" content="index"/>
    <meta name="keywords" content="cyberspace,device,fingerprint,security,search engine,scan,web"/>

    <%--↓basic css--%>
    <spring:url value="resources/css/jquery.fullpage.css" var="fpCss"/>
    <link rel="stylesheet" href="${fpCss}">
    <spring:url value="resources/css/validform.css" var="vfCss"/>
    <link rel="stylesheet" href="${vfCss}">
    <spring:url value="resources/css/bootstrap.min.css" var="bsCss"/>
    <link rel="stylesheet" href="${bsCss}">
    <spring:url value="resources/css/typeaheadjs.css" var="taCss"/>
    <link rel="stylesheet" href="${taCss}">
    <%--<link rel="stylesheet" type="text/css"
          href="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/dijit/themes/tundra/tundra.css">
    --%>
    <link rel="stylesheet" type="text/css"
          href="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
    <%--custom css--%>
    <spring:url value="resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="resources/css/home-sec.css" var="homeCss"/>
    <link rel="stylesheet" href="${homeCss}">
    <spring:url value="resources/css/sidebar.css" var="sidebarCss"/>
    <link rel="stylesheet" href="${sidebarCss}">
    <spring:url value="resources/css/markpoint-line.css" var="mplCss"/>
    <link rel="stylesheet" href="${mplCss}">
    <spring:url value="resources/css/map.css" var="mapCss"/>
    <link rel="stylesheet" href="${mapCss}">
    <spring:url value="resources/css/list.css" var="lCss"/>
    <link rel="stylesheet" href="${lCss}">
    <spring:url value="resources/css/user-pages-style.css" var="userCss"/>
    <link rel="stylesheet" href="${userCss}">

    <!--[if IE]>
    <script type="text/javascript">
        var console = {
            log: function () {
                console.log("Not support IE, please use Chrome");
            }
        };
    </script>
    <![endif]-->

    <%--↓js libs--%>
    <spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
    <script src="${jqJs}"></script>
    <spring:url value="resources/js/libs/jquery.slimscroll.min.js" var="ssJs"/>
    <script src="${ssJs}"></script>
    <spring:url value="resources/js/libs/bootstrap.min.js" var="bsJs"/>
    <script src="${bsJs}"></script>
    <spring:url value="resources/js/libs/typeahead.bundle.min.js" var="taJs"/>
    <script src="${taJs}"></script>
    <spring:url value="resources/js/libs/jquery.fullpage.js" var="fpJs"/>
    <script src="${fpJs}"></script>
    <spring:url value="resources/js/libs/Validform_v5.3.2_min.js" var="vfJs"/>
    <script src="${vfJs}"></script>
    <spring:url value="resources/js/libs/jquery.sha1.js" var="sha1Js"/>
    <script src="${sha1Js}"></script>
    <spring:url value="resources/js/libs/jqPaginator.min.js" var="pagerJs"/>
    <script src="${pagerJs}"></script>

    <%--↓custom js--%>
    <spring:url value="resources/js/sessionStorage.js" var="sstJs"/>
    <script src="${sstJs}"></script>
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
    <spring:url value="resources/js/InputSuggest.js" var="suggestJs"/>
    <script src="${suggestJs}"></script>
    <spring:url value="resources/js/List.js" var="listJs"/>
    <script src="${listJs}"></script>
    <spring:url value="resources/js/Map.js" var="mapJs"/>
    <script src="${mapJs}"></script>
    <spring:url value="resources/js/HomeSearch.js" var="hsJs"/>
    <script src="${hsJs}"></script>
    <spring:url value="resources/js/GlobalSearchForm.js" var="gsJs"/>
    <script src="${gsJs}"></script>
    <spring:url value="resources/js/Sidebar.js" var="sidebarJs"/>
    <script src="${sidebarJs}"></script>
    <spring:url value="resources/js/Pivot.js" var="pivotJs"/>
    <script src="${pivotJs}"></script>
    <spring:url value="resources/js/User.js" var="userJs"/>
    <script src="${userJs}"></script>
    <spring:url value="resources/js/main.js" var="mainJs"/>
    <script src="${mainJs}"></script>

    <%--echarts lib and 3d js--%>
    <%--<spring:url value="resources/plugins/echarts-2.2.7/build/dist/echarts.js" var="echarts"/>
    <script src="${echarts}"></script>
    <spring:url value="resources/plugins/echarts-x/build/dist/echarts-x.js" var="echartsX"/>
    <script src="${echartsX}"></script>
    <spring:url value="resources/js/MarkPoint.js" var="mpJs"/>
    <script src="${mpJs}"></script>
    <spring:url value="resources/js/MarkLine.js" var="mlJs"/>
    <script src="${mlJs}"></script>--%>

    <%--arcgis lib and map js--%>
    <script type="text/javascript" src="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>


</head>
<body>
<%@include file="header.jsp" %>
<%@include file="sidebar.jsp" %>
<div id="pivots_wrapper" class="pivots-wrapper for-sidebar-padding">
    <ul class="pivots">
        <%--<li><a href="#">pivot1</a></li>
        <li><a href="#">pivot2</a></li>
        <li><a href="#">pivot3</a></li>--%>
    </ul>
</div>

<div id="fullpage" class="fullpage">
    <div class="section" data-anchor="se1">
        <%@include file="home.jsp" %>
    </div>
    <div class="section" data-anchor="se2" id="list">
        <div style="height: 6rem;"></div>
        <div class="list-wrapper">
            <div class="result-count-duration for-sidebar-padding">
                <p>搜索到约 <strong class="badge resultCount">0</strong> 条结果，
                    共用时 <strong class="badge duration">0</strong> ms。
                    当前为第<strong class="badge" id="pageTip">0</strong>页</p>
            </div>
            <div class="result-col for-sidebar-margin">
                <div class="result-container">
                    <ul class="result devices"></ul>
                </div>
                <div class="pager-wrapper demo customBootstrap" style="margin-bottom: 2rem">
                    <ul id="pager" class="pagination"></ul>
                </div>
            </div>
        </div>
    </div>
    <div class="section" data-anchor="se3" id="map">
        <%@include file="map.jsp" %>
    </div>
    <div class="section" data-anchor="se4" id="point">
        <%--<%@include file="markpoint.jsp" %>--%>
        <iframe src="markpoint-iframe" name="iPoint"></iframe>
    </div>
    <div class="section" data-anchor="se5" id="line">
        <%--<div id="globe4LineHolder"></div>--%>
        <iframe src="markline-iframe" name="iLine"></iframe>
    </div>
    <div class="section" data-anchor="se6" id="user">
        <div class="slide" data-anchor="se6_login">
            <%@include file="user/login.jsp" %>
        </div>
        <div class="slide" data-anchor="se6_reg">
            <%@include file="user/register.jsp" %>
        </div>
        <div class="slide" data-anchor="se6_agreement">
            <%@include file="user/agreement.jsp" %>
        </div>
        <div class="slide" data-anchor="se6_pwd">
            <%@include file="user/pwdRetrieve.jsp" %>
        </div>
    </div>
</div>
<%@include file="footer.jsp" %>
</body>
</html>