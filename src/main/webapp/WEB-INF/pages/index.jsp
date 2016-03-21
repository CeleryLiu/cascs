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
    <title>Cyberspace Assets Search and Classification System</title>
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
    <spring:url value="resources/css/themes/pace-theme-mac-osx.css" var="paceCss"/>
    <link rel="stylesheet" href="${paceCss}">
    <spring:url value="resources/css/font-awesome-4.2.0/css/font-awesome.min.css" var="awsFont"/>
    <link rel="stylesheet" href="${awsFont}">
    <link rel="stylesheet" type="text/css"
          href="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
    <%--<link rel="stylesheet" type="text/css"--%>
    <%--href="http://10.10.2.174:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>--%>
    <%--    <spring:url value="resources/css/app.min.css" var="appCss"/>
        <link rel="stylesheet" href="${appCss}">--%>

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
    <spring:url value="resources/css/list.css" var="listCss"/>
    <link rel="stylesheet" href="${listCss}">
    <spring:url value="resources/css/user-pages-style.css" var="userCss"/>
    <link rel="stylesheet" href="${userCss}">
    <spring:url value="resources/css/advs.css" var="advsCss"/>
    <link rel="stylesheet" href="${advsCss}">
    <spring:url value="resources/css/media.css" var="mediaCss"/>
    <link rel="stylesheet" href="${mediaCss}">
    <spring:url value="resources/css/cites.css" var="citesCss"/>
    <link rel="stylesheet" href="${citesCss}">
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
    <spring:url value="resources/js/libs/bootstrap-confirmation.min.js" var="confirmJs"/>
    <script src="${confirmJs}"></script>
    <spring:url value="resources/js/libs/jqPaginator.min.js" var="pagerJs"/>
    <script src="${pagerJs}"></script>
    <spring:url value="resources/js/libs/pace.min.js" var="paceJs"/>
    <script data-pace-options='{"startOnPageLoad": false,"ajax":true }'
            src="${paceJs}"></script>
    <spring:url value="resources/js/libs/jquery.matchHeight-min.js" var="matchHeightJs"/>
    <script src="${matchHeightJs}"></script>
    <spring:url value="resources/js/libs/jquery.scrollUp.min.js" var="scrollUpJs"/>
    <script src="${scrollUpJs}"></script>
    <spring:url value="resources/js/libs/jquery.unveil.js" var="unveilJs"/>
    <script src="${unveilJs}"></script>

    <%--    <spring:url value="resources/js/app.min.js" var="appJs"/>
        <script src="${appJs}"></script>--%>

    <spring:url value="resources/js/static.js" var="staticJs"/>
    <script src="${staticJs}"></script>
    <spring:url value="resources/js/helper.js" var="helperJs"/>
    <script src="${helperJs}"></script>
    <spring:url value="resources/js/LoadData.js" var="ajax"/>
    <script src="${ajax}"></script>
    <spring:url value="resources/js/Pager.js" var="pagerJs"/>
    <script src="${pagerJs}"></script>
    <spring:url value="resources/js/error.js" var="errorJs"/>
    <script src="${errorJs}"></script>
    <spring:url value="resources/js/Session.js" var="sessionJs"/>
    <script src="${sessionJs}"></script>
    <spring:url value="resources/js/InputSuggest.js" var="suggestJs"/>
    <script src="${suggestJs}"></script>
    <spring:url value="resources/js/UserSearchHistory.js" var="sHistoryJs"/>
    <script src="${sHistoryJs}"></script>
    <spring:url value="resources/js/List.js" var="listJs"/>
    <script src="${listJs}"></script>
    <spring:url value="resources/js/Map.js" var="mapJs"/>
    <script src="${mapJs}"></script>
    <spring:url value="resources/js/HomeSearch.js" var="hsJs"/>
    <script src="${hsJs}"></script>
    <spring:url value="resources/js/GlobalSearch.js" var="gsJs"/>
    <script src="${gsJs}"></script>
    <spring:url value="resources/js/SidebarPivotResOverview.js" var="sprJs"/>
    <script src="${sprJs}"></script>
    <spring:url value="resources/js/User.js" var="userJs"/>
    <script src="${userJs}"></script>
    <spring:url value="resources/js/main.js" var="mainJs"/>
    <script src="${mainJs}"></script>
    <script type="text/javascript">
        var djConfig = {parseOnLoad: true}
    </script>
    <%--arcgis lib and map js--%>
    <%--<script type="text/javascript" src="http://10.10.2.174:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>--%>
    <script type="text/javascript" src="<%=basePathNoPort%>:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>
