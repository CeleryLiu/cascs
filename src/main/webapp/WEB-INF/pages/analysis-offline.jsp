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

        section {
            margin-top: 2rem;
        }

        section h3 {
            margin-left: 1rem;
        }

        .page-header {
            border-bottom: none;
        }

        .light-blue {
            color: #1e90ff !important;
        }

        .chart-holder {
            height: 50rem;
            min-height: 200px;
            margin-right: 4rem;
            margin-left: 2rem;
            color: #ddd;
        }

        .echarts-dataview {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .echarts-dataview button,
        .echarts-dataview p,
        .echarts-dataview textarea {
            color: #333;
            margin-left: 1rem;
            margin-right: 1rem;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="page-header">
        <h1 class="light-blue">网络设备统计</h1>
    </div>
    <h3 class="light-blue">设备扫描统计分析</h3>
    <p>最近6个月，设备扫描统计</p>
    <section class="row summary">
        <div class="col-xs-12 chart-holder pull-right" id="summaryChart"></div>
    </section>

    <h3 class="light-blue">最近一次扫描的设备统计分析</h3>
    <section class="row country">
        <h3 class="light-blue">按国家统计</h3>

        <div class="col-xs-12 chart-holder pull-right" id="countryMap"></div>
    </section>
    <section class="row brand">
        <h3 class="light-blue">按品牌统计</h3>

        <div class="col-xs-12 chart-holder pull-right" id="brandPie"></div>
    </section>
    <section class="row type">
        <h3 class="light-blue">按设备类型统计</h3>

        <div class="col-xs-12 chart-holder pull-right" id="typePie"></div>
    </section>
    <section class="row port">
        <h3 class="light-blue">按端口统计</h3>

        <div class="col-xs-12 chart-holder pull-right" id="portPie"></div>
    </section>
    <section class="row service">
        <h3 class="light-blue">按服务统计</h3>

        <div class="col-xs-12 chart-holder pull-right" id="servicePie"></div>
    </section>
</div>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
<spring:url value="resources/js/libs/pace.min.js" var="paceJs"/>
<script data-pace-options='{"startOnPageLoad": true,"ajax":true }'
        src="${paceJs}"></script>
<spring:url value="resources/plugins/echarts-2.2.7/build/dist/echarts.js" var="echarts"/>
<script src="${echarts}"></script>
<spring:url value="resources/js/helper.js" var="helperJs"/>
<script src="${helperJs}"></script>
<spring:url value="resources/js/static.js" var="staticJs"/>
<script src="${staticJs}"></script>
<spring:url value="resources/js/LoadData.js" var="ajaxJs"/>
<script src="${ajaxJs}"></script>
<spring:url value="resources/js/analysis-offline.js" var="aOffJs"/>
<script src="${aOffJs}"></script>
</body>
</html>
