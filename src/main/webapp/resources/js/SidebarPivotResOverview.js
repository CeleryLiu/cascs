/**
 * Created by lyp on 2016/2/24.
 */
var Sidebar = {
    _WRAPPER_SEL: (function () {
        return '.sidebar'
    }()),

    show: function () {
        //console.log('Sidebar.show()');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        //console.log('Sidebar.hide()');
        $(this._WRAPPER_SEL).hide(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        //console.log('Sidebar.isHidden()');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    render: function (data) {
        //console.log("Sidebar.render()");
        var agg = data['aggregation'], wd = data['wd'];
        //param countryObj={en:englishName,count:totalCount,cities:cityObjList}
        var genSidebarCountryLi = function (countryName, countryObj) {
            //coXX=countryXX,ciYY=cityYY
            //country
            var coLi = $('<li class="facet-value"></li>'),
                coInput = $('<input type="checkbox" class="country">').attr('value', countryName).css('display', 'none'),//input.class=key, input.value=value
                coLabelContainer = $('<div class="label-container"></div>'),
                coCount = $('<span class="facet-count"></span>').html('(' + countryObj['count'] + ')'),
                coLabel = $('<label class="facet-label"></label>').attr({
                    'title': countryName
                }).append('<bdi>' + countryName + '</bdi>');

            //cities
            var citiesContainer = $('<div class="collapse" data-country="' + countryName + '"></div>'),
                ciList = $('<ol class="inner-facet-values"></ol>');
            ciList.append(genSidebarLi('country', countryName, countryObj['count']));
            $.each(countryObj['cities'], function (cityName, count) {
                ciList.append(genSidebarLi('city', cityName, count));
            });

            coLabelContainer.append(coCount).append(coLabel);
            citiesContainer.append(ciList);
            coLi.append(coInput).append(coLabelContainer).append(citiesContainer);

            //country listener
            //coInput.css('display', 'none');
            coLabelContainer.on('click', function () {
                $(this).next().collapse('toggle');
            });

            return coLi;
        };

        //生成一个聚类的一个条目 ol.li，key为搜索关键字，value为该关键字对应的值，count为查到的条数
        var genSidebarLi = function (key, value, count) {
            //value = value.split('/')[0];

            var li = $('<li class="facet-value"></li>'),
                input = $('<input type="checkbox">').attr({'data-key': key, 'data-value': value});
            if (key == 'country') { //表示全国
                value = '全国';
            } else if (value.toLocaleLowerCase() == 'unknown') {
                input.attr({'disabled': 'disabled'});
            }

            var container = $('<div class="label-container"></div>'),
                countLabel = $('<span class="facet-count"></span>').html('(' + count + ')'),
                nameLabel = $('<label class="facet-label"></label>').attr({'title': value}).append('<bdi>' + value + '</bdi>');

            container.append(countLabel).append(nameLabel);
            li.append(input).append(container);

            //listener
            input.on('click', function () {
                var $this = $(this),
                    dKey = $this.attr('data-key'),
                    dValue = $this.attr('data-value'),
                    country = $this.attr('data-country');
                if (this.checked) {
                    // (1) checked -> add a pivot
                    if (country) {
                        Pivot.add(dKey, dValue, {'country': country});
                    } else {
                        Pivot.add(dKey, dValue);
                    }
                } else {
                    // (1) unchecked -> remove the pivot
                    if (country) {
                        Pivot.remove({
                            'dKey': dKey,
                            'dValue': dValue
                        });
                    } else {
                        Pivot.remove({
                            'dKey': dKey,
                            'dValue': dValue,
                            'country': country
                        });
                    }
                }
                // (2) search
                Sidebar.searchOnChange();
            });

            return li;
        };

        //(1)初始化dom
        $.each(agg, function (key, value) {
            var id = key != 'country@%city' ? (key + 'List') : 'countryList';
            var $ol = $('#' + id).find('ol.facet-values').html('');//清空以前的数据
            if (!isEmptyObject(value)) {
            } else {
                $ol.closest('div.panel').hide();
            }
            if (key == 'country@%city') {
                if (!isEmptyObject(value)) {
                    $.each(value, function (countryName, countryObj) {
                        $ol.append(genSidebarCountryLi(countryName, countryObj));
                    });
                }
            } else {
                if (!isEmptyObject(value)) {
                    $.each(value, function (name, count) {
                        $ol.append(genSidebarLi(key, name, count)).closest('div.panel').show();
                    });
                }
            }
        });

        //(2)根据wd设置复选框的选中状态并添加对应的pivot
        $('div.panel-collapse.collapse').removeClass('in');
        var wdList = wd.split(' ');
        for (var i = 0; i < wdList.length; i++) {
            var item = wdList[i];
            if (item.indexOf(':') > 0) {
                var dKey = item.split(':')[0],
                    dValue = item.split(':')[1],
                    $input = $(Sidebar._WRAPPER_SEL + ' input[data-value="' + dValue + '"]'),
                    value;
                if ($input && $input.attr('data-key') == dKey) {
                    value = $input.val();
                    //选中复选框
                    $input.prop('checked', true);
                    if (value == '全国') {
                        //该国家下所有的城市都被选中，并移除Pivot中对应的城市
                        var siblings = $input.closest('li').siblings("li");
                        siblings.each(function (index, item) {
                            var i = $(item).find('input').prop('checked', true).attr('disabled', 'disabled');
                            Pivot.remove(dKey, dValue);
                        });
                    }

                    //展开被选中复选框所在的面板
                    $input.closest('div.collapse').addClass('in');
                    if (dKey == 'city' || dKey == 'country') {
                        $('#countryList').addClass('in');
                    }
                    //添加pivot
                    Pivot.add(dKey, dValue, value);
                }
            }
        }

        //(3)监听折叠面板的状态
        $('.panel-title a').on('click', function () {
            var $this = $(this);
            if ($this.attr('aria-expanded') == 'false') {   //这里竟然是字符串，不是boolean
                $this.find('span').addClass('glyphicon-menu-right').removeClass('glyphicon-menu-down');
            } else {
                $this.find('span').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-right');
            }
        });
    },
    searchOnChange: function () {
        //List.search or Map.search, only these two for now--2016.03.02
        var currentPage = $(Sidebar._WRAPPER_SEL).attr('class');
        if (currentPage.indexOf('list') != 1) {
            List.search(1);
        } else if (currentPage.indexOf('map') != -1) {
            MyMap.search(1);
        }
    }
};

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
        //console.log('Pivot.hide() =======');
        $(this._WRAPPER_SEL).hide();
    },
    isHidden: function () {
        //console.log('Pivot.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    init: function () {
        //console.log('Pivot.init() ======');
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

        //生成一个pivot，dk->data-key；dv->data-value，e['country']->data-country
        var genPivot = function (dk, dv, e) {
            //generate dom nodes
            var $pivot = $('<li class="pivot"></li>')
                .attr({'data-key': dk, 'data-value': dv})
                .html(dv);
            if (e && e['country']) {
                $pivot.attr('data-country', e['country']);
            }
            var closeBtn = $('<button class="remove-pivot badge" type="submit">&times;</button>')
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
    remove: function (data, pivot) {
        console.log('Pivot.remove() ======');
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

var ResultOverview = {
    _WRAPPER_SEL: (function () {
        return '.result-overview';
    }()),
    show: function () {
        $(this._WRAPPER_SEL).fadeIn(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        $(this._WRAPPER_SEL).fadeOut(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        //console.log('ResultOverview.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    set: function (count, duration, currpage, totalPage) {
        var overview = $(this._WRAPPER_SEL);
        overview.find('strong.count').text(count);
        overview.find('strong.duration').text(duration);
        overview.find('strong.page-num').text(currpage + ' / ' + totalPage);
    }
};
