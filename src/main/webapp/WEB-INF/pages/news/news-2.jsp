<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>安全动态—工控安全标准发展现状与思考</title>
    <spring:url value="resources/css/bootstrap.min.css" var="bsCss"/>
    <link rel="stylesheet" href="${bsCss}">
    <spring:url value="resources/css/base.minus.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="resources/css/news.css" var="newsCss"/>
    <link rel="stylesheet" href="${newsCss}">
</head>
<body>
<%@include file="../header.jsp" %>
<div class="container">
    <div class="row">
        <div class="col-xs-12 article">
            <h2>工控安全标准发展现状与思考</h2>

            <div class="article-msg">
                <span class="time">2016-03-07 </span>
                <span class="orig">来源：
                    <a href="http://plcscan.org/blog/2016/03/ics-standards-development-and-thoughts/"
                       target="_blank">ICS Security Workspace</a>
                </span>
            </div>
            <hr size="1">
            <section>
                <h3><strong>1. 国际工控安全标准发展</strong></h3>
                <h4><strong>1.1 国际工控安全标准</strong></h4>

                <p>目前在国际上，工业控制系网络安全标准的研究制定工作主要由IEC/TC 65（工业过程测量、控制和自动化）
                    下的网络和系统信息安全WG10和国际自动化协会（ISA 99）委员会组成的联合工作组负责，
                    该工作组目前主要制定了IEC 62443《工业过程测量、控制和自动化网络与系统信息安全》系列标准。该系列标准如下表所示：</p>
                <table class="table table-striped table-responsive table-hover">
                    <thead>
                    <tr>
                        <th>通用方面</th>
                        <th>政策与程序</th>
                        <th>系统</th>
                        <th>组件</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1-1 术语、概念和模型</td>
                        <td>2-1 建立IACS信息安全程序</td>
                        <td>3-1 信息安全技术</td>
                        <td>4-1 产品开发要求</td>
                    </tr>
                    <tr>
                        <td>1-2 术语和缩略语</td>
                        <td>2-2 运行IACS信息安全程序</td>
                        <td>3-2 区域和通道的信息安全保障登记</td>
                        <td>4-2 对IACS产品的信息安全技术要求</td>
                    </tr>
                    <tr>
                        <td>1-3 系统信息安全符合性度量</td>
                        <td>2-3 IACS环境中的补丁更新管理</td>
                        <td>3-3 系统信息安全要求和信息安全保障等级</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2-4 对IACS制造商信息安全政策与实践的认证</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>通用方面</td>
                        <td>用户业主</td>
                        <td>系统集成商</td>
                        <td>产品制造商</td>
                    </tr>
                    </tbody>
                </table>
                <p>
                    IEC 62443是专门针对工业自动化和工业安全的系列标准。该系列标准，旨在使系统集成商、产品供应商和服务提供商，可以通过使用该标准来评估他们的产品和服务，
                    并依据评估结果判断其产品或服务是否能够为工业控制系统使用者提供有效的安全防护。IEC 62443的目标并不是提供详细规范并建立一个安全的体系架构，
                    其目标是定义一个通用的最小安全要求集，使目标工业控制系统达到各级SALS（Security Assurances Levels，SAL）的安全保障需求。
                </p>

                <p>为了推广IEC62443并抢占标准一致性测试市场，美国仪表协议于2010年成立了ISA信息安全符合性研究院ISCI（ISASecure）。
                    目前开展了如下三项标准符合性测试认证：</p>
                <ul>
                    <li>IEC 62443-3-3：系统安全保证（SSA）认证要求</li>
                    <li>IEC 62443-4-1：安全开发生命周期保证（SDLA）认证要求</li>
                    <li>IEC 62443-4-2：嵌入式设备安全保证（EDSA）认证要求</li>
                </ul>
                <p>ISASecure认证需要使用通信健壮性测试（CRT）工具和漏洞识别测试工具。目前ISCI认可测试工具如下表所示：</p>
                <table class="table table-striped table-responsive table-hover">
                    <thead>
                    <tr>
                        <th>CRT测试工具</th>
                        <th>漏洞识别工具</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <p>ODENOMICON DEFENSICS X测试套件</p>

                            <p>HITACHI Raven ES测试工具</p>

                            <p>BEYOND security beSTORM EDSA测试工具</p>

                            <p>Wurldtech Achilles测试工具</p>
                        </td>
                        <td>
                            Tenable Nessus Vulnerability Scanner
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h4><strong>1.2 美国工控安全标准</strong></h4>

                <p>美国国土安全部（DHS）作为关键基础设施安全（工控安全）的主管单位，为美国提供关键基础设施安全的战略指导，并与公共和私人合作伙伴合作，
                    协调美国联邦各个单位促进关键基础实施的安全性和可恢复性。美国国家标准与技术研究院（NIST）作为美国工控安全国家标准的制定单位，
                    为支持联邦信息安全管理法案（FISMA）的执行，制定保护国家关键基础设施主要标准，主要为NIST SP800-82和NIST SP800-53两个标准。
                    美国国土安全部发布CSET安全评估工具，推动工控安全标准的使用及对工控安全评估进行工具支撑。</p>

                <p>
                    从美国工控安全标准制定组织和成果可以看出，NIST制定工控安全主要标准，标准可跨行业，并且标准不停的滚动发布。
                    从中可看到标准制定的有效经验，第一步解决有无标准的问题，然后再解决标准高质量与普适性问题。
                    从标准成果还可以看出，美国针对SCADA控制系统的安全标准比较多，主要因为SCADA的安全问题在控制系统中尤为突出。
                    从中体现出美国标准制定以解决突出问题为导向，而不是胡子眉毛一把抓。
                </p>
                <table class="table table-responsive table-striped table-hover">
                    <thead>
                    <tr>
                        <th>组织分类</th>
                        <th>组织名称</th>
                        <th>文件名称</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td rowspan="11">标准制定<br> 重要单位</td>
                        <td rowspan="6">美国国家标准与技术研究院（NIST）</td>
                        <td>工业控制系统安全指南（NISTSP800-82）</td>
                    </tr>
                    <tr>
                        <td>联邦信息系统和组织的安全控制建议（NISTSP800-53）</td>
                    </tr>
                    <tr>
                        <td>系统保护轮廓-工业控制系统（NISTIR7176）</td>
                    </tr>
                    <tr>
                        <td>中等健壮环境下的SCADA系统现场设备保护概况</td>
                    </tr>
                    <tr>
                        <td>改善关键基础设施网络安全框架</td>
                    </tr>
                    <tr>
                        <td>改善关键基础设施网络安全框架</td>
                    </tr>
                    <tr>
                        <td rowspan="5">国土安全部（DHS）</td>
                        <td>中小规模能源设施风险管理核查事项</td>
                    </tr>
                    <tr>
                        <td>控制系统安全一览表：标准推荐</td>
                    </tr>
                    <tr>
                        <td>SCADA和工业控制系统安全</td>
                    </tr>
                    <tr>
                        <td>工业控制系统安全评估指南（与CPNI联合发布）</td>
                    </tr>
                    <tr>
                        <td>工业控制系统远程访问配置管理指南（与CPNI联合发布）</td>
                    </tr>
                    <tr>
                        <td rowspan="6">标准制定<br>行业单位</td>
                        <td>北美电力可靠性委员会（NERC）</td>
                        <td>北美大电力系统可靠性规范（NERCCIP002–009）</td>
                    </tr>
                    <tr>
                        <td>美国天然气协会（AGA）</td>
                        <td>SCADA通信的加密保护（AGAReportNo.12）</td>
                    </tr>
                    <tr>
                        <td rowspan="2">美国石油协会（API）</td>
                        <td>管道SCADA安全（API1164）</td>
                    </tr>
                    <tr>
                        <td>石油工业安全指南</td>
                    </tr>
                    <tr>
                        <td>美国能源部（DOE）</td>
                        <td>提高SCADA系统网络安全21步</td>
                    </tr>
                    <tr>
                        <td>美国核管理委员会</td>
                        <td>核设施网络安全措施（RegulatoryGuide5.71）</td>
                    </tr>
                    </tbody>
                </table>
                <p>
                    从美国工控安全标准制定组织和成果可以看出，NIST制定工控安全主要标准，标准可跨行业，并且标准不停的滚动发布。
                    从中可看到标准制定的有效经验，第一步解决有无标准的问题，然后再解决标准高质量与普适性问题。从标准成果还可以看出，
                    美国针对SCADA控制系统的安全标准比较多，主要因为SCADA的安全问题在控制系统中尤为突出。
                    从中体现出美国标准制定以解决突出问题为导向，而不是胡子眉毛一把抓。
                </p>
            </section>
            <section>
                <h3><strong>2. 我国工控安全标准发展</strong></h3>
                <h4><strong>2.1 我国已发布的工控安全标准</strong></h4>

                <p><strong>国家标准</strong></p>
                <ul>
                    <li>GB/T 26333-2010《工业控制网络安全风险评估规范》
                        <p>
                            作为我国工控安全第一个国家标准，解决了我国工控安全标准空白的问题，实现了工控安全标准零的突破。
                            此标准2011年发布实施，从发布时间上可以看出，我国关注工控安全的前辈们的高瞻远瞩。但是此标准并未推行起来，成为了事实上可有可无的标准，
                            成为了工控安全标准界的先烈。究其原因，还是此标准无核心内容（核心内容都是直接引用其它标准），标准过于简单，可操作性低，导致此标准落地困难。
                            建议相关单位对此标准进行修订。
                        </p>
                    </li>
                    <li>GB/T 30976.1-2014《工业控制系统信息安全 第1部分：评估规范》
                        <p>
                            作为我国工控安全第一个有内容的国家标准，解决了我国工控安全无标准可依的窘境。《评估规范》分为管理评估和系统能力（技术）评估。
                            管理评估宜对照风险接受准则和组织机构相关目标，识别、量化并区分风险的优先次序。风险评估的结果宜指导并确定适当的管理措施及其优先级，
                            评估风险和选择控制措施的过程需要执行多次，以覆盖组织机构的不同部门或各个工业控制系统。
                            管理评估分三个级别、系统能力（技术）评估分为四个级别。信息安全等级由系统能力等级和管理等级二维确定。
                        </p>

                        <p>
                            此评估标准实施过程中，还没有一套有效的方法论来指导用户单位确定自己需要的信息安全等级，或者政府未有一套信息安全等级评定的依据。
                            目前阶段只能根据用户单位自己的自发需求来确定信息安全等级，然后根据用户单位确认的等级开展评估活动。
                        </p>
                    </li>
                    <li>GB/T 30976.2-2014《工业控制系统信息安全 第2部分：验收规范》
                        <p>
                            此标准解决了我国工业控制系统信息安全验收上的空白，解决了验收有标准可依的困境。此标准的使用方是工业控制系统用户方，
                            《验收规范》涉及到专业的安全测试，除电力和石油石化等大部分用户方在能力上不足以完成验收阶段的安全测试。
                            因此需要借助第三方的测评力量来验收，就涉及到项目预算增加的问题。因此在做标准宣贯时，需要在立项阶段就考虑验收标准和费用的问题。
                        </p>
                    </li>
                </ul>

                <p><strong>行业标准</strong></p>

                <p class="no-indent">在工控安全领用，电力行业2005年颁布的电监会5号令《电力二次系统安全防护规定》，
                    “安全分区、网络专用、横向隔离、纵向认证”十六字深入人心。其次是石化、核电及烟草行业也有相应标准。</p>
                <ul>
                    <li>电力行业：《电力二次系统安全防护规定》（电监会5号令）
                        <p>我国工控安全的安全意识及优秀实践，起初都是参考电力行业的，电力行业的控制系统安全经验，对我国工控安全经验积累功不可没。
                            《电力二次系统安全防护规定》（电监会5号令）于2014年9月1日废除，同时颁布了《电力监控系统安全防护规定》（发改委14号令）。</p>
                    </li>
                    <li>石化行业：GB/T 50609-2010 《石油化工工厂信息系统设计规范》
                        <p>此设计规范中要求网络之间需要采用安全隔离，2010年颁布的行业标准，算比较早重视工控信息安全的行业。</p>
                    </li>
                    <li>核电行业：GB/T 13284.1-2008 《核电厂安全系统 第1部分 设计准则》</li>
                    <li>核电行业：GB/T 13629-2008 《核电厂安全系统中数字计算机的适用准则》
                        <p>
                            《设计准则》提供了有关核电厂安全设计应遵循的准则。标准中规定了核电厂安全系统动力源、仪表和控制部分最低限度的功能和设计要求，
                            标准适用于为防止或减轻设计基准事件后果、保护公众健康和安全所需要的那些系统。《适用准则》主要针对核电厂安全系统中数字计算机适用性制定的准则。</p>
                    </li>
                    <li>烟草行业：YC/T 494-2014 《烟草工业企业生产网与管理网网络互联安全规范》
                        <p>此标准主要规范烟草工业企业生产网与管理网之间的联网安全问题。</p>
                    </li>
                </ul>
                <h4><strong>2.2 我国在研的工控安全标准</strong></h4>

                <p>我国工业控制系统有如下在研标准：</p>
                <table class="table table-responsive table-stripped table-hover">
                    <thead>
                    <tr>
                        <th>标准类型</th>
                        <th>标准名字</th>
                        <th>归口单位</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td rowspan="4">ICS安全管理标准</td>
                        <td>《信息安全技术 工业控制系统安全管理基本要求》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《信息安全技术 工业控制系统安全检查指南》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>信息安全技术 工业控制系统安全分级指南》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《信息安全技术 工业控制系统安全控制应用指南》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td rowspan="9">ICS产品及系统信息安全标准</td>
                        <td>《集散控制系统（DCS）安全防护要求》</td>
                        <td>TC124</td>
                    </tr>
                    <tr>
                        <td>《集散控制系统（DCS）安全管理要求》</td>
                        <td>TC124</td>
                    </tr>
                    <tr>
                        <td>《集散控制系统（DCS）安全评估指南》</td>
                        <td>TC124</td>
                    </tr>
                    <tr>
                        <td>《集散控制系统（DCS）风险与脆弱性检测要求》</td>
                        <td>TC124</td>
                    </tr>
                    <tr>
                        <td>《可编程逻辑控制器（PLC）系统信息安全要求》</td>
                        <td>TC124</td>
                    </tr>
                    <tr>
                        <td>《信息安全技术 工业控制系统测控终端安全要求》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《工控控制系统产品信息安全通用评估准则》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>工控安全等级保护标准系列</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《信息安全技术 工业控制系统安全防护技术要求和测试评价方法》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>ICS评估标准</td>
                        <td>《工业控制系统风险评估实施指南》</td>
                        <td>TC260</td>
                    </tr>


                    <tr>
                        <td rowspan="5">防护技术要求与测评标准</td>
                        <td>《信息安全技术 工业控制系统网络监测安全技术要求和测试评价方法》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《信息安全技术 工业控制系统漏洞检测技术要求》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《信息安全技术 工业控制网络安全隔离与信息交换系统安全技术要求》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《信息安全技术 工业控制系统网络审计产品安全技术要求》</td>
                        <td>TC260</td>
                    </tr>
                    <tr>
                        <td>《工业控制系统专用防火墙技术要求》</td>
                        <td>TC260</td>
                    </tr>
                    </tbody>
                </table>
                <p class="no-indent">
                    我国目前在研的工控安全标准有19项之多，其中工控安全管理标准4项，工控产品及系统信息安全标准9项，
                    工控安全评估标准1项，工控安全防护及检测技术标准5项。在研标准基本涵盖了行业监管单位、工控产品供应商、
                    工控安全防护产品供应商、工控业主单位及测评机构的标准需求。
                    为了做到工控安全真正有标准可依，需要加快标准研制过程，尽快发布。提供如下加快进度的建议：</p>

                <p class="no-indent">
                    1）工控安全标准需要做到统一归口，不能分散资源。在网信办和工信部的协调与领导下，
                    全国信息安全标准化技术委员会需要继续发挥信息安全标准研制经验优势，加速工业控制系统信息安全标准的研制
                </p>

                <p class="no-indent">
                    2）工控安全标准研制相对复杂，需要加大投入。工控安全标准研制需要工控环境支撑及复合型人才的持续投入。
                    建议政府决策部门给予工控安全标准研制提供更多的支持。
                </p>
            </section>
            <section>
                <h3><strong>3. 工控安全标准现状思考</strong></h3>

                <p class="no-indent">前面介绍了国际、美国和我国工控安全标准，从国外工控安全标准优势方面对比，我们有如下差距：</p>

                <p class="no-indent">
                    1）我国还未发布成熟的工控安全基本标准，比如安全指南、管理指南之类的标准（第一个基本标准《信息安全技术 工业控制系统安全控制应用指南》将于上半年发布）；
                </p>

                <p class="no-indent">
                    2）我国还未有像ISCI这类对工控安全标准符合性检测及授权的组织，从目前我国标准制定来看，中国电子技术标准化研究院、中国信息安全测评中心、国家信息技术安全研究中心比较有优势；
                </p>

                <p class="no-indent">
                    3）我国已发布的几个标准，缺乏标准宣贯的手段，或者没有持续性的进行宣贯。如果长期不宣贯，就会成为可有可无的标准。
                </p>

                <p class="no-indent">
                    国外标准只能借鉴，不能完全照搬。对我国工控安全标准制定提供如下建议：
                </p>

                <p class="no-indent">
                    1）信息安全标准是我国信息安全保障体系的重要组成部分，全国信息安全标准化技术委员会对我国信息安全标准的制定与推广有着举足轻重的作用。工业控制系统信息安全是国家网络安全的重要组成部分，在工控安全国家标准制定中，信安标委需要继续发挥标准制定的主导作用。
                </p>

                <p class="no-indent">
                    2）工控安全标准研制，最好是有信息安全专家、工控专家、行业专家等多领域专家共同参与，才能真实反映既符合网络安全要求又符合工控现场现状。
                </p>

                <p class="no-indent">
                    3）我国在研标准众多，需要储备进行工控安全标准符合性检测及授权的技术能力，进一步推动已发布标准的落地及规模应用；
                </p>

                <p class="no-indent">
                    4）对于已发布的工控安全标准，需要加紧宣贯，谨防成为下一个先烈。
                </p>
            </section>
        </div>
        <div class="col-xs-12 link">
            <span class="pre pull-left"><a href="news/1"><span>上一篇</span>［预警］openssl再爆漏洞了，官方建议禁用SSLv2</a></span>
            <span class="next pull-right"></span>
        </div>
    </div>
</div>
<%@include file="../footer.jsp" %>
<spring:url value="resources/js/libs/jquery-1.11.3.min.js" var="jqJs"/>
<script src="${jqJs}"></script>
<spring:url value="resources/js/libs/bootstrap.min.js" var="bsJs"/>
<script src="${bsJs}"></script>
<script type="text/javascript">
    var basePath = '${basePath}';
    $(function () {
        $('.header a[href]').on('click', function (e) {
            e.preventDefault();
            window.location.href = basePath + $(this).attr('href');
        });
    });
</script>
</body>
</html>
