<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="sidebar col-lg-2 col-md-3 col-sm-3 hidden-xs" id="sidebar">
    <div class="panel-group" id="facet" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="countryTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#countryList" aria-expanded="false" aria-controls="countryList">
                        国家
                        <span class="fa fa-chevron-right"></span>
                        <%--<span class="glyphicon glyphicon-menu-down pull-right"></span>--%>
                    </a>
                </h4>
            </div>
            <div id="countryList" class="panel-collapse collapse" role="tabpanel" aria-labelledby="countryTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="device_serviceTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#device_serviceList" aria-expanded="false" aria-controls="device_serviceList">
                        服务
                        <span class="fa fa-chevron-right"></span>
                        <%--<span class="glyphicon glyphicon-menu-down pull-right"></span>--%>
                    </a>
                </h4>
            </div>
            <div id="device_serviceList" class="panel-collapse collapse" role="tabpanel"
                 aria-labelledby="device_serviceTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="portTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#portList" aria-expanded="false" aria-controls="portList">
                        端口
                        <span class="fa fa-chevron-right"></span>
                        <%--<span class="glyphicon glyphicon-menu-down pull-right"></span>--%>
                    </a>
                </h4>
            </div>
            <div id="portList" class="panel-collapse collapse" role="tabpanel" aria-labelledby="portTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="device_typeTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#device_typeList" aria-expanded="false" aria-controls="device_typeList">
                        类型
                        <span class="fa fa-chevron-right"></span>
                        <%--<span class="glyphicon glyphicon-menu-down pull-right"></span>--%>
                    </a>
                </h4>
            </div>
            <div id="device_typeList" class="panel-collapse collapse" role="tabpanel"
                 aria-labelledby="device_typeTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="vulTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#vulList" aria-expanded="false" aria-controls="vulList">
                        漏洞
                        <span class="fa fa-chevron-right"></span>
                        <%--<span class="glyphicon glyphicon-menu-down pull-right"></span>--%>
                    </a>
                </h4>
            </div>
            <div id="vulList" class="panel-collapse collapse" role="tabpanel" aria-labelledby="vulTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="osTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#osList" aria-expanded="false" aria-controls="osList">
                        操作系统
                        <span class="fa fa-chevron-right"></span>
                        <%--<span class="glyphicon glyphicon-menu-down pull-right"></span>--%>
                    </a>
                </h4>
            </div>
            <div id="osList" class="panel-collapse collapse" role="tabpanel" aria-labelledby="osTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="search_tips" class="col-lg-2 col-md-3 col-sm-3 hidden-xs sidebar-right">
    <section id="widget-search-history">
        <h4 class="orange">搜索历史</h4>

        <div class="search-widget" id="search_history">
            <ul class="list-inline search-history-list"></ul>
        </div>
    </section>
    <section id="widget-popular-search">
        <h4 class="orange">热门搜索</h4>

        <div class="search-widget">
            <ul class="list-inline popular-search-list"></ul>
        </div>
    </section>
    <section id="widget-sys-rec">
        <h4 class="orange">系统推荐</h4>

        <div class="search-widget">
            <ul class="list-inline sys-rec">
                <li>
                    <span class="search-item" data-search-keyword="Camera Hikvision" data-option="0"
                          title="Camera Hikvision">Camera Hikvision</span>
                </li>
                <li>
                    <span class="search-item" data-search-keyword="ASUS RT-N66W FTP" data-option="0"
                          title="ASUS RT-N66W FTP">ASUS RT-N66W FTP</span>
                </li>
                <li><span class="search-item" data-search-keyword="Server: Siemens Switzerland Ltd" data-option="0"
                          title="Server: Siemens Switzerland Ltd">Server: Siemens Switzerland Ltd</span>
                </li>
                <li>
                    <span class="search-item" data-search-keyword="HP Officejet Pro 8500 A910 printer http config"
                          data-option="0"
                          title="HP Officejet Pro 8500 A910 printer http config">HP Officejet Pro 8500 A910 printer http
                    config</span>
                </li>
            </ul>
        </div>
    </section>
</div>
