/**
 * Created by lyp on 2016/2/22.
 */
var GlobalSearch = {
    _WRAPPER_SEL: (function () {
        return '.global-search-wrapper'
    }()),
    _FORM_SEL: (function () {
        return '.global-search-form';
    }()),
    _INPUT_SEL: (function () {
        return '#global_search_input';
    }()),
    setValue: function (val) {
        //console.log('GlobalSearch.setValue(), val:' + val);
        $(this._INPUT_SEL).val(val);
        //$(this._INPUT_SEL).typeahead('val', val);
    },
    getValue: function () {
        var $input = $(this._INPUT_SEL), val = $input.val();
        if (val == "") {
            val = $input.attr('placeholder');
            $input.val(val)
        }
        return val;
        //return $(this._INPUT_SEL).typeahead('val').replace(/\s{2,}/g, ' ').trim();
    },
    show: function () {
        //console.log('GlobalSearchForm.show() ======');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        //console.log('GlobalSearchForm.hide() ======');
        $(this._WRAPPER_SEL).hide(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        //console.log('GlobalSearchForm.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    listen: function () {
        //console.log('GlobalSearchForm.listenerStart() ======');
        $(GlobalSearch._FORM_SEL).on('submit', function (e) {
            e.preventDefault();
            var criteria = GlobalSearch.getValue();
            $('.tt-menu').hide(300);
            if (criteria == '')return;
            //(1)清空Pivot
            Pivot.init();
            //(2)设置首页搜索框的值
            HomeSearch.setValue(criteria);
            //(3)搜索
            if ($('#listSe').hasClass('active')) {
                List.search(1);
            } else if ($('#mapSe').hasClass('active')) {
                ArcMap.search(1);
            }
        });
    }
};