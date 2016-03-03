/*
 * Created by lyp on 2016/2/26.
 * Author: lyp
 * Date: 2016/2/26
 * Description:搜索列表模块
 * Version: V1.0 
 */
var PAGE_SIZE = 10, //每一页的条目数
    VISIBLE_PAGES = 7; //页码个数

var List = {
    _WRAPPER_SEL: (function () {
        return '.list-wrapper';
    }()),
    _RESULT_LIST_SEL: (function () {
        return '.result-container ul.devices';
    }()),
    tag: 'list',
    listPageNum: 1,
    render: function (data) {
        //console.log("List.render() ======");
        /*
         * @param totalCounts：分页的总条目数
         * @param pageSize：每一页的条目数
         * @param currentPage：当前页码
         * @param visiblePages: 最多显示的页码数，默认值7
         */
        var paginator = function (totalCounts, pageSize, currentPageNum, visiblePages) {
            if (!visiblePages) {
                visiblePages = VISIBLE_PAGES;
            }
            if (!pageSize) {
                pageSize = PAGE_SIZE;
            }
            if (!totalCounts) {
                totalCounts = 0;
            }
            var $pagerWrapper = $('#pager').show();
            $pagerWrapper.jqPaginator({
                totalCounts: totalCounts,
                pageSize: pageSize,
                visiblePages: visiblePages,
                currentPage: currentPageNum,
                first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:void(0);"><i class="glyphicon glyphicon-triangle-left"></i>上一页</a></li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页<i class="glyphicon glyphicon-triangle-right"></i></a></li>',
                last: '<li class="last"><a href="javascript:void(0);">末页<\/a></li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
                //设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数
                onPageChange: function (num, type) { //num: 目标页；type:“init”（初始化），“change”（点击分页）
                    if (type == 'change') {
                        List.search(num);
                    }
                }
            })
        };
        var genDeviceLi = function (d) {
            var li = $(' <li class="device"></li>');
            //ip
            var ip = $('<a href="http://' + d.ip + '" target="_blank">' + d.ip + '</a>').appendTo($('<h3></h3>')).appendTo(li);
            ip.on('click', function (e) {
                e.preventDefault();
                console.log("ip is clicked!");
            });
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
                '<span class="glyphicon glyphicon-map-marker"></span> ' + loc + ' </a></span>').appendTo($location);
            }
            //time
            /* var time = d.timestamp;
             if (time && time != '') {
             var $time = $('<div class="tag time"></div>').appendTo(facets);
             $('<span class="label label-primary"><a href="#' + time + '">' +
             '<span class="glyphicon glyphicon-time"></span> ' + time + ' </a></span>').appendTo($time);
             }*/

            facets.find('a').on('click', function (e) {
                e.preventDefault();
                console.log("=====================", this.href);
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
            var closeBtn = $('<button class="up"><span class="glyphicon glyphicon-menu-down"></span></button>').appendTo(info);
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

        //(1)更新查询时间、查询到数据的条数、结果列表、分页
        ResultOverview.set(total, took, currpage, (Math.floor(total / pagesize) + 1));
        //(2)添加结果列表
        for (var i = 0; i < devices.length; i++) {
            $resultList.append(genDeviceLi(devices[i]));
        }
        //(3)初始化分页插件
        paginator(total, pagesize, currpage, VISIBLE_PAGES);
    },
    search: function (pageNum) {
        //console.log("List.search() ======");
        var wd = $(GlobalSearch._INPUT_SEL).val();
        if (wd && wd != '') {
            var successCallback = function (data) {
                var statuscode = data['statuscode'];
                //（1）将data添加到sessionStorage.data
                Session.set('data', data);
                if (statuscode == 200) {
                    console.log('List search succeed. statuscode == 200', data);
                    //(2.a)调用Sidebar的render方法，生成sidebar
                    Sidebar.render(data);
                    //(2.b)调用List的render方法，生成搜索结果页面
                    List.render(data);
                    //(3)隐藏no-data div
                    $('.no-data').hide();
                } else if (statuscode == 204) {
                    noDataHandler();
                } else {
                    errorHandler();
                }
            };
            var requestObj = {
                'url': Constant.LIST_SEARCH_URL,
                'success': successCallback,
                'error': errorHandler,
                'data': {
                    'wd': wd + ' ' + Pivot.getUserSelected(),
                    'page': pageNum ? pageNum : 1
                }
            };
            LoadData.post(requestObj);
        }
    },
    showNoData: function () {
        //console.log("List.showNoData()");
        $('.empty-result-desc-container').show();
        this.wrapper.hide();
    },
    hideNoData: function () {
        //console.log("FUNCTION CALL: List.hideNoData");
        $('.empty-result-desc-container').hide();
        this.wrapper.show();
    },
    show: function (data) {
        //console.log("FUNCTION CALL: List.show");
        MySessionStorage.set('currentPage', this.tag);
        $('header').css('visibility', ' visible').show();
        if (data && data['statuscode'] == 200) {
            this.render(data);
            this.wrapper.show();
            Sidebar.show(data['aggregation']);
        } else if ($('#global_search_input').val() != '') {
            this.search(this.listPageNum);
        } else {
            $.fn.fullpage.silentMoveTo('se1');
        }
        this.wrapper.show();
    },
    hide: function () {
        //console.log("FUNCTION CALL: List.hide");
        this.wrapper.hide();
    }
};

