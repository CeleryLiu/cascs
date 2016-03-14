<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>离线统计分析</title>
    <spring:url value="resources/css/bootstrap.min.css" var="bsCss"/>
    <link rel="stylesheet" href="${bsCss}">
    <style rel="stylesheet">
        body {
            font-family: Microsoft YaHei, arial, helvetica, simsun, sans-serif;
            color: #ddd;
            background: lightgray;
            background: no-repeat top center fixed linear-gradient(#3f4657, #452525);
        }

        /*for font & text & tag =================================== */
        .orange {
            color: #f27f02 !important;
        }

        .page-header {
            border-bottom: none;
        }

        .green {
            color: #79a605 !important;
        }

        .blue {
            color: #0057b0 !important;
        }

        .chart-holder {
            height: 50rem;
            min-height: 30rem;
            width: 80%;
            color: #ddd;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="page-header">
        <h1 class="orange">网络设备统计</h1>
    </div>
    <h3 class="orange">设备扫描统计分析</h3>
    <section class="row summary">
        <%--<h3 class="orange">设备扫描统计-全球</h3>--%>

        <div class="col-sm-6 chart-holder pull-right" id="globalBar">globalBar</div>
        <div class="col-sm-6 chart-holder pull-right" id="globalMap">globalMap</div>
    </section>
    <section class="row summary">
        <%--<h3 class="orange">设备扫描统计-中国</h3>--%>

        <div class="col-sm-6 chart-holder pull-right" id="countryBar">countryBar</div>
        <%--<div class="col-sm-6 summary-chart" id="countryMap">countryMap</div>--%>
    </section>

    <h3 class="orange">最近一次扫描的设备统计分析</h3>
    <section class="row">
        <%--<h3 class="orange">按国家统计</h3>--%>

        <div class="col-sm-12 chart-holder pull-right" id="countryPie">countryPie</div>
    </section>
    <section class="row">
        <h3 class="orange">按品牌统计</h3>

        <div class="col-sm-12 chart-holder pull-right" id="brandPie">brandPie</div>
    </section>
    <section class="row">
        <h3 class="orange">按设备类型统计</h3>

        <div class="col-sm-12 chart-holder pull-right" id="typePie">typePie</div>
    </section>
    <section class="row">
        <h3 class="orange">按端口统计</h3>

        <div class="col-sm-12 chart-holder pull-right" id="portPie">portPie</div>
    </section>
    <section class="row">
        <h3 class="orange">按服务统计</h3>

        <div class="col-sm-12 chart-holder pull-right" id="servicePie">servicePie</div>
    </section>
</div>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
<spring:url value="resources/plugins/echarts-2.2.7/build/dist/echarts.js" var="echarts"/>
<script src="${echarts}"></script>
<spring:url value="resources/plugins/echarts-x/build/dist/echarts-x.js" var="echartsX"/>
<script src="${echartsX}"></script>
<spring:url value="resources/js/helper.js" var="helperJs"/>
<script src="${helperJs}"></script>
<spring:url value="resources/js/analysis-offline.js" var="aOffJs"/>
<script src="${aOffJs}"></script>
</body>
</html>
