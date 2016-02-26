/*
 * Created by lyp on 2016/2/25.
 * Author: lyp
 * Date: 2016/2/25
 * Description: 用于保存常量
 * Version: V1.0 
 */
var Constant = {
    SECTION_NAV_TOOLTIPS: (function () {
        return ['首页', '搜索', '定位', '展示', '探测', '用户']
    }()),
    SECTIONS_BG_COLOR: (function () {
        return ['#686868', '#1BBC9B', ''];
    }()),
    FIXED_ELEMENTS: (function () {
        return '.header, .footer, .sidebar,.global-search-wrapper';
    }()),
    SLIDE_NAV_TOOLTIPS: (function () {
        return ['备用']
    }()),
    NO_SEARCH_SECTION_IDX: (function () {
        return [1, 4, 5, 6]
    }()),
    HIDE_SHOW_SPEED: (function () {
        return 500;
    }())
};
