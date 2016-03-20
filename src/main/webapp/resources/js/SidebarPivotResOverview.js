/**
 * Created by lyp on 2016/2/24.
 * 所有名称中带‘2’的方法，都是为使用json作为http参数来服务的，不带2的都是为普通搜索服务的
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
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    render: function (data) {
        console.log("Sidebar.render()", data);
        var agg = data['aggregation'], wd = data['wd'] ? data['wd'] : data['q']['wd'];
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
                    Pivot.remove({
                        'dKey': dKey,
                        'dValue': dValue,
                        'country': country
                    });
                    /* if (country) {
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
                     }*/
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

        //(2)根据filter设置复选框的选中状态并添加对应的pivot
        $('div.panel-collapse.collapse').removeClass('in');
        /* if (wd && wd != '') {
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
         if (dKey == 'country') {
         //该国家下所有的城市都被选中，并移除Pivot中对应的城市
         var siblings = $input.closest('li').siblings("li");
         siblings.each(function (index, item) {
         var i = $(item).find('input').prop('checked', true).attr('disabled', 'disabled');
         Pivot.remove({'dKye': dKey, 'dValue': dValue});
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
         }*/

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
    render2: function (data) {
        //console.log("Sidebar.render2() ======",JSON.parse(data['q']));
        var q = JSON.parse(data['q']);
        var agg = data['aggregation'], wd = q['wd'], filter = q['filter'];
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
            coLabelContainer.on('click', function () {
                $(this).next().collapse('toggle');
            });

            return coLi;
        };

        //生成一个filter条目 ol.li，key为搜索关键字（对应filter的每一项），value为该关键字对应的值，count为查到的条数
        var genSidebarLi = function (key, value, count) {
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
                    // (1.a) checked -> add a pivot
                    if (country) {
                        Pivot.add(dKey, dValue, {'country': country});
                    } else {
                        Pivot.add(dKey, dValue);
                    }
                } else {
                    // (1.b) unchecked -> remove the pivot
                    Pivot.remove({
                        'dKey': dKey,
                        'dValue': dValue,
                        'country': country
                    });
                }
                // (2) search
                Sidebar.searchOnChange();
            });

            return li;
        };

        //(1)生成并初始化dom节点
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
                        if (key.indexOf('device_') != -1) {
                            key = key.replace('device_', '');
                        }
                        $ol.append(genSidebarLi(key, name, count)).closest('div.panel').show();
                    });
                }
            }
        });

        //(2)根据filter设置复选框的选中状态【并添加对应的pivot，目前这里不需要，因为pivot是不刷新的，所以暂时注释掉】
        $('div.panel-collapse.collapse').removeClass('in');
        if (filter && !isEmptyObject(filter)) {
            for (var key in filter) {
                var filterItemList = filter[key];
                $.each(filterItemList, function (fIdx, value) {
                    // (2.1)选中checkbox
                    var $input = $(Sidebar._WRAPPER_SEL + ' input[data-value="' + value + '"][data-key="' + key + '"]');
                    if ($input) {
                        $input.prop('checked', true);
                        //当用户选中了全国时，该国家下所有的城市都被选中，并移除Pivot中相应的城市
                        if (key == 'country' && (!filter['city'] || filter['city'].length == 0)) {
                            var siblings = $input.closest('li').siblings("li");
                            $.each(siblings, function (sIdx, li) {
                                $(li).find('input').prop('checked', true).attr('disabled', 'disabled');
                                Pivot.remove({'dKye': key, 'dValue': value});
                            });
                        }
                    }
                    // (2.2)展开被选中复选框所在的panel
                    $input.closest('div.collapse').addClass('in');
                    if (key == 'city' || key == 'country') {
                        $('#countryList').addClass('in');
                    }
                    // (2.3)生成pivot（如果没有的话）
                    Pivot.add(key, value, value);
                });
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
            ArcMap.search(1);
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
        //console.log('Pivot.add() ======');
        var $pivots = $(this._PIVOTS_UL_SEL),
            $pivot = $pivots.find('li[data-value="' + dValue + '"]');
        if ($pivot
            && $pivot.attr('data-key') == dKey
            && (!extra || $pivot.attr('data-country') == extra['country'])) {
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
        $pivots.append(genPivot(dKey, dValue, value, extra));
        if ($pivots.find('li').length > 0) {
            this.show();
        }
    },
    /**
     * param pivot为要移除的pivot对应的jquery对象
     *       data:{dKey->data-key，dValue->data-value,value->text,country->data-country}
     * 两个参数只传一个即可
     */
    remove: function (data, pivot) {
        //console.log('Pivot.remove() ======');
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
    getFilterByPivots: function () {
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
    },
    getFilterByPivots2: function () {
        //console.log("Pivot.getUserSelected() ======");
        var filter = {};
        $(this._PIVOTS_UL_SEL).find('li').each(function (idx, pivot) {
            var $pivot = $(pivot),
                key = $pivot.attr('data-key'),
                value = $pivot.attr('data-value'),
                country = $pivot.attr('data-country');
            //console.log(country);
            if (filter[key]) {
                filter[key].push(value);
            } else {
                filter[key] = [value];
            }
            if (key == 'city' && country) {
                if (filter['country']) {
                    filter['country'].push(country);
                } else {
                    filter['country'] = [country];
                }
            }
        });
        return filter;
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
    set: function (data) {
        var currpage = data['currpage'],
            count = data['total'],
            pagesize = data['pagesize'],
            duration = data['took'];
        var overview = $(this._WRAPPER_SEL);
        overview.find('strong.count').text(count);
        overview.find('strong.duration').text(duration);
        overview.find('strong.page-num').text(currpage + ' / ' + (Math.floor(count / pagesize) + 1));
    }
};

var SearchTip = {
    _WRAPPER_SEL: (function () {
        return '#search_tips'
    }()),

    show: function () {
        //console.log('SearchTip.show()');
        $(this._WRAPPER_SEL).show(Constant.HIDE_SHOW_SPEED);
    },
    hide: function () {
        //console.log('SearchTip.hide()');
        $(this._WRAPPER_SEL).hide(Constant.HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        //console.log('SearchTip.isHidden()');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    render: function (data) {
        //console.log("SearchTip.render()");
    },
    listen: function () {
        $('#search_tips li').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });
        $('.search-item').on('click', function (e) {
            e.preventDefault();
            var $this = $(this), wd = $this.attr('data-search-keyword');
            console.log(this);
            var successCallback;
            $this.closest('li').addClass('active');
            if ($('#listSe').hasClass('active')) {
                successCallback = List.onSearchSucceed;
            } else if ($('#mapSe').hasClass('active')) {
                successCallback = ArcMap.onSearchSucceed;
            }
            var requestObj = {
                'url': Constant.LIST_SEARCH_2_URL,
                'data': {
                    'wd': wd,
                    'page': 1
                },
                'success': successCallback
            };
            UserSearchHistory.addItem(wd);
            GlobalSearch.setValue(wd);
            HomeSearch.setValue(wd);
            LoadData.post(requestObj);
            if (currentPage == 1) {
                $.fn.fullpage.silentMoveTo(2);
            }
        });
    },
    onClick: function (element) {
        var $this = $(element), wd = $this.attr('data-search-keyword');
        var successCallback;
        if (currentPage == 2) {
            successCallback = List.onSearchSucceed;
        } else if (currentPage == 3) {
            successCallback = ArcMap.onSearchSucceed;
        } else if (currentPage == 1) {
            successCallback = function (data) {
                $.fn.fullpage.silentMoveTo('se2');
                List.onSearchSucceed(data);
            }
        }
        var requestObj = {
            'url': Constant.LIST_SEARCH_2_URL,
            'data': {
                'wd': wd,
                'page': 1
            },
            'success': successCallback
        };
        Pivot.init();
        UserSearchHistory.addItem(wd);
        GlobalSearch.setValue(wd);
        HomeSearch.setValue(wd);
        LoadData.post(requestObj);
    },
    init: function () {
        //生成最初的dom节点
        var popSearchList = $('.popular-search-list'), hisSearchList = $('.search-history-list');
        // (1)生成热门搜索
        $.getJSON(Constant.HOT_TERMS_URL, {}, function (data) {
            for (var key in data['wd']) {
                var popularLi = $('<li></li>');
                var span = $('<span class="search-item">' + key + '</span>').attr({
                    'data-search-keyword': key,
                    'title': key
                }).appendTo(popularLi);
                popularLi.hover(function () {
                    $(this).addClass('hover');
                }, function () {
                    $(this).removeClass('hover');
                });
                span.on('click', function (e) {
                    e.preventDefault();
                    SearchTip.onClick(this);
                });
                popSearchList.append(popularLi);
            }
        });
        //(2)监听系统推荐事件
        $('.sys-rec').find('li').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        }).find('span').on('click', function (e) {
            e.preventDefault();
            SearchTip.onClick(this);
        });
    }
};