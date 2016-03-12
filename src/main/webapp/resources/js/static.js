/*
 * Created by lyp on 2016/2/25.
 * Author: lyp
 * Date: 2016/2/25
 * Description: 用于保存常量
 * Version: V1.0 
 */
var Constant = {
    //↓fullPage.js
    SECTION_NAV_TOOLTIPS: (function () {
        return ['首页', '搜索', '定位', '展示', '探测', '用户']
    }()),
    SECTIONS_BG_COLOR: (function () {
        return ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'];
    }()),
    FIXED_ELEMENTS: (function () {
        return '#header, #footer, #sidebar,#header2, #global_search_wrapper, #tool_wrapper, #advs_wrapper, #search_tips';
    }()),
    SLIDE_NAV_TOOLTIPS: (function () {
        return ['备用']
    }()),
    NO_SEARCH_SECTION_IDX: (function () {
        return [0, 1, 4, 5, 6]
    }()),

    //↓urls
    HOT_TERMS_URL: (function () {
        return 'search/getHotTerms';
    }()),
    ADVS_SEARCH_RUL: (function () {
        return 'api/advancedSearch';
    }()),
    LIST_SEARCH_URL: (function () {
        return 'search/list';
    }()),
    LIST_SEARCH_2_URL: (function () {
        return 'search/list2';
    }()),
    LIST_PJAX_SEARCH_URL: (function () {
        return 'search/pjax/list';
    }()),
    LINE_SEARCH_URL: (function () {
        return 'search/link';
    }()),
    MAP_SEARCH_URL: (function () {
        return 'search/map';
    }()),
    MAP_IMG_BASEPATH: (function () {
        return 'resources/img/';
    }()),
    BASEMAP_URL: (function () {
        return 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer';
    }()),
    CITY_FEATURELAYER_URL: (function () {
        return 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';
    }()),
    COUNTRY_FEATURESET_URL: (function () {
        return 'api/getCountryFeatureSet';
    }()),
    PROVINCE_FEATURESET_URL: (function () {
        return 'api/getProvinceFeatureSet';
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
    RECOMMEND_URL: (function () {
        return 'search/recommend'
    }()),
    LOCAL_SUGGEST_URL: (function () {
        return 'resources/data/suggestions.json';
    }()),

    //↓pagination
    PAGE_SIZE: (function () {
        //每一页的条目数
        return 10;
    }()),
    VISIBLE_PAGES: (function () {
        //页码个数
        return 7;
    }()),

    //others
    HIDE_SHOW_SPEED: (function () {
        return 500;
    }()),
    KEY_MAPPING: (function () {
        return '{"type:":"device_type:","brand:":"device_brand:","service:":"device_service:","vul:":"vul_type:"}';
    }())
};
