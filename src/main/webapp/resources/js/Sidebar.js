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
        var agg = data['aggregation'], wd = data['wd'];
        //console.log("Sidebar.render()");
        //param countryObj={en:englishName,count:totalCount,cities:cityObjList}
        var genSidebarCountryLi = function (countryName, countryObj) {
            //coXX=countryXX,ciYY=cityYY
            //country
            var coLi = $('<li class="facet-value"></li>'),
                coInput = $('<input type="checkbox" class="country">').attr('value', countryName),//input.class=key, input.value=value
                coLabelContainer = $('<div class="label-container"></div>'),
                coCount = $('<span class="facet-count"></span>').html('(' + countryObj['count'] + ')'),
                coLabel = $('<label class="facet-label"></label>').attr({
                    'title': countryName
                }).append('<bdi>' + countryName + '</bdi>');

            //cities
            var citiesContainer = $('<div class="collapse" data-country="' + countryName + '"></div>'),
                ciList = $('<ol class="inner-facet-values"></ol>');
            ciList.append(genSidebarLi('country', countryName, total));
            $.each(countryObj['cities'], function (cityName, count) {
                ciList.append(genSidebarLi('city', cityName, count));
            });

            coLabelContainer.append(coCount).append(coLabel);
            citiesContainer.append(ciList);
            coLi.append(coInput).append(coLabelContainer).append(citiesContainer);

            //country input listener
            coInput.css('display', 'none').on('click', function () {
                var val = $(this).attr('value');
                $(this).nextAll('div[data-country="' + val + '"]').collapse('toggle');
            });

            return coLi;
        };

        var inputClickHandler = function (evt) {
            var $this = $(this),
                currentPage = $(Sidebar._WRAPPER_SEL).attr('class'),
                key = $this.attr('data-key'),
                value = $this.attr('data-value');
            // (1) add a pivot
            Pivot.add(key, value);
            // (2) search (List.search or Map.search, only these two for now--2016.03.02)
            if (currentPage.indexOf('list') != 1) {
                List.search(1);
            } else if (currentPage.indexOf('map') != -1) {
                MyMap.search(1);
            }
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
            input.on('click', inputClickHandler);

            return li;
        };

        //(1)初始化dom
        $.each(agg, function (key, value) {
            var id = key != 'country@%city' ? (key + 'List') : 'countryList';
            var $ol = $('#' + id).find('ol.facet-values').html('');//清空以前的数据
            if (isEmptyObject(value)) {
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

        //(2)根据wd设置复选框的选中状态
        $('div.panel-collapse.collapse').removeClass('in');
        var wdList = wd.split(' ');
        wdList.each(function (idx, item) {
            if (item.indexOf(':') > 0) {
                var dKey = item.split(':')[0],
                    dValue = item.split(':')[1],
                    $input = $(Sidebar._WRAPPER_SEL + ' input[data-value="' + dValue + '"]');
                if ($input && $input.attr('data-key') == dKey) {
                    //选中复选框
                    $input.prop('checked', true);

                    //展开被选中复选框所在的面板
                    $input.closest('div.collapse').addClass('in');
                    if (dKey == 'city') {
                        $('#countryList').addClass('in');
                    }
                }
            }
        });


        //(3)监听折叠面板的状态
        $('.panel-title a').on('click', function () {
            var $this = $(this);
            if ($this.attr('aria-expanded') == 'false') {   //这里竟然是字符串，不是boolean
                $this.find('span').addClass('glyphicon-menu-right').removeClass('glyphicon-menu-down');
            } else {
                $this.find('span').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-right');
            }
        });
    }
};
