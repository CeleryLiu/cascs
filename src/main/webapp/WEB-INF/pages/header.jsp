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
                    <a class="navbar-brand" href="#"><img src="">LOGO</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right" id="menu">
                        <li data-menuanchor="se0"><a href="#se0">首页</a></li>
                        <li data-menuanchor="se1"><a href="#se1">搜索</a></li>
                        <li data-menuanchor="se2"><a href="#se2">定位</a></li>
                        <li data-menuanchor="se3"><a href="#se3">全球视觉</a></li>
                        <li data-menuanchor="se4"><a href="#se4">数据探测</a></li>
                        <%--<li><a href="resources/search_result_display/autoplay.html">数据分析</a></li>--%>
                        <li data-menuanchor="se5">
                            <a href="#se5/sl0">登录</a>
                            <a href="#" id="logout"><span></span> 退出</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<%--占一行的一个大的搜索框--%>
<div class="global-search-wrapper" id="global-search" style="display: none;">
    <form class="global-search-form" method="get" action="api/search">
        <fieldset>
            <div class="search-scope"></div>
            <div class="search-box-container">
                <input class="global-search-input typeahead" type="text" placeholder="Search Here"
                       id="global_search_input">
            </div>
            <button type="submit" class="global-search-button btn btn-primary" role="button">
                <span class="glyphicon glyphicon-search"></span>
            </button>
        </fieldset>
        <div class="advs-link-wrapper"><a href="#" class="advs-link">精确搜索</a></div>
    </form>
</div>
