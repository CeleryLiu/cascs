var errorHandler = function () {
    console.log("errorHandler: ajax succeed with data error");
    //最好跳转到新页面去，可以很好的适应状态管理
    $.Showmsg("服务器开小差啦，请稍后再试！");
    setTimeout(function () {
        $.Hidemsg();
    }, 3000);
};

var noDataHandler = function (data) {
    console.log("noDataHandler: ajax succeed but no data found");
    if ($('#listSe').hasClass('active')) {
        $(List._WRAPPER_SEL).hide();
        $('.no-data').show();
        // (2)返回首页
        /*     setTimeout(function () {
         $.fn.fullpage.silentMoveTo('se1');
         }, 5000);*/
    }
    $('.search-box-container').popover({
        content: "没有搜索到" + '' + "相关的数据，可尝试搜索其他关键词",
        placement: 'bottom',
        trigger: 'manual'
    }).popover('show');
    setTimeout(function () {
        $('.search-box-container').popover('hide');
    }, 2000);
};