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
    <title>用户帮助</title>
    <spring:url value="resources/css/bootstrap.min.css" var="bsCss"/>
    <link rel="stylesheet" href="${bsCss}">
    <spring:url value="resources/css/base.minus.css" var="manualCss"/>
    <link rel="stylesheet" href="${manualCss}">
</head>
<body data-spy="scroll" data-target="#myScrollspy">
<%@include file="header.jsp" %>
<div class="container">
    <div class="row">
        <div class="col-xs-3" id="myScrollspy">
            <ul class="nav nav-tabs nav-stacked" id="myNav">
                <li class="active"><a href="#manual">用户手册</a></li>
                <li><a href="#api">API参考</a></li>
                <li><a href="#data">数据格式</a></li>
                <li><a href="#update">更新记录</a></li>
            </ul>
        </div>
        <div class="col-xs-9">
            <section id="manual">
                <div class="page-header">
                    <h1>用户手册</h1>
                </div>
                <section id="section_1">
                    <h4 class="blue">基于关键词的搜索</h4>

                    <p>通过关键词搜索，如输入任意关键词： emweb，可以搜索包含该关键词的信息。</p>
                </section>
                <section id="section_2">
                    <h4>搜索设备</h4>

                    <p>搜索工业控制设备，如 海康摄像头，查询关键字为：camera hikvision</p>
                </section>
                <section id="section_3">
                    <h4>基于地区范围索</h4>

                    <p>搜索中国所有设备：country:中国 ，将搜索中国所有相关设备。</p>

                    <p>搜索北京市内所有设备：country:中国 city:北京 ，将搜索北京市所有相关设备。</p>
                </section>
                <section id="section_4">
                    <h4>基于特征值的搜索</h4>

                    <p>通过输入系统特征，可搜索相应的设备信息，如：</p>
                    <ul>
                        <li>操作系统如：os:linux</li>
                        <li>开放的端口：port:80</li>
                        <li>提供的服务：service:http</li>
                        <li>发现的漏洞：vul:缓冲区溢出</li>
                    </ul>
                </section>
                <section id="section_5">
                    <h4>复杂搜索</h4>

                    <p>在输入框中，可以输入组合关键词，构造复杂搜索，多个关键词用空格分隔。如：ASUS RT-N66W FTP</p>
                </section>
                <section id="section_6">
                    <h4>基于属性名搜索</h4>

                    <p>在输入框中，可以输入要搜索关键词对应的完整属性名来搜索，属性名格式为<em>一级属性.二级属性....</em>，具体参考<a href="#data">属性说明</a>的相关说明。
                        如：description.port_info.device_brand:hikvison，搜索品牌为海康威视的所有设备。</p>
                </section>
                <section id="section_7">
                    <h4>高级搜索</h4>
                    在页面点击<b>高级搜索</b>按钮，使用系统的高级搜索功能，根据提示在输入框中输入对应的关键词，即可按照所有输入条件来搜索。
                </section>
            </section>
            <section id="api">
                <div class="page-header">
                    <h1>API参考</h1>
                </div>
                <p>请参考<a href="http://10.10.2.22/nishun/api_wiki/blob/master/DeviceScanningProject/api.md">API文档</a></p>
            </section>
            <section id="data">
                <div class="page-header">
                    <h1>属性说明</h1>
                </div>
                <h3>description</h3>
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>属性名</th>
                        <th>数据类型</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>ip</td>
                        <td>ipv4地址类型</td>
                        <td>设备网络地址</td>
                        <td>12.28.50.125</td>
                    </tr>
                    <tr>
                        <td>device_category</td>
                        <td>Array(String)</td>
                        <td>
                            设备类型。数组元素当前可选值：<br>
                            monitor、industry_control、security_matter、network_device，<br>
                            分别对应：<br>
                            监控设备、工控设备、涉密设备、网络设备。
                        </td>
                        <td>["monitor","industry_control"]</td>
                    </tr>
                    <tr>
                        <td>app_type</td>
                        <td>String</td>
                        <td>任务类型</td>
                        <td>device_scan</td>
                    </tr>
                    <tr>
                        <td>device_location</td>
                        <td>JSONObject，复合结构</td>
                        <td>设备地理位置信息</td>
                        <td>参见<a href="#device_location">device_location</a></td>
                    </tr>
                    <tr>
                        <td>port_info</td>
                        <td>JSONArray，复合结构</td>
                        <td>设备开放的端口信息</td>
                        <td>参见<a href="#port_info">port_info</a></td>
                    </tr>
                    <tr>
                        <td>os_info</td>
                        <td>JSONObject，复合结构</td>
                        <td>设备操作系统信息</td>
                        <td>参见<a href="#os_info">os_info</a></td>
                    </tr>
                    <tr>
                        <td>vul_info</td>
                        <td>JSONArray，复合结构</td>
                        <td>设备漏洞信息</td>
                        <td>参见<a href="#vul_info">vul_info</a></td>
                    </tr>
                    </tbody>
                </table>
                <h3 id="device_location">description.device_location</h3>

                <p>说明：description.port_info.vps_location和description.vul_info.vps_location的结构与此一致。</p>
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>属性名</th>
                        <th>数据类型</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>address</td>
                        <td>String</td>
                        <td>设备注册地址</td>
                        <td>白云路007号</td>
                    </tr>
                    <tr>
                        <td>city</td>
                        <td>String</td>
                        <td>设备所在城市</td>
                        <td>Beijing</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td>String</td>
                        <td>设备所在国家对应的国家代码</td>
                        <td>CN</td>
                    </tr>
                    <tr>
                        <td>country</td>
                        <td>String</td>
                        <td>设备所在国家</td>
                        <td>China</td>
                    </tr>
                    <tr>
                        <td>lat</td>
                        <td>double</td>
                        <td>设备所在位置的经度</td>
                        <td>23.1167</td>
                    </tr>
                    <tr>
                        <td>lon</td>
                        <td>double</td>
                        <td>设备所在位置的纬度</td>
                        <td>113.25</td>
                    </tr>
                    <tr>
                        <td>province</td>
                        <td>String</td>
                        <td>设备所在省份</td>
                        <td>Guangdong</td>
                    </tr>
                    <tr>
                        <td>zh_City</td>
                        <td>String</td>
                        <td>设备所在城市中文的中文名</td>
                        <td>北京</td>
                    </tr>
                    <tr>
                        <td>zh_CN</td>
                        <td>String</td>
                        <td>设备所在国家的中文名</td>
                        <td>中国</td>
                    </tr>
                    <tr>
                        <td>zh_Pro</td>
                        <td>String</td>
                        <td>设备所在省份的中文名</td>
                        <td>广东</td>
                    </tr>
                    </tbody>
                </table>
                <h3 id="port_info">description.port_info</h3>

                <p>以下为port_info数组中一个元素的属性说明。</p>
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>属性名</th>
                        <th>数据类型</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>taskId</td>
                        <td>String</td>
                        <td>搜索任务id</td>
                        <td>DS001</td>
                    </tr>
                    <tr>
                        <td>userId</td>
                        <td>String</td>
                        <td>执行搜索的用户id</td>
                        <td>12161</td>
                    </tr>
                    <tr>
                        <td>userName</td>
                        <td>String</td>
                        <td>执行搜索的用户名</td>
                        <td>user1</td>
                    </tr>
                    <tr>
                        <td>priLevel</td>
                        <td>int</td>
                        <td>搜索任务等级，可取值从1到5。</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td id="port">port</td>
                        <td>int</td>
                        <td>设备端口号</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>protocol</td>
                        <td>String</td>
                        <td>端口对应的协议</td>
                        <td>http</td>
                    </tr>
                    <tr>
                        <td>banner</td>
                        <td>String</td>
                        <td>探测该端口时候返回的标语信息</td>
                        <td>
