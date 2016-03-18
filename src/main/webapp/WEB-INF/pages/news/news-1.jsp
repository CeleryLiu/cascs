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
    <title>安全动态—openssl再爆漏洞了，官方建议禁用SSLv</title>
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
            <h2>［预警］openssl再爆漏洞了，官方建议禁用SSLv2</h2>

            <div class="article-msg">
                <span class="time">2016-03-02 </span>
                <span class="orig">来源：<a href="" target="_blank">360网络攻防实验室</a></span>
            </div>
            <hr size="1">
            <h3><b>CVE-2016-0703</b></h3>

            <section>
                <h3><strong>1. Drown漏洞是什么?</strong></h3>

                <p>DROWN出了一个严重的漏洞影响HTTPS和其他依赖SSL和TLS的服务,SSL和TLS协议保证用户上网冲浪,购物,即时通信而不被第三方读取到。</p>

                <p>DROWN允许攻击者破坏这个加密体系,读取或偷取敏感通信,包括密码,信用卡帐号,商业机密,金融数据等。经过我们的探测识别,大概有33%的HTTPS服务容易受此漏洞的影响。</p>
            </section>
            <section>
                <h3><strong>2. 我的站点受到影响吗?</strong></h3>

                <p>现在流行的服务器和客户端使用TLS加密,然而,由于错误配置,许多服务器仍然支持SSLv2,这是一种古老的协议,实践中许多客户端已经不支持使用SSLv2。</p>

                <p>DROWN攻击威胁到还在支持SSLv2的服务端和客户端,他允许攻击者通过发送probe到支持SSLv2的使用相同密钥的服务端和客户端解密TLS通信。</p>

                <p class="with-img"><a href="resources/img/news/news-1-1.jpg" target="_blank">
                    <img src="resources/img/news/news-1-1.jpg" title="news-1-1.jpg" alt="news-1-1.jpg">
                </a></p>

                <p>允许SSLv2连接,比想象中的要常见,由于错误配置和不当的默认配置,我们调查17%的HTTPS服务器一直支持SSLV2连接</p>

                <p>私钥被使用于其他支持SSLv2连接的服务,许多公司不允许使用相同的证书和私钥在他的WEB和EMAI服务,例如,下面这个案例,如果email服务支持sslv2,
                    但是web服务不支持,攻击者能够利用EMAIL服务的sslv2漏洞切断到web服务器的tls的连接。
                </p>

                <p class="with-img"><a href="resources/img/news/news-1-2.jpg" target="_blank">
                    <img src="resources/img/news/news-1-2.jpg" title="news-1-2.jpg" alt="news-1-2.jpg">
                </a></p>

                <p>这个漏洞危害有多大？</p>

                <p class="with-img"><a href="resources/img/news/news-1-3.png" target="_blank">
                    <img src="resources/img/news/news-1-3.png" title="news-1-3.png" alt="news-1-3.png">
                </a></p>

                <p>可以通过
                    <a href="https://test.drownattack.com/?site=你的站点">
                        https://test.drownattack.com/?site=你的站点来查看是否受影响</a>
                </p>

                <p class="with-img"><a href="resources/img/news/news-1-4.png" target="_blank">
                    <img src="resources/img/news/news-1-4.png" title="news-1-4.png" alt="news-1-4.png">
                </a></p>

                <div>
                    <p class="light-blue title">360网络攻防实验室的扫描数据统计如下：</p>

                    <div>
                        <ol>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+country%3A%22CN%22"
                                   class="name" title="CN">China</a>
                                <span class="count">109,725</span>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <p><strong class="blue">TOP CITIES</strong></p>
                        <ol>
                            <li>
                                <a class="name"
                                   href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+city%3A%22Guangzhou%22"
                                   title="Guangzhou">Guangzhou</a>
                                <span class="count">22,125</span>
                            </li>
                            <li>
                                <a class="name"
                                   href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+city%3A%22Nanjing%22"
                                   title="Nanjing">Nanjing</a>
                                <span class="count">14,491</span>
                            </li>
                            <li>
                                <a class="name"
                                   href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+city%3A%22Beijing%22"
                                   title="Beijing">Beijing</a><span class="count">9,863</span>
                            </li>
                            <li>
                                <a class="name"
                                   href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+city%3A%22Shanghai%22"
                                   title="Shanghai">Shanghai</a><span class="count">7,439</span>
                            </li>
                            <li>
                                <a class="name"
                                   href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+city%3A%22Hangzhou%22"
                                   title="Hangzhou">Hangzhou</a><span class="count">7,354</span>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <p><strong class="blue">TOP SERVICES</strong></p>
                        <ol>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+port%3A%22443%22"
                                   class="name" title="443">HTTPS</a>
                                <span class="count">98,107</span>
                            </li>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+port%3A%228443%22"
                                   title="8443" class="name">HTTPS(8443)</a>
                                <span class="count">7,105</span>
                            </li>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+port%3A%22995%22"
                                   title="995" class="name">POP3 + SSL</a>
                                <span class="count">1,536</span>
                            </li>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+port%3A%22993%22"
                                   title="993" class="name">IMAP + SSL</a>
                                <span class="count">1,336</span>
                            </li>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3Acn+port%3A%22465%22"
                                   title="465" class="name">SMTP + SSL</a>
                                <span class="count">1,231</span>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <p><strong>TOP COUNTRIES</strong></p>
                        <ol>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3A%22US%22"
                                   title="US" class="name">United States</a>
                                <span class="count">1,488,624</span>
                            </li>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3A%22IT%22"
                                   title="IT" class="name">Italy</a>
                                <span class="count">478,452</span>
                            </li>

                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3A%22PL%22"
                                   title="PL" class="name">Poland</a>
                                <span class="count">303,657</span>
                            </li>

                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3A%22DE%22"
                                   title="DE" class="name">Germany</a>
                                <span class="count">188,657</span>
                            </li>

                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+country%3A%22GB%22"
                                   title="GB" class="name">United Kingdom</a>
                                <span class="count">171,379</span>
                            </li>
                        </ol>
                    </div>
                    <div>
                        <p><strong>TOP SERVICES</strong></p>
                        <ol>
                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+port%3A%22443%22"
                                   title="443" class="name">HTTPS</a>
                                <span class="count">3,576,876</span>
                            </li>

                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+port%3A%228443%22"
                                   title="8443" class="name">HTTPS (8443)</a>
                                <span class="count">213,439</span>
                            </li>

                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+port%3A%22995%22"
                                   title="995" class="name">POP3 + SSL</a>
                                <span class="count">153,069</span>
                            </li>

                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+port%3A%22993%22"
                                   title="993" class="name">IMAP + SSL</a>
                                <span class="count">144,410</span>
                            </li>

                            <li>
                                <a href="https://www.shodan.io/search?query=ssl.version%3Asslv2+port%3A%22465%22"
                                   title="465" class="name">SMTP + SSL</a>
                                <span class="count">51,585</span>
                            </li>
                        </ol>
                    </div>

                </div>
            </section>
            <section>
                <h3><strong>3. 怎么保护我自己?</strong></h3>

                <p>确保你的私钥不适用于其他的支持sslv2服务,包括web,smtp,imap,pop服务等。禁止服务器端的sslv2支持。如果是Openssl,可以参考安装最新的补丁和操作辅导。
                    <a href="https://www.openssl.org/blog/blog/2016/03/01/an-openssl-users-guide-to-drown/">https://www.openssl.org/blog/blog/2016/03/01/an-openssl-users-guide-to-drown/</a>
                </p>

                <p>Microsoft IIS (Windows Server):iis 7和以上的版本默认已经禁止了sslv2。</p>

                <p>详细的漏洞描述原理报告
                    <a href="https://drownattack.com/drown-attack-paper.pdf">https://drownattack.com/drown-attack-paper.pdf</a>
                </p>
            </section>
            <section>
                <h3><strong>4. 影响</strong></h3>

                <p>
                    <strong>oponssl安全公告：
                        <a href="http://bobao.360.cn/learning/detail/2771.html" target="_blank">http://bobao.360.cn/learning/detail/2771.html</a>
                    </strong>
                </p>

                <p><b>大部分支持SSLv2的服务器均会受到该漏洞影响！</b></p>

                <p><b>稍后360安全技术团队会对此进行技术分析，360安全播报会持续跟进这个事件,大家请保持关注。</b></p>
            </section>
            <section>
                <b>SSV2协议查询:</b>
                <a _src="http://bobao.360.cn/tools/index" href="http://bobao.360.cn/tools/index">http://bobao.360.cn/tools/index</a>
            </section>
        </div>
        <div class="col-xs-12 link">
            <span class="pre pull-left"></span>
            <span class="next pull-right">
                <a href="news/2"><span>下一篇</span>工控安全标准发展现状与思考</a>
            </span>
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
