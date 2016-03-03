/*
 * Created by lyp on 2016/2/25.
 * Author: lyp
 * Date: 2016/2/25
 * Description: 用于保存常量
 * Version: V1.0 
 */
var Constant = {
    //for fullPage.js
    SECTION_NAV_TOOLTIPS: (function () {
        return ['首页', '搜索', '定位', '展示', '探测', '用户']
    }()),
    SECTIONS_BG_COLOR: (function () {
        return ['transparent', 'transparent', 'transparent'];
    }()),
    FIXED_ELEMENTS: (function () {
        return '#header, #footer, #sidebar,#global_search_wrapper, #pivots_wrapper, #result-overview';
    }()),
    SLIDE_NAV_TOOLTIPS: (function () {
        return ['备用']
    }()),
    NO_SEARCH_SECTION_IDX: (function () {
        return [1, 4, 5, 6]
    }()),

    //↓urls
    LIST_SEARCH_URL: (function () {
        return 'search/list';
    }()),
    USER_REGISTER_URL: (function () {
        return 'user/register';
    }()),
    USER_LOGIN_URL: (function () {
        return 'user/login';
    }()),
    USER_PWD_RETRIEVE_URL: (function () {
        return 'http://10.10.2.174:8080/wum/login/forgetpwd.json';
    }()),
    SUGGEST_URL: (function () {
        return 'search/getSuggestions?search='
    }()),
    LOCAL_SUGGEST_URL: (function () {
        return 'resources/data/suggestions.json';
    }()),

    //others
    HIDE_SHOW_SPEED: (function () {
        return 500;
    }())
};