<pre>
HTTP/1.1 200 OK
Server: nginx/1.1.19
Date: Sat, 03 Oct 2015 06:09:24 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 6466
Connection: keep-alive</pre>
                        </td>
                    </tr>
                    <tr>
                        <td>url</td>
                        <td>String</td>
                        <td>特殊的url</td>
                        <td>config/ch_passwd.cgi</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td>int</td>
                        <td>响应状态吗</td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td>timestamp_sent</td>
                        <td>long</td>
                        <td>探测包发送的时间,1970年1月1日以来经过的毫秒</td>
                        <td>6981000244535</td>
                    </tr>
                    <tr>
                        <td>timestamp_received</td>
                        <td>long</td>
                        <td>接收到响应的时间, 1970年1月1日以来经过的毫秒</td>
                        <td>6981000285620</td>
                    </tr>
                    <tr>
                        <td>device_type</td>
                        <td>String</td>
                        <td>设备类型</td>
                        <td>Camera</td>
                    </tr>
                    <tr>
                        <td>device_brand</td>
                        <td>String</td>
                        <td>设备品牌</td>
                        <td>Hikvision</td>
                    </tr>
                    <tr>
                        <td>device_service</td>
                        <td>String</td>
                        <td><a href="#port">端口</a>所允运行的服务</td>
                        <td>http</td>
                    </tr>
                    <tr>
                        <td>device_model</td>
                        <td>设备型号</td>
                        <td>搜索任务id</td>
                        <td>Hikvision DS-7204</td>
                    </tr>
                    <tr>
                        <td>vps_name</td>
                        <td>String</td>
                        <td>执行探测任务的vps的名字</td>
                        <td>日本早稻田大学vps</td>
                    </tr>
                    <tr>
                        <td>vps_ip_internal</td>
                        <td>ipv4地址</td>
                        <td>执行探测任务的vps内网地址</td>
                        <td>10.10.2.172</td>
                    </tr>
                    <tr>
                        <td>vps_ip_external</td>
                        <td>String</td>
                        <td>执行探测任务的vps公网地址</td>
                        <td>125.0.15.89</td>
                    </tr>
                    <tr>
                        <td>vps_location</td>
                        <td>String</td>
                        <td>执行探测任务的vps的地址</td>
                        <td>参考<a href="#device_location">device_location</a></td>
                    </tr>
                    </tbody>
                </table>
                <h3 id="os_info">description.os_info</h3>
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>属性名</th>
                        <th>数据类型</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>os</td>
                        <td>String</td>
                        <td>设备上运行的操作系统</td>
                        <td>Embedded Linux</td>
                    </tr>
                    <tr>
                        <td>fireware</td>
                        <td>String</td>
                        <td>设备固件信息</td>
                        <td>fireware 4.30</td>
                    </tr>
                    </tbody>
                </table>
                <h3 id="vul_info">description.vul_info</h3>

                <p>以下为port_info数组中一个元素的属性说明。</p>
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>属性名</th>
                        <th>数据类型</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>taskId</td>
                        <td>String</td>
                        <td>搜索任务id</td>
                        <td>DS001</td>
                    </tr>
                    <tr>
                        <td>userId</td>
                        <td>String</td>
                        <td>执行搜索的用户id</td>
                        <td>12161</td>
                    </tr>
                    <tr>
                        <td>userName</td>
                        <td>String</td>
                        <td>执行搜索的用户名</td>
                        <td>user1</td>
                    </tr>
                    <tr>
                        <td>priLevel</td>
                        <td>int</td>
                        <td>搜索任务等级，可取值从1到5。</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>vul_name</td>
                        <td>String</td>
                        <td>漏洞名称</td>
                        <td>缓冲区溢出漏洞</td>
                    </tr>
                    <tr>
                        <td>vps_name</td>
                        <td>String</td>
                        <td>执行探测任务的vps的名字</td>
                        <td>日本早稻田大学vps</td>
                    </tr>
                    <tr>
                        <td>vps_ip_internal</td>
                        <td>ipv4地址</td>
                        <td>执行探测任务的vps内网地址</td>
                        <td>10.10.2.172</td>
                    </tr>
                    <tr>
                        <td>vps_ip_external</td>
                        <td>String</td>
                        <td>执行探测任务的vps公网地址</td>
                        <td>125.0.15.89</td>
                    </tr>
                    <tr>
                        <td>vps_location</td>
                        <td>String</td>
                        <td>执行探测任务的vps的地址</td>
                        <td>参考<a href="#device_location">device_location</a></td>
                    </tr>
                    <tr>
                        <td>POC_ID</td>
                        <td>String</td>
                        <td>IIE poc ID</td>
                        <td>IIE-POC-2015-1022.py</td>
                    </tr>
                    <tr>
                        <td>vul_ID</td>
                        <td>JSONObject</td>
                        <td>常见漏洞库中该漏洞ID集合</td>
                        <td>参见<a href="#vul_ID">vul_ID</a></td>
                    </tr>
                    <tr>
                        <td>risk_level</td>
                        <td>String</td>
                        <td>风险等级</td>
                        <td>高危</td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td>String</td>
                        <td>漏洞描述信息</td>
                        <td>Hikvision DVR DS-7204中存在缓冲区溢出漏洞，<br>
                            该漏洞源于程序没有对用户提交的输入执行充分的边界检查……
                        </td>
                    </tr>
                    <tr>
                        <td>vul_type</td>
                        <td>String</td>
                        <td>漏洞类型</td>
                        <td>weak_password</td>
                    </tr>


                    <tr>
                        <td>data</td>
                        <td>JSONObject String</td>
                        <td>通过漏洞验证获取的数据</td>
                        <td>
