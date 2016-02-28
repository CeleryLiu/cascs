/**
 * Created by lyp on 2016/2/24.
 */
var Pivot = {
    _WRAPPER_SEL: (function () {
        return '.pivots-wrapper'
    }()),
    wrapper: $('#pivots_wrapper'),
    $pivots: $('.pivots'),
    show: function () {
        //console.log('Inside Pivot.show() =======');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        console.log('Inside Pivot.hide() =======');
        $(this._WRAPPER_SEL).hide();
    },
    isHidden: function () {
        //console.log('Inside Pivot.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    init: function () {
        this.wrapper.hide();
        this.$pivots.html('');
        sessionStorage.removeItem('pivots');
        console.log('Inside Pivot.init() ======');
    },
    add: function (id, dataAttr) {//id,not the jquery object；dataAttr为城市特加的属性，表示该城市所属的国家，可选
        console.log('Inside Pivot.add() ======');
        id = id.split('/')[0];
        if (id.indexOf(CountryId_SEPARATOR) !== -1) {
            id = id.replace(CountryId_SEPARATOR, '');
        }
        /*if (this.$pivots.find('li').length < 1) {
            this.hide();
        }*/
        if (!this.$pivots.find('#' + id))return;
        this.$pivots.append(genPivot(id, dataAttr));
        MySessionStorage.set('pivots', id.replace(new RegExp('\\s+', 'mg'), SPACE_SEPARATOR), 'add');
        if (this.$pivots.find('li').length >= 1) {
            this.show();
        }

        //生成一个pivot，key为搜索关键字（也是aggregation中的每一项），value为用户选择的checkbox的值
        function genPivot(id, _dataAttr) {
            var $pivot = $('<li class="pivot"></li>').attr({
                'id': id.replace(new RegExp('\\s+', 'mg'), SPACE_SEPARATOR),
                'data-country': _dataAttr
            });
            var htmlText = id.split(PivotId_SEPARATOR)[1].replace(new RegExp(SPACE_SEPARATOR, 'mg'), ' ');
            if (_dataAttr) {
                $pivot.html(_dataAttr + ': ' + htmlText);
            } else {
                $pivot.html(htmlText);
            }

            var closeBtn = $('<button class="remove-pivot" type="submit">&times;</button>').appendTo($pivot);

            //listener
            closeBtn.on('click', function () {
                var pid = $(this).closest('li.pivot').attr('id');
                var k_v = pid.split(PivotId_SEPARATOR);
                var k = k_v[0], v = k_v[1];

                //（1）移除对应pivot
                Pivot.remove($(this).parent('li.pivot'));

                //（2）取消选中复选框
                var checkboxId = pid.replace(PivotId_SEPARATOR, CheckboxId_SEPARATOR);
                if (checkboxId.indexOf('country' + CheckboxId_SEPARATOR) !== -1) {
                    if (checkboxId.indexOf(CountryId_SEPARATOR) < 0) {
                        checkboxId += CountryId_SEPARATOR;
                        $('#' + checkboxId).siblings('li').find('input').each(function (index, item) {
                            $(item).prop('checked', false);
                        });
                    }
                } else {
                    var checkbox = $('#' + checkboxId);
                    checkbox.prop('checked', false);
                }

                //（3）从sessionStorage中移除对应checkbox id
                MySessionStorage.set('checked', checkboxId, 'remove');

                //（4）重新搜索
                Sidebar.searchOnCheckboxChange();
            });
            return $pivot;
        }
    },
    remove: function (pivot) {//jquery object
        console.log('Inside Pivot.add() ======', pivot);
        if (pivot) {
            pivot.remove();
            if (pivot.attr('id')) {
                MySessionStorage.set('pivots', pivot.attr('id'), 'remove');
            }
        }
        if (this.$pivots.find('li').length <= 0) {
            this.wrapper.hide();
        }
    },
    getAllPivotsAsStr: function () {
        var result = '';
        //console.log("FUNCTION CALL: Pivot.getAllPivotsAsStr");
        this.$pivots.find('li').each(function (idx, item) {
            if ($(item).attr('data-country')) {
                result += 'country:' + $(this).attr('data-country') + ' ';
            }
            result += item.id.replace(PivotId_SEPARATOR, ':') + ' ';
        });
        return result.replace(new RegExp(SPACE_SEPARATOR, 'g'), ' ');
    }
};