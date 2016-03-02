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
    render: function (agg) {
        //console.log("Sidebar.render()");
        //param countryObj={en:englishName,count:totalCount,cities:cityObjList}
        function genSidebarCountryLi(countryName, countryObj, count) {
            //co=country,ci=city
            var coLi = $('<li class="facet-value"></li>'),
                coInput = $('<input type="checkbox" class="country">').attr('value', countryName),//input.class=key, input.value=value
                coLabelContainer = $('<div class="label-container"></div>'),
                coCount = $('<span class="facet-count"></span>').html('(' + count + ')'),
                coLabel = $('<label class="facet-label"></label>').attr({
                    'title': countryName
                }).append('<bdi>' + countryName + '</bdi>');

            //listener
            coInput.css('display', 'none').on('click', function () {
                var val = $(this).attr('value');
                $(this).nextAll('div[data-country="' + val + '"]').collapse('toggle');
            });

            coLabelContainer.append(coCount).append(coLabel);
            coLi.append(coInput).append(coLabelContainer);


            var citiesContainer = $('<div class="collapse" data-country="' + countryName + '"></div>').appendTo(coLi),
                ciList = $('<ol class="inner-facet-values"></ol>').appendTo(citiesContainer);
            ciList.append(genSidebarLi('country', countryName, total));
            $.each(countryObj['cities'], function (cityName, count) {
                /*if (cityName.indexOf('/') != -1) {
                 cityName = cityName.replace(new RegExp('/', 'mg'), '');
                 }*/
                /*var li = genSidebarLi('city', cityName, count);
                 li.find('input:first-child').attr('data-country', countryName);
                 $cities.append(li);*/
                ciList.append(genSidebarLi('city', cityName, count));
            });
            return coLi;
        }

        var setCountryCity = function (countries) {
            var $country = $('#countryList').find('ol.facet-values').show().html(''); //清空以前的数据
            if (!isEmptyObject(countries)) {
                $.each(countries, function (countryName, countryObj) {
                    if (countryName.indexOf('/')) {
                        countryName = countryName.replace(new RegExp('/', 'mg'), '');
                    }
                    var total = countryObj['count'],
                        countryLi = genSidebarCountryLi(countryName, total).appendTo($country),
                        citiesContainer = $('<div class="collapse" data-country="' + countryName + '"></div>').appendTo(countryLi),
                        $cities = $('<ol class="inner-facet-values"></ol>').appendTo(citiesContainer);
                    $cities.append(genSidebarLi('country', countryName, total));
                    $.each(countryObj['cities'], function (cityName, count) {
                        if (cityName.indexOf('/')) {
                            cityName = cityName.replace(new RegExp('/', 'mg'), '');
                        }
                        /*var li = genSidebarLi('city', cityName, count);
                         li.find('input:first-child').attr('data-country', countryName);
                         $cities.append(li);*/
                        $cities.append(genSidebarLi('city', cityName, count));
                    });
                });
            } else {
                $country.closest('div.panel').hide();
            }

        };
        $.each(agg, function (key, value) {
            if (key.indexOf('/')) {
                key = key.replace(new RegExp('/', 'mg'), '');
            }
            if (key == 'country@%city') {
                var $country = $('#countryList').find('ol.facet-values').show().html(''); //清空以前的数据
                if (!isEmptyObject(value)) {
                    $.each(value, function (countryName, countryObj) {
                        if (countryName.indexOf('/')) {
                            countryName = countryName.replace(new RegExp('/', 'mg'), '');
                        }
                        var total = countryObj['count'],
                            countryLi = genSidebarCountryLi('country', countryName, total).appendTo($country),
                            id = 'collapse' + countryName,
                            citiesContainer = $('<div class="collapse" id="' + id + '"></div>').appendTo(countryLi),
                            $cities = $('<ol class="inner-facet-values"></ol>').appendTo(citiesContainer);
                        $cities.append(genSidebarLi('country' + CheckboxId_SEPARATOR + countryName, '全国', total));
                        $.each(countryObj['cities'], function (cityName, count) {
                            if (cityName.indexOf('/')) {
                                cityName = cityName.replace(new RegExp('/', 'mg'), '');
                            }
                            var li = genSidebarLi('city', cityName, count);
                            li.find('input:first-child').attr('data-country', countryName);
                            $cities.append(li);
                        });
                    });
                } else {
                    $country.closest('div.panel').hide();
                }
            } else {
                var $ol = $('#' + key + 'List').find('ol.facet-values').html('');   //清空以前的数据
                if (!isEmptyObject(value)) {
                    $.each(value, function (name, count) {
                        $ol.append(genSidebarLi(key, name, count)).closest('div.panel').show();
                    });
                } else {
                    $ol.closest('div.panel').hide();
                }
            }
        });
        //根据pivots，设置复选框的选中状态
        $('div.panel-collapse.collapse').removeClass('in');
        var pivots = MySessionStorage.get('pivots');
        if (pivots) {
            Pivot.init();
            //var pivotsList = pivots.trim().split(' ');
            var pivotsList = pivots.trim().split(' ');
            for (var i = 0; i < pivotsList.length; i++) {
                if (pivotsList[i] == '' || pivotsList == ' ')return;
                Pivot.add(pivotsList[i]); //添加pivot
                var id = pivotsList[i].replace(PivotId_SEPARATOR, CheckboxId_SEPARATOR);
                var chkbox = $('#' + id).prop('checked', true); //选中复选框
                if (id.indexOf('country' + CheckboxId_SEPARATOR) > -1) {
                    $('#' + id + CountryId_SEPARATOR).closest('ol').find('input').prop('checked', true);
                    //$('#collapse' + id.substring(id.indexOf(CheckboxId_SEPARATOR))).addClass('in');
                }
                //展开被选中的项所在的列表
                var panelId = id.split(CheckboxId_SEPARATOR)[0] + 'List';
                if (id.indexOf('city' + CheckboxId_SEPARATOR) > -1) {//如果是城市，则展开国家面板以及该城市所在国家的列表
                    $('#countryList').addClass('in');
                    chkbox.closest('div.collapse').addClass('in');
                } else {
                    $('#' + panelId).addClass('in');
                }
            }
        }

        //listeners for the up and down icon
        $('.panel-title a').on('click', function () {
            var $this = $(this);
            if ($this.attr('aria-expanded') == 'false') {   //这里竟然是字符串，不是boolean
                $this.find('span').addClass('glyphicon-menu-right').removeClass('glyphicon-menu-down');
            } else {
                $this.find('span').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-right');
            }
        });

        /*--------------------------------------↓functions ----------------------------------*/
        //生成一个聚类的一个条目 ol -> li，key为搜索关键字，value为该关键字对应的值，count为查到的条数
        function genSidebarLi(key, value, count) {
            value = value.split('/')[0];

            var id = key + CheckboxId_SEPARATOR + value.replace(new RegExp('\\s+', 'mg'), SPACE_SEPARATOR);
            var li = $('<li class="facet-value"></li>'), input;
            if (value == '全国') {
                id = key + '_all_';
                input = $('<input type="checkbox" class="all-city">').attr({'id': id, 'name': id});
            } else if (key == 'city') {
                input = $('<input type="checkbox" class="city">').attr({'id': id, 'name': id});
            } else {
                input = $('<input type="checkbox">').attr({'id': id, 'name': id});
            }
            if (value.toLocaleLowerCase() == 'unknown') {
                input = $('<input type="checkbox" disabled>').attr({'id': id, 'name': id});
            }
            var
                div = $('<div class="label-container"></div>'),
                span = $('<span class="facet-count"></span>').html('(' + count + ')'),
                label = $('<label class="facet-label"></label>').attr({
                    'for': id,
                    'title': id
                }).append('<bdi>' + value + '</bdi>');

            //listener
            inputEventHandler(input);

            div.append(span).append(label);
            li.append(input).append(div);
            return li;
        }


        function inputEventHandler(input) {
            input.on('click', function () {
                Sidebar.onlyUpdate = true;
                var $this = $(this), siblings = $this.closest('li').siblings("li"), id = this.id;
                if ($this.hasClass('all-city')) {

                    id = id.replace(CountryId_SEPARATOR, '');
                    if (this.checked) {
                        //console.log("input all city is clicked");
                        //（1）该国家下所有的城市都被选中，session中都移除,Pivot中都移除
                        siblings.each(function (index, item) {
                            var i = $(item).find('input').prop('checked', true);
                            MySessionStorage.set('checked', i.attr('id'), 'remove');
                            if (i.attr('id').indexOf('/') == -1) {
                                Pivot.remove($('#' + i.attr('id').replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR)));
                            }
                        });
                        //（2.a）设置sessionStorage
                        MySessionStorage.set('checked', id, 'add');
                        //（2.b）添加对应的pivot
                        Pivot.add(id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR));
                    }
                    else {
                        //（1）设置sessionStorage
                        MySessionStorage.set('checked', id, 'remove');
                        //（2）删除对应的pivot
                        Pivot.remove($('#' + id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR)));

                        //（3）该国家下所有的城市都取消选中
                        siblings.each(function (index, item) {
                            var i = $(item).find('input').prop('checked', false);
                        });
                    }
                }
                else if ($this.hasClass('city')) {
                    var all = $this.closest('li').siblings("li:first-child").find('input');
                    //console.log("all is checked or not", all.is(':checked'));
                    if (all.is(':checked') && !this.checked) {

                        siblings.each(function (index, item) {
                            var itemId = $(item).find('input').attr('id');
                            if (itemId != $this.attr('id')) {
                                //（1.a）添加对应的全国所有其他城市sessionStorage
                                MySessionStorage.set('checked', itemId, 'add');
                                //（1.b）添加对应的全国所有其他pivot

                                if ($this.attr('data-country')) {

                                    Pivot.add(itemId.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR), $this.attr('data-country'));
                                } else {
                                    Pivot.add(itemId.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR));
                                }
                            }
                        });
                        //（2.a）移除全国sessionStorage
                        MySessionStorage.set('checked', all.attr('id'), 'remove');
                        //（2.b）删除对应的全国pivot
                        Pivot.remove($('#' + all.attr('id').replace(CountryId_SEPARATOR, '').replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR)));

                        //（2.c）取消全国checkbox的选中状态
                        all.prop('checked', false);//.checked = true;
                    }
                    else {
                        var pivotId = id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR);
                        if (this.checked) {
                            //（1）设置sessionStorage
                            MySessionStorage.set('checked', id, 'add');
                            //（2）添加对应的pivot
                            //Pivot.add(pivotId);
                            if ($this.attr('data-country')) {

                                Pivot.add(pivotId, $this.attr('data-country'));
                            } else {
                                MySessionStorage.set('pivots', pivotId.replace(new RegExp('\\s+', 'mg'), SPACE_SEPARATOR), 'add');
                                //Pivot.add(pivotId);
                            }
                        } else {
                            //（1）设置sessionStorage
                            MySessionStorage.set('checked', id, 'remove');

                            //（2）删除对应的pivot
                            Pivot.remove($('#' + pivotId));
                        }
                    }
                }
                else {
                    var pid = this.id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR);
                    if (this.checked) {
                        //（1）设置sessionStorage
                        MySessionStorage.set('checked', id, 'add');
                        //（2）添加对应的pivot

                        Pivot.add(pid);
                    } else {
                        //（1）设置sessionStorage
                        MySessionStorage.set('checked', id, 'remove');

                        //（2）删除对应的pivot
                        Pivot.remove($('#' + pid));
                    }
                }
                //（3）重新搜索
                Sidebar.searchOnCheckboxChange();
            });
        }
    },
    searchOnCheckboxChange: function () {
        //console.log("FUNCTION CALL: Sidebar.searchOnCheckboxChange");
        var currentPage = MySessionStorage.get('currentPage');
        if (currentPage == 'list') {
            List.search(1); //1表示显示第一页
        } else if (currentPage == 'map') {
            MyMap.search(1);
        }
    }
};
