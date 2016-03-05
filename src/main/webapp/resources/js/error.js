var errorHandler = function () {
    console.log("errorHandler: ajax succeed with data error");
    //最好跳转到新页面去，可以很好的适应状态管理
    $.Showmsg("服务器开小差啦，请稍后再试！");
    setTimeout(function () {
        $.Hidemsg();
    }, 3000);
};

var noDataHandler = function () {
    console.log("noDataHandler: ajax succeed but no data found");
    $('.search-box-container').popover({
        content: "没有搜索到" + '' + "相关的数据，可尝试搜索其他关键词",
        placement: 'bottom',
        trigger: 'manual'
    }).popover('show');
    setTimeout(function () {
        $('.search-box-container').popover('hide');
    }, 2000);

    if ($('#listSe').hasClass('active')) {
        $(List._WRAPPER_SEL).hide();
        $('.no-data').show();
        // (2)返回首页
        setTimeout(function () {
            $.fn.fullpage.silentMoveTo('se1');
        }, 5000);
    }
};

function noData(data) {
    console.log("No related data found!");
    /*MySessionStorage.set('checked');
     console.log(MySessionStorage.get('checked'));
     Pivot.$pivots.html('');
     Pivot.hide();*/
    //去掉最后一个pivot，移除最后添加的sessionChecked
    var lastAdded = Pivot.$pivots.find('li:last-child'), inputId, queryStr = '';
    if (lastAdded && lastAdded.attr('id')) {
        inputId = lastAdded.attr('id').replace(PivotId_SEPARATOR, CheckboxId_SEPARATOR);
        queryStr = inputId.replace(CheckboxId_SEPARATOR, ":");
        Pivot.remove(lastAdded);
        MySessionStorage.set('checked', inputId, 'remove');
        $('#' + inputId).prop('checked', false);
        if (inputId.indexOf(CountryId_SEPARATOR) < 0) {
            inputId += CountryId_SEPARATOR;
            $('#' + inputId).siblings('li').find('input').each(function (index, item) {
                $(item).prop('checked', false);
            });
        }
    }

    if (!MySessionStorage.get('data') && data.statuscode == 204) {//返回首页
        $('.carousel').carousel(0);
    }
    $('.search-box-container').popover({
        //content: "没有搜索到与" + queryStr + "相关的数据，可尝试搜索其他关键词",
        content: "没有搜索到与" + '' + "相关的数据，可尝试搜索其他关键词",
        placement: 'bottom',
        trigger: 'manual'
    }).popover('show');
    setTimeout(function () {
        $('.search-box-container').popover('hide');
    }, 2000);

    $('.home-search-form').popover({
        //content: "没有搜索到与" + queryStr + "相关的数据，可尝试搜索其他关键词",
        content: "没有搜索到与" + '' + "相关的数据，可尝试搜索其他关键词",
        placement: 'top',
        trigger: 'manual'
    }).popover('show');
    setTimeout(function () {
        $('.home-search-form').popover('hide');
    }, 2000);
    MySessionStorage.set('data', data);

}