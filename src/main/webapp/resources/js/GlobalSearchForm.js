/**
 * Created by lyp on 2016/2/22.
 */
var GlobalSearchForm = {
    _WRAPPER_SEL: (function () {
        return '.global-search-wrapper'
    }()),
    show: function () {
        //console.log('Inside GlobalSearchForm.show()========');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        //console.log('Inside GlobalSearchForm.hide()========');
        $(this._WRAPPER_SEL).hide(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        return $(this._WRAPPER_SEL).is(':hidden');
    }
};