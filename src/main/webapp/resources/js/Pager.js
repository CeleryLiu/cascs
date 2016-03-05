/*
 * Created by lyp on 2016/3/3.
 * Author: lyp
 * Date: 2016/3/3
 * Description:分页模块
 * Version: V1.0 
 */
var paginator = function (totalCounts, pageSize, currentPageNum, visiblePages, onChangeFunc) {
    if (!visiblePages) {
        visiblePages = Constant.VISIBLE_PAGES;
    }
    if (!pageSize) {
        pageSize = Constant.PAGE_SIZE;
    }
    if (!totalCounts) {
        totalCounts = 0;
    }
    var $pagerWrapper = $('#pager').show();
    $pagerWrapper.jqPaginator({
        totalCounts: totalCounts,
        pageSize: pageSize,
        visiblePages: visiblePages,
        currentPage: currentPageNum,
        first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:void(0);"><i class="fa fa-caret-left"></i>上一页</a></li>',
        next: '<li class="next"><a href="javascript:void(0);">下一页<i class="fa fa-caret-right"></i></a></li>',
        last: '<li class="last"><a href="javascript:void(0);">末页<\/a></li>',
        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
        //设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数
        onPageChange: function (num, type) { //num: 目标页；type:“init”（初始化），“change”（点击分页）
            if (type == 'change') {
                onChangeFunc(num);
            }
        }
    })
};