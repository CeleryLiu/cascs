/*
 * Created by lyp on 2016/2/26.
 * Author: lyp
 * Date: 2016/2/26
 * Description:搜索列表模块
 * Version: V1.0 
 */
var List = {
    _WRAPPER_SEL: (function () {
        return '.list-wrapper';
    }()),
    _RESULT_LIST_SEL: (function () {
        return '.result-container ul.devices';
    }()),
    listPageNum: 1,
    render: function (data) {
        //console.log("List.render() ======", data);
        /*
         * @param totalCounts：分页的总条目数
         * @param pageSize：每一页的条目数
         * @param currentPage：当前页码
         * @param visiblePages: 最多显示的页码数，默认值7
         */
        var genDeviceLi = function (d) {
            var li = $(' <li class="device"></li>');
            //ip
            var ip = $('<a href="http://' + d.ip + '" target="_blank">' + d.ip + '</a>');
            /*ip.on('click', function (e) {
             e.preventDefault();
             console.log("ip is clicked!");
             });*/
            $('<h3></h3>').append(ip).appendTo(li);
            //详细内容
            var row = $('<div class="row"></div>').appendTo(li);
            //tag
            var facets = $(' <div class="col-md-3 col-sm-4 left"></div>').appendTo(row);
            if (d.hasOwnProperty('tags') && d.tags != '' && d.tags.length > 0) {
                var $tags = $('<div class="tag"></div>').appendTo(facets);
                d.tags.forEach(function (tag) {
                    $('<span class="label label-default"><a href="#' + tag + '"> ' + tag + ' </a></span>').appendTo($tags);
                });
            }
            //location
            var loc = d.location;
            if (loc && loc != '') {
                var $location = $('<div class="tag location"></div>').appendTo(facets);
                $('<span class="label label-danger"><a href="#' + loc + '">' +
                '<span class="fa fa-map-marker"></span> ' + loc + ' </a></span>').appendTo($location);
            }
            //time
            /* var time = d.timestamp;
             if (time && time != '') {
             var $time = $('<div class="tag time"></div>').appendTo(facets);
             $('<span class="label label-primary"><a href="#' + time + '">' +
             '<span class="fa fa-times"></span> ' + time + ' </a></span>').appendTo($time);
             }*/

            facets.find('a').on('click', function (e) {
                e.preventDefault();
                //console.log("=====================", this.href);
            });
            //ports
            var info = $('<div class="col-md-8 col-sm-7 right"></div>').appendTo(row);
            var ports = d['ports'], vuls = d['vuls'];
            if (ports.length > 0 || vuls.length > 0) {
                for (var i = 0; i < ports.length; i++) {
                    if (ports[i] == '' || ports[i] == null)continue;
                    for (var pKey in ports[i]) {
                        var url = pKey.split(':')[0] + '://' + d.ip + ':' + pKey.split(':')[1];
                        var $port = $('<article><h3><a href="' + url + '" target="_blank"">' + pKey + '</a></article>').appendTo(info);
                        var banner = ports[i][pKey];
                        if (banner != 'null') {
                            banner = banner.replace(/</g, "&lt;");
                        }
                        var $pre = $('<pre>' + banner + '</pre>').appendTo($port);
                        $pre.on('click', function () {
                            if (!info.hasClass('active')) {
                                $(this).closest('div.right').addClass('active');
                            }
                        });
                    }
                }
                //vuls
                for (var j = 0; j < vuls.length; j++) {
                    if (!vuls[j] || vuls[j] == '')continue;
                    $('<hr>').appendTo(info);
                    for (var vKey in vuls[j]) {
                        var $vul = $('<article><h3><a href="#">' + vKey + '</a></article>').appendTo(info);
                        $('<pre>' + JSON.stringify(vuls[j][vKey]['desc']) + '</pre>').appendTo($vul);
                    }
                }
            } else {
                info.html("null");
            }
            var closeBtn = $('<button class="up"><span class="fa fa-caret-down"></span></button>').appendTo(info);
            closeBtn.on('click', function () {
                $(this).closest('div.right').toggleClass('active');
            });
            return li;
        };
        var currpage = data['currpage'],
            total = data['total'],
            pagesize = data['pagesize'],
            took = data['took'],
            devices = data['data'];
        var $resultList = $(this._RESULT_LIST_SEL).html('');
        $(this._WRAPPER_SEL).show();
        // (1)更新查询时间、查询到数据的条数、结果列表、分页
        ResultOverview.set(data);
        // (2)添加结果列表
        for (var i = 0; i < devices.length; i++) {
            $resultList.append(genDeviceLi(devices[i]));
        }
        // (3)初始化分页插件
        paginator(total, pagesize, currpage, Constant.VISIBLE_PAGES, List.search);
        // (4)返回顶部（貌似不起作用了，需要排查）
        $(this._WRAPPER_SEL).scrollTop(0);
        $('#listSe').scrollTop(0);
    },
    search: function (pageNum) {
        console.log("List.search() ======");
        var wd = GlobalSearch.getValue();
        if (!wd && wd == '') return;
        var successCallback = this.onSearchSucceed;
        var requestObj = {
            /* 'url': Constant.LIST_SEARCH_URL,
             //'success': successCallback,
             'error': errorHandler,
             'data': {
             'wd': wd + ' ' + Pivot.getFilterByPivots(),
             'page': pageNum ? pageNum : 1
             }*/
            //2↓
            'url': Constant.LIST_SEARCH_2_URL,
            'data': {
                'wd': wd,
                'filter': Pivot.getFilterByPivots2(),
                'page': 1
            },
            'success': successCallback,
            'error': errorHandler
        };
        LoadData.post(requestObj);
    },
    onSearchSucceed: function (data) {
        var statuscode = data['statuscode'];
        //(1)记录sessionStorage
        Session.set('data', data);
        //(2)设置result overview
        ResultOverview.set(data);
        if (statuscode == 200) {
            //console.log('List search succeed. statuscode == 200', data);
            //(2)调用Sidebar的render方法，生成sidebar
            Sidebar.render(data);
            //(4)调用List的render方法，生成搜索结果页面
            List.render(data);
            //(5)滚动到顶部
            $(List._WRAPPER_SEL).animate({scrollTop: 0}, 'slow');
            //(6)隐藏no-data div
            $('.no-data').hide();
        } else if (statuscode == 204) {
            console.log('list no data');
            noDataHandler(data);
        } else {
            console.log('list error');
            errorHandler();
        }
    },
    onLoad: function () {
        $(Sidebar._WRAPPER_SEL).addClass('list');
        var data = Session.get('data'), wd = Session.get('wd');
        if (data && wd) {
            GlobalSearch.setValue(wd);
            HomeSearch.setValue(wd);
            this.onSearchSucceed(data);
        }
    }
};

