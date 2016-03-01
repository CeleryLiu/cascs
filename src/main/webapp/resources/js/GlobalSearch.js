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
        return '.global-search-input';
    }()),
    setValue: function (val) {
        console.log('GlobalSearch.setValue(), val:' + val);
        $(this._INPUT_SEL).val(val);
    },
    show: function () {
        //console.log('Inside GlobalSearchForm.show() ======');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        //console.log('Inside GlobalSearchForm.hide() ======');
        $(this._WRAPPER_SEL).hide(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        //console.log('Inside GlobalSearchForm.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    listen: function () {
        console.log('Inside GlobalSearchForm.listenerStart() ======');
        $('.global-search-form').on('submit', function (e) {
            e.preventDefault();
            console.log("search in global form");
            var criteria = $('.global-search-input').val().replace(/\s{2,}/g, ' ').trim();
            if (criteria == '')return;
            MySessionStorage.set('wd', criteria);
            HomeSearch.setValue(criteria);
            var currentPage = MySessionStorage.get('currentPage') ? MySessionStorage.get('currentPage') : $('section.active').attr('tag');
            Pivot.init();
            if (currentPage == 'list') {
                List.search(1);
            } else if (currentPage == 'map') {
                MyMap.search(1);
            }
        });
    }
};