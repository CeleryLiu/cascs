<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>关于我们</title>
    <spring:url value="resources/css/bootstrap.min.css" var="bsCss"/>
    <link rel="stylesheet" href="${bsCss}">
    <spring:url value="resources/css/base.minus.css" var="aboutCss"/>
    <link rel="stylesheet" href="${aboutCss}">
</head>
<body data-spy="scroll" data-target="#myScrollspy">
<%@include file="header.jsp" %>
<div class="container">
    <div class="row">
        <div class="col-xs-3" id="myScrollspy">
            <ul class="nav nav-tabs nav-stacked" id="myNav">
                <li class="active"><a href="#about">关于我们</a></li>
                <li><a href="#contact">联系我们</a></li>
                <%--<li><a href="#project">项目简介</a></li>--%>
            </ul>
        </div>
        <div class="col-xs-9">
            <section id="about">
                <div class="page-header">
                    <h1>关于我们</h1>
                </div>
                <img src="resources/img/iie.png" class="img-responsive img-rounded" alt="物联网重点科学实验室">

                <div class="jumbotron orange">
                    <h2><cite class="orange">没有网络安全，就没有国家安全。</cite></h2>

                    <p><em class="pull-right orange">--习近平</em></p>
                </div>

                <div class="row">
                    <div class="col-xs-6">
                        <p>
                            中国科学院信息工程研究所（简称“信工所”）是以安全为中心的研究所，面向国家战略需求，在信息安全科技领域，
                            开展基础理论与前沿技术研究，开发应用性技术与系统，为国家信息化进程提供核心关键技术支撑与系统解决方案。
                        </p>

                        <p>物联网安全技术北京市重点实验室，依托中国科学院信息工程研究所, 由北京市科委批复。
                            实验室面向国家战略需求，围绕工业控制系统、城市公共安全等典型物联网的系统安全问题，
                            确立了搜索与隐藏、入侵检测、漏洞挖掘、访问控制、安全评测和态势感知等六大研究方向，
                            目标是为国家关键基础设施安全提供完整的技术解决方案。</p>

                        <p>网络空间安全，作为我国“十三.五”规划中重要的战略规划，是关系整个国家安全和民族复习的重要领域。
                            网络空间中基础设施的搜索识别、漏洞检测、关联分析、态势感知和安全防护，更是网络空间安全中至关重要的环节！
                            在此背景下，物联网安全技术北京市重点实验室研发的《网络空间中联网设备的搜索发现与安全检测系统》，
                            为整个国家网络空间安全的科学研究和技术创新，提供了重要的基础保障和关键支撑！</p>
                    </div>
                    <div class="col-xs-6"><img src="resources/img/lab-info.jpg"></div>
                </div>
            </section>
            <section id="contact">
                <div class="page-header">
                    <h1>联系我们</h1>
                </div>
            </section>
            <%-- <section id="project">
                 <div class="page-header">
                     <h1>项目简介</h1>
                 </div>
             </section>--%>
        </div>
    </div>
</div>
<%@include file="footer.jsp" %>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
<spring:url value="resources/js/libs/bootstrap.min.js" var="bsJs"/>
<script src="${bsJs}"></script>
<script type="text/javascript">
    var basePath = '${basePath}';
    $(function () {
        $("#myNav").affix({
            offset: {
                top: -20
            }
        });
        $('.header').find('a').on('click', function (e) {
            e.preventDefault();
            window.location.href = basePath + $(this).attr('href');
        });
    });
</script>
</body>
</html>