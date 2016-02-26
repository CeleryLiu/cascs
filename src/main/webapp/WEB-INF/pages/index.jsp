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
    <title>Hooray World Device</title>
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

    <%--custom css--%>
    <spring:url value="resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="resources/css/home-sec.css" var="homeCss"/>
    <link rel="stylesheet" href="${homeCss}">
    <spring:url value="resources/css/sidebar.css" var="sidebarCss"/>
    <link rel="stylesheet" href="${sidebarCss}">
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

    <%--↓custom js--%>
    <spring:url value="resources/js/static.js" var="staticJs"/>
    <script src="${staticJs}"></script>
    <spring:url value="resources/js/LoadData.js" var="ajax"/>
    <script src="${ajax}"></script>
    <spring:url value="resources/js/Session.js" var="sessionJs"/>
    <script src="${sessionJs}"></script>
    <spring:url value="resources/js/InputSuggest.js" var="suggestJs"/>
    <script src="${suggestJs}"></script>
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

</head>
<body>
<%@include file="header.jsp" %>
<%@include file="sidebar.jsp" %>

<div id="fullpage" class="fullpage">
    <div class="section" data-anchor="se0">
        <%@include file="home.jsp" %>
    </div>
    <div class="section" data-anchor="se1" id="list"></div>
    <div class="section" data-anchor="se2" id="map">
        <h1>地图</h1>
    </div>
    <div class="section" data-anchor="se3" id="point">
        <h1>设备3D</h1>
    </div>
    <div class="section" data-anchor="se4" id="line">
        <h1>数据流3D</h1>
    </div>
    <div class="section" data-anchor="se5" id="user">
        <div class="slide" data-anchor="se5_login">
            <%@include file="user/login.jsp" %>
        </div>
        <div class="slide" data-anchor="se5_pwd">
            <%@include file="user/pwdRetrieve.jsp" %>
        </div>
        <div class="slide" data-anchor="se5_reg">
            <%@include file="user/register.jsp" %>
        </div>
        <div class="slide" data-anchor="se5_agreement">
            <%@include file="user/agreement.jsp" %>
        </div>
    </div>
</div>
<%@include file="footer.jsp" %>
</body>
</html>