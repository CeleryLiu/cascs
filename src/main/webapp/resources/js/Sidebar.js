/**
 * Created by lyp on 2016/2/24.
 */
var Sidebar = {
    _WRAPPER_SEL: (function () {
        return '.sidebar'
    }()),
    show: function () {
        //console.log('Inside Sidebar.show()========');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        console.log('Inside Sidebar.hide()========');
        $(this._WRAPPER_SEL).hide(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        console.log('Inside Sidebar.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    init: function () {
        console.log('Inside Sidebar.init() ======');
    }
};