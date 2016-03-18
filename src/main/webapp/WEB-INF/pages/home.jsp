<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head></head>
<body>
<div class="home-wrapper">
--%>
<%--<div class="home-search">
    <form class="home-search-form" id="home_search_form">
        <div class="input-group search-box-container">
            <input type="text" id="hsi"
                   class="form-control typeahead home-search-input"
                   role="combobox"
                   placeholder="webcam">
            <button type="submit" class="btn btn-primary" id="home_search_btn">搜索一下
            </button>
        </div>
        <div class="advs-link-wrapper">
            <a href="#" class="advs-link" id="advanced-search">精确搜索</a>
        </div>
    </form>
</div>--%>
<div class="index-wrapper center-block">
    <div class="logo center-block">
        <h1><a href="/" title="首页"><img src="">LOGO</a></h1>
    </div>
    <div class="home-search">
        <form class="home-search-form" id="home_search_form">
            <div class="input-group search-box-container">
                <input type="text" id="hsi"
                       class="form-control typeahead home-search-input"
                       role="combobox"
                       placeholder="webcam">
                <button type="submit" class="btn btn-primary" id="home_search_btn">搜索一下
                </button>
            </div>
            <div class="advs-link-wrapper">
                <a href="#" class="advs-link" id="advanced-search">高级搜索</a>
            </div>
        </form>
    </div>
    <div class="hidden-xs search-tips">
        <div class="block">
            <h4>热门搜索</h4>

            <ul class="list-inline popular-search-list"></ul>
        </div>
        <div class="block">
            <h4>系统推荐</h4>
            <ul class="list-inline sys-rec">
                <li>
                    <span class="search-item" data-search-keyword="Camera Hikvision" data-option="0"
                          title="Camera Hikvision">Camera Hikvision</span>
                </li>
                <li>
                    <span class="search-item" data-search-keyword="ASUS RT-N66W FTP" data-option="0"
                          title="ASUS RT-N66W FTP">ASUS RT-N66W FTP</span>
                </li>
                <li><span class="search-item" data-search-keyword="Siemens Switzerland Ltd" data-option="0"
                          title="Siemens Switzerland Ltd">Siemens Switzerland Ltd</span>
                </li>
                <li>
                    <span class="search-item" data-search-keyword="HP Officejet Pro 8500 A910 printer http config"
                          data-option="0"
                          title="HP Officejet Pro 8500 A910 printer http config">HP Officejet Pro 8500 A910 printer http
                    config</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="latest-news hidden-xs">
        <div class="block">
            <h4><a href="news-security" target="_blank">安全动态</a></h4>
            <ul>
                <li>
                    <a href="news/1" target="_blank"
                       title="openssl再爆漏洞了，官方建议禁用SSLv2">openssl再爆漏洞了，官方建议禁用SSLv2</a>

                    <time>2016-03-02</time>
                </li>

                <li>
                    <a href="news/2" target="_blank"
                       title="工业控制信息安全资源汇总（国内篇）">工业控制信息安全资源汇总（国内篇）</a>

                    <time>2016-03-09</time>
                </li>
            </ul>
        </div>
        <div class="block">
            <h4><a href="news" target="_blank">资讯</a></h4>
            <ul>
                <li>
                    <a href="newsshow?id=18083911" target="_blank" title="资讯1ssssssssss">资讯1ssssssssss</a>
                    <time>2016-03-09</time>
                </li>
                <li>
                    <a href="newsshow?id=77226480" target="_blank" title="资讯2">资讯2</a>
                    <time>2016-03-07</time>
                </li>
                <li>
                    <a href="newsshow?id=79206819" target="_blank" title="资讯3）">资讯3</a>
                    <time>2016-03-07</time>
                </li>
            </ul>
        </div>
    </div>
</div>


<%--
</div>
<script src="resources/js/homepage.js"></script>
</body>
</html>--%>