<pre>
{
     "DBInfo" :   {
        "Username": "xxx",
        "Password": "xxx",
        "Salt": "xxx" ,
        "Uid":"xxx" ,
        "Groupid":"xxx"
     },
    "ShellInfo": {
        "URL": "xxx",
        "Content": "xxx"
     },
    "FileInfo":  {
        "Filename":"xxx",
        "Content":"xxx"
     },
    "XSSInfo":   {
        "URL":"xxx",
        "Payload":"xxx"
     },
    "AdminInfo": {
        "Uid":"xxx" ,
        "Username":"xxx" ,
        "Password":"xxx"
     },
    "Database":  {
        "Hostname":"xxx",
        "Username":"xxx",
        "Password":"xxx",
        "DBname":"xxx"
     },
    "VerifyInfo":{
        "URL": "xxx" ,
        "Postdata":"xxx" ,
        "Path":"xxx"
     },
    "SiteAttr":  {
        "Process":"xxx"
     }
}
 </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>service</td>
                        <td>-</td>
                        <td>预留</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>get_picture</td>
                        <td>String</td>
                        <td>通过漏洞验证获取的图片uri</td>
                        <td>/tmp/20151022/2.jpg</td>
                    </tr>
                    <tr>
                        <td>vul_type</td>
                        <td>String</td>
                        <td>漏洞类型</td>
                        <td>weak_password</td>
                    </tr>
                    <tr>
                        <td>get_control</td>
                        <td>String</td>
                        <td>通过漏洞能获取的控制权限</td>
                        <td>root</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>-</td>
                        <td>预留</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>platform</td>
                        <td>String</td>
                        <td>漏洞出现的平台</td>
                        <td>Emedded Linux</td>
                    </tr>
                    <tr>
                        <td>version</td>
                        <td>-</td>
                        <td>预留</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>source</td>
                        <td>String</td>
                        <td>漏洞信息来源</td>
                        <td>CVE</td>
                    </tr>
                    <tr>
                        <td>patch</td>
                        <td>Boolean</td>
                        <td>漏洞是否有补丁</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>device_permit</td>
                        <td>String</td>
                        <td>设备控制权限</td>
                        <td>controllable</td>
                    </tr>
                    <tr>
                        <td>timestamp_update</td>
                        <td>long</td>
                        <td>漏洞更新时间</td>
                        <td>9554611235</td>
                    </tr>
                    </tbody>
                </table>
                <h3 id="vul_ID">description.vul_info.vul_ID</h3>
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>属性名</th>
                        <th>数据类型</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>IIE</td>
                        <td>String</td>
                        <td>IIE 内部使用ID</td>
                        <td>IIE-POC-2015-1022</td>
                    </tr>
                    <tr>
                        <td>Bugtrag</td>
                        <td>String</td>
                        <td>Bugtraq ID</td>
                        <td>61646</td>
                    </tr>
                    <tr>
                        <td>CVE</td>
                        <td>String</td>
                        <td>CVE 漏洞库 ID</td>
                        <td>CVE-2013-4976</td>
                    </tr>
                    <tr>
                        <td>CNVD</td>
                        <td>String</td>
                        <td>CNVD 漏洞库ID</td>
                        <td>CNVD-2013-11931</td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section id="update">
                <div class="page-header">
                    <h1>更新记录</h1>
                </div>
                <p>未上线</p>
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