</head>
<body>
<%@include file="header.jsp" %>
<%--占一行的一个大的搜索框--%>
<div class="global-search-wrapper" id="global_search_wrapper">

    <form class="global-search-form" method="get" action="api/search">
        <fieldset>
            <div class="search-scope"></div>
            <div class="search-box-container">
                <input class="global-search-input typeahead" type="text"
                       role="combobox"
                       placeholder="Search ..."
                       autofocus="autofocus"
                       id="global_search_input">
            </div>
            <button type="submit" class="global-search-button btn btn-primary" role="button" id="global_search_button">
                <span class="fa fa-search"></span>
            </button>
        </fieldset>
        <div class="advs-link-wrapper"><a href="#" class="advs-link">高级搜索</a></div>
    </form>
</div>
<div id="header2" class="row-fluid">
    <div class="col-lg-offset-2 col-md-offset-3 col-sm-offset-3 col-lg-10 col-md-9 col-sm-9">
        <div class="result-overview" id="result_overview">
            <p class="">搜索到约 <strong class="badge count">0</strong> 条结果，
                共用时 <strong class="badge duration">0</strong> ms。
                当前为第<strong class="badge page-num">0</strong>页</p>
        </div>
        <div class="pivots-wrapper" id="pivots_wrapper">
            <ul class="pivots"></ul>
        </div>
    </div>
</div>
<%@include file="sidebar.jsp" %>
<%@include file="advs.jsp" %>
<div id="fullpage" class="fullpage">
    <div class="section" data-anchor="se1" id="homeSe">
        <%@include file="home.jsp" %>
    </div>
    <div class="section" data-anchor="se2" id="listSe">
        <div class="list-wrapper row-fluid" id="list_wrapper">
            <div class="result-col col-lg-offset-2 col-md-offset-3 col-sm-offset-3 col-lg-8 col-md-6 col-sm-6">
                <div class="result-container">
                    <ul class="result devices"></ul>
                </div>
                <div class="pager-wrapper demo customBootstrap" style="margin-bottom: 2rem">
                    <ul id="pager" class="pagination"></ul>
                </div>
            </div>
            <div class="no-data">没有搜索到相关设备，您可以尝试使用其他关键字搜索！</div>
        </div>
    </div>
    <div class="section" data-anchor="se3" id="mapSe">
        <%@include file="map.jsp" %>
    </div>
    <div class="section" data-anchor="se4" id="pointSe">
        <iframe src="markpoint-iframe" name="iPoint"></iframe>
    </div>
    <div class="section" data-anchor="se5" id="lineSe">
        <iframe src="markline-iframe" name="iLine"></iframe>
    </div>
    <div class="section" data-anchor="se7" id="analysis">
        <div class="slide" data-anchor="se7_offline" id="aOffline">
            <iframe src="analysis-offline" onload="onOfflineLoaded(this)" name="aOffline"></iframe>
        </div>
        <%--<div class="slide" data-anchor="se7_online" id="aOnline"></div>--%>
    </div>
    <div class="section" data-anchor="se8" id="news">
        <div class="slide" data-anchor="se8_security" id="security">
            <%@include file="news-security.jsp" %>
        </div>
        <div class="slide" data-anchor="se8_info" id="info"></div>
    </div>
    <div class="section" data-anchor="se9" id="cites">
        <%@include file="cites.jsp" %>
    </div>
    <div class="section" data-anchor="se6" id="user">
        <div class="slide" data-anchor="se6_login" id="loginSl">
            <%@include file="user/login.jsp" %>
        </div>
        <div class="slide" data-anchor="se6_reg" id="regSl">
            <%@include file="user/register.jsp" %>
        </div>
        <div class="slide" data-anchor="se6_agreement" id="agreementSl">
            <%@include file="user/agreement.jsp" %>
        </div>
        <div class="slide" data-anchor="se6_pwd" id="pwdRetrieveSl">
            <%@include file="user/pwdRetrieve.jsp" %>
        </div>
    </div>
</div>
<%@include file="footer.jsp" %>
</body>
</html>