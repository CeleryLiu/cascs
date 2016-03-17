<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>安全动态</title>
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
    </style>
</head>
<body>
<div class="container">安全动态</div>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
</body>
</html>
