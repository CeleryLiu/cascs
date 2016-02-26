/**
 * Created by lyp on 2016/2/24.
 */
var Pivot = {
    _WRAPPER_SEL: (function () {
        return '.pivots-wrapper'
    }()),
    show: function () {
        //console.log('Inside Pivot.show()========');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        console.log('Inside Pivot.hide()========');
        $(this._WRAPPER_SEL).hide(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        console.log('Inside Pivot.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    init: function () {
        console.log('Inside Pivot.init() ======');
    }
};