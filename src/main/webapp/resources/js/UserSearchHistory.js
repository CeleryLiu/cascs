/**
 * @author lyp
 * @date 2016-03-09
 * @module name UserSearchHistory
 * @description 目前没有数据库，用户搜索历史保存在localStorage中，等使用数据库后再保存在对应用户的查询记录中
 */
/*
 * localStorage:{
 *   searchHistory:[item1,item2,...]
 * }
 * 之后如果添加数据库，这里的CRUD操作会留到后台做
 * 每次用户搜索，都会将搜索条件存入localStorage中，并且重新生成对应的dom
 */
var UserSearchHistory = {
    _WRAPPER_SEL: (function () {
        return '#widget-search-history';
    }()),
    addItem: function (item) {
        //console.log('UserSearchHistory.addItem() ======', item);
        if (!item || item == null || item == '')return;
        // (1)将最近一次搜索的item存入localStorage中
        // (1.1)取出searchHistory
        var searchHistory = localStorage.getItem('searchHistory'), newHistory = [];
        if (searchHistory != null && searchHistory != 'undefined') {
            // (1.2)如果searchHistory中包含item，则将其删除
            $.each(JSON.parse(searchHistory), function (idx, value) {
                if (item != value) {
                    newHistory.push(value);
                }
            });
        } else {
            $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
        }
        // (2)添加新item到搜索历史末尾
        newHistory.push(item);

        // (3)存入localStorage中
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));

        // (4)重新生成搜索历史节点
        this.generateDoms(newHistory);
    },
    deleteItem: function (item) {
        //console.log('UserSearchHistory.deleteItem() ======');
        if (!item || item == null || item == '')return;
        // (1.1)取出searchHistory
        var searchHistory = localStorage.getItem('searchHistory'), newHistory = [];
        if (searchHistory != null && searchHistory != 'undefined') {
            // (1.2)如果searchHistory中包含item，则将其删除
            $.each(JSON.parse(searchHistory), function (idx, value) {
                if (item != value) {
                    newHistory.push(value);
                }
            });
        }
        if (newHistory.length > 0) {
            // (2)重新存入localStorage中
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
            // (3)重新生成搜索历史节点
            this.generateDoms(newHistory);
        } else {
            localStorage.removeItem('searchHistory');
            $(this._WRAPPER_SEL).hide();

        }
    },
    generateDoms: function (searchHistory) {
        //console.log('UserSearchHistory.generateDoms() ======', searchHistory);
        // (1)生成用户搜索历史DOM节点
        if (searchHistory) {
            var $history = $('.search-history-list').html(''), length = searchHistory.length;
            for (var i = 0; i < length && i < 10; i++) {
                var wd = searchHistory.pop();
                var hLi = $('<li></li>');
                var span = $('<span class="search-item">' + wd + '</span>')
                    .attr({
                        'data-search-keyword': wd,
                        'title': wd
                    }).appendTo(hLi);
                var removeBtn = $('<button class="btn" data-toggle="confirmation">&times;</button>').appendTo(hLi)
                    .attr({
                        'data-search-keyword': wd,
                        'title': '确定要删除【' + wd + '】吗？'
                    });
                $history.append(hLi);
            }
            SearchTip.listen();
            $('[data-toggle="confirmation"]').confirmation({
                'btnOkIcon': '',
                'btnCancelIcon': '',
                'btnOkClass': 'btn btn-sm btn-primary mr10',
                'btnOkLabel': '确定',
                'btnCancelLabel': '取消',
                'onConfirm': function (event, element) {
                    event.preventDefault();
                    UserSearchHistory.deleteItem(element.attr('data-search-keyword'));
                },
                'onCancel': function (event, element) {
                    element.closest('li').removeClass('active');
                }
            });
        }
    },
    init: function () {
        var searchHis = localStorage.getItem('searchHistory');
        if (searchHis && searchHis != null && searchHis != 'undefined') {
            this.generateDoms((JSON.parse(searchHis)));
        } else {
            $(this._WRAPPER_SEL).hide();
        }
    }
};