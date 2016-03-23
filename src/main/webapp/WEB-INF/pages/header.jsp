<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="header navbar navbar-default" role="navigation" id="header">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target=".navbar-collapse"
                            aria-expanded="false">
                        <span class="sr-only">切换导航</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#"><img src="">CASCS</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right" id="menu">
                        <li data-menuanchor="se1"><a href="#se1">首页</a></li>
                        <li data-menuanchor="se2"><a href="#se2">搜索</a></li>
                        <li data-menuanchor="se3"><a href="#se3">定位</a></li>
                        <li data-menuanchor="se4"><a href="#se4">全球视角</a></li>
                        <li data-menuanchor="se5"><a href="#se5">探测</a></li>
                        <li data-menuanchor="se7" role="presentation" class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">
                                统计<span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#se7/se7_offline">离线统计</a></li>
                                <%--<li><a href="#se7/se7_online">在线统计</a></li>--%>
                            </ul>
                        </li>
                        <li data-menuanchor="se8" role="presentation" class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">
                                资讯<span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#se8/se8_security">安全动态</a></li>
                                <%--<li><a href="#se8/se8_info">新闻资讯</a></li>--%>
                            </ul>
                        </li>
                        <li data-menuanchor="se9"><a href="#se9">实例</a></li>
                        <li data-menuanchor="se11"><a href="#se11">工控</a></li>
                        <%--<li data-menuanchor="se10"><a href="#se10">看世界</a></li>--%>
                        <li data-menuanchor="se6">
                            <a href="#se6" id="loginNav">登录</a>
                            <a href="#" id="logout"><span></span> | 退出</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
