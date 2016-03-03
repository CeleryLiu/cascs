/**
 * Created by lyp on 2016/2/24.
 */
var Pivot = {
    _WRAPPER_SEL: (function () {
        return '.pivots-wrapper'
    }()),
    _PIVOTS_UL_SEL: (function () {
        return '.pivots';
    }()),
    show: function () {
        //console.log('Pivot.show() =======');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        console.log('Pivot.hide() =======');
        $(this._WRAPPER_SEL).hide();
    },
    isHidden: function () {
        //console.log('Pivot.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    init: function () {
        console.log('Pivot.init() ======');
        $(this._PIVOTS_UL_SEL).html('');
    },
    //dKey->data-key; dValue->data-value; value->text; extra.country->data-country
    add: function (dKey, dValue, value, extra) {
        console.log('Pivot.add() ======');
        var pivots = $(this._PIVOTS_UL_SEL),
            $p = pivots.find('li[data-value="' + dValue + '"]');
        if ($p
            && $p.attr('data-key') == dKey
            && (!extra || $p.attr('data-country') == extra['country'])) {
            return;
        }

        //生成一个pivot，dk->data-key；dv->data-value，v->text,e['country']->data-country
        var genPivot = function (dk, dv, v, e) {
            //generate dom nodes
            var $pivot = $('<li class="pivot"></li>')
                .attr({'data-key': dk, 'data-value': dv})
                .html(v);
            if (e && e['country']) {
                $pivot.attr('data-country', e['country']);
            }
            var closeBtn = $('<button class="remove-pivot" type="submit">&times;</button>')
                .appendTo($pivot);

            //listener
            closeBtn.on('click', function () {
                //（1）移除对应pivot
                $(this).parent('li.pivot').remove();

                //（2）重新搜索
                Sidebar.searchOnChange();
            });
            return $pivot;
        };
        pivots.append(genPivot(dKey, dValue, value, extra));
        if (pivots.find('li').length > 0) {
            this.show();
        }

    },
    /**
     * param pivot为要移除的pivot对应的jquery对象
     *       data:{dKey->data-key，dValue->data-value,value->text,country->data-country}
     * 两个参数只传一个即可
     */
    remove: function (pivot, data) {
        console.log('Pivot.add() ======');
        if (pivot) {
            pivot.remove();
        } else {
            var $p = $(this._PIVOTS_UL_SEL).find('li[data-value="' + data['dValue'] + '"]');
            if ($p.attr('data-key') == data['dKey'] && (!data['country'] || data['country'] == $p.attr('data-country'))) {
                $p.remove();
            }
        }
        if ($(this._PIVOTS_UL_SEL).find('li').length <= 0) {
            this.hide();
        }
    },
    getUserSelected: function () {
        //console.log("Pivot.getUserSelected() ======");
        var result = '';
        $(this._PIVOTS_UL_SEL).find('li').each(function (idx, item) {
            var $item = $(item);
            if ($item.attr('data-country')) {
                result += 'country:' + $item.attr('data-country') + ' ';
            }
            result += $item.attr('data-key') + ':' + $item.attr('data-value') + ' ';
        });
        return result.trim();
    }
};

var ResultOverview = {};