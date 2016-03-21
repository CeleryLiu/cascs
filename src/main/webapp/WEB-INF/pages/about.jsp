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
<div class="container about">
    <div class="row">
        <div class="col-xs-3" id="myScrollspy">
            <ul class="nav nav-tabs nav-stacked" id="myNav">
                <li class="active"><a href="#project">系统简介</a></li>
                <li><a href="#about">关于我们</a></li>
                <li><a href="#contact">联系我们</a></li>
            </ul>
        </div>
        <div class="col-xs-9">
            <section id="project">
                <div class="page-header">
                    <h1>网络空间设备搜索与检测系统简介</h1>
                </div>
                <section>
                    <h4 class="red"><strong>系统功能描述</strong></h4>

                    <p>本系统在网络空间中发现设备如camera、NVR、DVR、路由器、交换机等，并对其进行安全检测。</p>
                </section>
                <section>
                    <h4 class="red"><strong>系统架构</strong></h4>

                    <img src="resources/img/system-1.png" class="img-responsive" title="系统架构图" alt="系统架构图">
                </section>
                <section>
                    <h4 class="red"><strong>部署图</strong></h4>
                    <img src="resources/img/system-2.png" class="img-responsive" title="系统部署图" alt="系统部署图">
                </section>
                <section>
                    <h4 class="red"><strong>关键技术</strong></h4>

                    <ul>
                        <li>自动化特征提取与指纹生成技术</li>
                        <li>嵌入式设备漏洞挖掘技术与脆弱性分析技术</li>
                        <li>快速精细化探测扫描技术</li>
                    </ul>
                </section>
                <section>
                    <h4 class="red"><strong>系统应用成果展示</strong></h4>

                    <p class="achievement">监控设备搜索成果</p>
                    <ul>
                        <li>全球搜索发现监控设备达141多万个</li>
                        <li>全国搜索发现监控设备达19多万个</li>
                        <li>搜索结果超过zoomeye/shodan</li>
                        <li>全国搜索到打印机12808个</li>
                    </ul>

                    <p class="achievement">工控设备搜索成果</p>
                    <ul>
                        <li>对Siemens S7 PLC工控设备，全球搜索4085个</li>
                        <li>对Modbus设备全球搜索到1.9万个</li>
                        <li>分析和提取了DNP3、modbus、BACnet、IEC61850、Profinet、Siemens、EtherNet/IP等工控协议特征</li>
                        <li>研究了包括西门子、施耐德、浙大中控、和利时等知名企业的PLC等工控设备</li>
                        <li>研究了SCADA、HMI等上位机系统软件</li>
                        <li>漏洞挖掘成果</li>
                        <li>信工所自己挖掘漏洞验证，2015年挖掘漏洞9个，占CNVD收录监控漏洞的一半</li>
                    </ul>

                    <p class="achievement">工控设备渗透成果</p>

                    <p>发现56个存在安全隐患的系统，覆盖能源、制造、水利、电力、楼宇等各个领域。</p>
                    <img src="resources/img/system-3.png" class="img-responsive" title="工控设备渗透成功" alt="工控设备渗透成果">

                    <p class="achievement">安保工作成果</p>
                    <ul>
                        <li>
                            抗战胜利70周年纪念活动（9.3阅兵）<br>
                            扫描阅兵现场及周边区域监控点位，确保阅兵现场影像不外泄（尤其是非授权外媒）阅兵重要保障部门工作状态影像不外泄，荣获BM局先进集体表扬和个人嘉奖
                        </li>
                        <li>
                            青岛航母基地周边监控设备专项检查<br>
                            对青岛航母基地周边及军港城市进行了视频监控设备的搜索与安全检查，搜索到青岛航母基地周边441个、青岛市围内3530个，发现大量监控设备存在弱密钥等可利用漏洞问题，上报保密局
                        </li>
                        <li>
                            十八届五中全会及其他重要活动<br>京西宾馆等重点敏感场所周边的安全保障工作
                        </li>
                        <li>上海合作组织总理会议<br>郑州上合组织峰会期间 视频监控设备专项安全保障工作</li>
                        <li>
                            国家安全机关相关工作<br>为四川省信息安全测评中心开展联网视频监控设备专项检测
                        </li>
                    </ul>
                </section>
            </section>
            <section id="about">
                <div class="page-header">
                    <h1>关于我们</h1>
                </div>

                <div class="jumbotron orange">
                    <h2><cite class="orange">没有网络安全，就没有国家安全。</cite></h2>

                    <p><em class="pull-right orange">--习近平</em></p>
                </div>
                <img src="resources/img/iie.png" class="img-responsive img-rounded" alt="物联网重点科学实验室">

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
                    <div class="col-xs-6"><img src="resources/img/labinfo.jpg" class="img-responsive img-rounded mt20">
                    </div>
                </div>
            </section>
            <section id="contact">
                <div class="page-header">
                    <h1>联系我们</h1>
                </div>
                <div>
                    <h3>中国科学院信息工程研究所</h3>
                    <address>
                        地址：北京市海淀区闵庄路甲89号<br>
                        电话：(010)xxxxxxx<br>
                        邮箱: xxx@iie.com.cn<br>
                    </address>
                </div>
                <img src="resources/img/location.png">
            </section>
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
        $('.header a[href]').on('click', function (e) {
            e.preventDefault();
            window.location.href = basePath + $(this).attr('href');
        });
    });
</script>
</body>
</html>