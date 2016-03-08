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
<div class="home-search">
    <form class="home-search-form" id="home_search_form">
        <div class="input-group search-box-container">
            <input type="text" id="hsi"
                   class="form-control typeahead home-search-input"
                   role="combobox"
                   placeholder="Search...">
            <button type="submit" class="btn btn-primary" id="home_search_btn">搜索一下
            </button>
        </div>
        <div class="advs-link-wrapper">
            <a href="#" class="advs-link" id="advanced-search">精确搜索</a>
        </div>
    </form>
</div>

<%--
</div>
<script src="resources/js/homepage.js"></script>
</body>
</html>--%>
