<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>数据探测</title>
    <%--<spring:url value="/resources/css/device-probe-globe.css" var="probeCss"/>--%>
    <%--<link rel="stylesheet" href="${probeCss}">--%>
    <style type="text/css" rel="stylesheet">
        html, body, #main {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        #globe4LineHolder {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
<div id="main">
    <div id="globe4LineHolder"></div>
</div>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
<spring:url value="resources/plugins/echarts-2.2.7/build/dist/echarts.js" var="echarts"/>
<script src="${echarts}"></script>
<spring:url value="resources/plugins/echarts-x/build/dist/echarts-x.js" var="echartsX"/>
<script src="${echartsX}"></script>
<spring:url value="resources/js/helper.js" var="helperJs"/>
<script src="${helperJs}"></script>
<spring:url value="/resources/js/device-probe-globe.js" var="probeJs"/>
<script src="${probeJs}"></script>
</body>
</html>