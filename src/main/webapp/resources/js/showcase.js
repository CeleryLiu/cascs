/**
 * @author lyp
 * @date 2016-04-05
 * @module name showcase
 * @description
 */
var globalVar = {
    imgNavAnimInterval: -1,
    imgRefreshInterval: -1
};
$(function () {
    //图表初始化
    var genCharts = function () {
        var dataMapping = {
            'country': '按国家统计',
            'brand': '按品牌统计',
            'type': '按类型统计',
            'service': '按服务统计',
            'port': '按端口统计'
        };
        //生成所有扫描数据的统计图（柱状图）
        var genTotalScanChart = function (data, textStatus, jqXHR) {
        };
        //$.post('analysis/getNMonthSummary/2', {}, genTotalScanChart);
        $('#scrollcombidy2d').insertFusionCharts({
            'type': 'scrollcombidy2d',
            'width': '100%',
            'height': '100%',
            'dataFormat': 'json',
            'dataSource': {
                'chart': {
                    'caption': '设备扫描分类统计',
                    'captionFontSize': '32',
                    'xAxisname': '日期',
                    'yAxisName': '设备数量',
                    'plotFillAlpha': '60',
                    'paletteColors': '#8e0000,#0075c2,#f2c500,#1aaf5d,#f45b00',
                    //#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000
                    'baseFontColor': '#ffffff',
                    'baseFont': 'Helvetica Neue,Arial',
                    'baseFontSize': '14',
                    'showBorder': '0',
                    'bgColor': '#333333',
                    "bgAlpha": "100",
                    'showShadow': '0',
                    'canvasBgColor': '#333333',
                    'canvasBorderAlpha': '0',
                    'divlineAlpha': '100',
                    'divlineColor': '#999999',
                    'divlineThickness': '1',
                    'divLineIsDashed': '1',
                    'divLineDashLen': '1',
                    'divLineGapLen': '1',
                    'usePlotGradientColor': '0',
                    'showplotborder': '0',
                    'valueFontColor': '#ffffff',
                    'placeValuesInside': '1',
                    'showHoverEffect': '1',
                    'rotateValues': '0',
                    'showXAxisLine': '1',
                    'xAxisLineThickness': '1',
                    'xAxisLineColor': '#999999',
                    'showAlternateHGridColor': '0',
                    'legendBgAlpha': '0',
                    'legendBorderAlpha': '0',
                    'legendShadow': '0',
                    'legendItemFontSize': '14',
                    'legendPosition': 'right',
                    //'legendItemFontColor': '#666666',
                    "showValues": "1",
                    "numVisiblePlot": "9",
                    "formatNumberScale": '0',
                    "flatScrollBars": "1",
                    "toolTipBorderColor": "#545454",
                    "toolTipBgColor": "#545454",
                    "toolTipBgAlpha": "80",
                    "scrollheight": "8"
                },
                'categories': [
                    {
                        'category': [
                            {
                                'label': '2015-12-25'
                            },
                            {
                                'label': '2016-01-17'
                            },
                            {
                                'label': '2016-02-15'
                            },
                            {
                                'label': '2016-04-13'
                            }
                        ]
                    }
                ],
                'dataset': [
                    {
                        'seriesname': '监控设备',
                        'data': [
                            {
                                'value': '1373451'
                            },
                            {
                                'value': '1588579'
                            },
                            {
                                'value': '1773435'
                            },
                            {
                                'value': '2343451'
                            }
                        ]
                    },
                    {
                        'seriesname': '办公设备',
                        'data': [
                            {
                                'value': '846463'
                            },
                            {
                                'value': '964839'
                            },
                            {
                                'value': '978202'
                            },
                            {
                                'value': '1080221'
                            }
                        ]
                    },
                    {
                        'seriesname': '工控设备',
                        'data': [
                            {
                                'value': '121008'
                            },
                            {
                                'value': '129309'
                            },
                            {
                                'value': '131028'
                            },
                            {
                                'value': '142821'
                            }
                        ]
                    }
                ]
            }
        });
        //2) 生成最近一次扫描的设备统计图（地图和饼状图）
        var genLatestCharts = function (data, textStatus, jqXHR) {
            //console.log(data);
            var obj = data.data;
            var basicPieOption = {
                'type': 'pie3d',
                'width': '48%',
                'height': '48%',
                'dataFormat': 'json',
                'dataSource': {
                    'chart': {
                        'caption': '最近一次设备扫描结果',
                        'bgColor': '#333333',
                        'baseFontColor': '#ffffff',
                        'chartTopMargin': "80",
                        'use3DLighting': '0',
                        'showShadow': '1',
                        'enableSmartLabels': '1',
                        'startingAngle': '0',
                        'showPercentValues': '0',
                        'showPercentInTooltip': '1',
                        'decimals': '1',
                        'captionFontSize': '32',
                        'toolTipColor': '#ffffff',
                        'toolTipBorderThickness': '0',
                        'toolTipBgColor': '#000000',
                        'toolTipBgAlpha': '80',
                        'toolTipBorderRadius': '2',
                        'toolTipPadding': '5',
                        //"plottooltext": "$label, $value, $percentValue",
                        'showHoverEffect': '1',
                        'formatNumberScale': '0',
                        'showLegend': '0',
                        'legendBgColor': '#ffffff',
                        'legendBorderAlpha': '0',
                        'legendShadow': '0',
                        'legendItemFontSize': '10',
                        'legendItemFontColor': '#666666',
                        'useDataPlotColorForLabels': '1',
                        'enableMultiSlicing': 1,
                        'labelDistance': "20"
                    },
                    'data': []
                }
            };
            var basicMapOption = {
                type: 'maps/worldwithcountries',
                width: '100%',
                height: '100%',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "caption": "最近一次设备扫描结果",
                        'captionFontSize': '32',
                        'captionFontColor': '#ffffff',
                        "theme": "fint",
                        "bgColor": "#333333",
                        "bgAlpha": "100",
                        'baseFontColor': '#ff0000',
                        "formatNumberScale": "0",
                        "nullEntityColor": "#f0ffff",
                        "nullEntityAlpha": "100",
                        "hoverOnNull": "0",
                        "showLabels": "0",
                        "legendPosition": "right"
                    },
                    "colorrange": {
                        "minvalue": "0",
                        //"startlabel": "Low",
                        //"endlabel": "High",
                        "code": "#f0ffff",
                        "gradient": "1",
                        "color": [{
                            "maxvalue": "10000",
                            "code": "#96cfff"
                        }, {
                            "maxvalue": "100000",
                            "code": "#8dc8ff"
                        }, {
                            "maxvalue": "1000000",
                            "code": "#369dff"
                        }, {
                            "maxvalue": "2000000",
                            "code": "#1e90ff"
                        }]
                    },
                    "data": []
                }
            };
            var $pies = $('#pie3Ds'), $map = $('#map'), mapChart;
            for (var key in obj) {
                if (key == 'country') {
                    var countryList = obj['country']['data'];
                    var mapOpt = $.extend(true, {}, basicMapOption);
                    var maxvalue = obj['country']['max'];
                    var minvalue = obj['country']['min'];
                    mapOpt.dataSource.chart.caption = dataMapping[key];
                    mapOpt.dataSource.data = countryList;
                    mapOpt.dataSource.colorrange.color[basicMapOption.dataSource.colorrange.color.length - 1].maxvalue = maxvalue;
                    mapOpt.dataSource.colorrange.minvalue = minvalue;
                    mapChart = $map.insertFusionCharts(mapOpt);
                    var $top10 = $('#top10').find('tbody').empty();
                    var chinaIdx = obj['country']['chinaIdx'];
                    for (var i = 0; i < 10 && i < countryList.length; i++) {
                        var tr = $('<tr data-id="' + countryList[i].id + '"></tr>').appendTo($top10);
                        tr.append('<td>' + (i + 1) + '</td>')
                            .append('<td><img src="resources/img/flags/' + countryList[i].id + '.png">' + countryList[i].displayValue + '</td>')
                            .append('<td>' + countryList[i].value + '</td>');
                        if (i == chinaIdx) {
                            tr.addClass('china');
                        }
                    }
                    if (chinaIdx >= 10) {
                        $top10.append('<tr><td>11</td><td>中国</td><td>' + countryList[chinaIdx].value + '</td></tr>');
                    }

                } else {
                    var opt = $.extend(true, {}, basicPieOption);//$.extend(true,{}, json);//深克隆
                    opt.dataSource.chart.caption = dataMapping[key];
                    opt.dataSource.data = obj[key]['data'];
                    $pies.appendFusionCharts(opt);
                }
            }
        };
        $.ajax({
            url: 'statistic/getLatestData',
            type: 'post',
            data: {
                size: 1
            },
            contentType: "application/json",
            dataType: "json",
            //timeout: 10000,
            success: genLatestCharts
        });
    };
    //照片墙初始化
    var initImages = function (data) {
        var $imgNav = $('.img-nav'), imgContainer = $('.img-container');
        var count = 2; //让左右两边各留出1个li的空白
        globalVar.images = data;
        for (var k in data) {
            //generate nav
            $imgNav.prepend($('<li class="img-nav-item">' + k + '</li>'));
            count++;
        }
        var imgCaty = $imgNav.find('li:first-child').addClass('current').text();
        showImages(data, imgCaty);
        $imgNav.find('li')
            .css('width', (100 / count) + '%')
            .hover(function () {
                imgNavAnimate.stop();
                if ($(this).hasClass('active') || $(this).hasClass('current'))return;
                if (!realTimeImage.isHidden())return;
                $('.img-nav li.active').removeClass('active');
                $('.img-nav li.current').removeClass('current');
                $(this).addClass('current');
                showImages(globalVar.images, $(this).text());
            }, function () {
                if (!$(this).siblings('.active')) {
                    imgNavAnimate.start($(this).index());
                }
            })
            .on('click', function (e) {
                imgNavAnimate.stop();
                if ($(this).hasClass('active'))return;
                $('.img-nav li.active').removeClass('active');
                $('.img-nav li.current').removeClass('current');
                $(this).addClass('active');
                showImages(globalVar.images, $(this).text());
            })
            .fontFlex(14, 20, 65);//字体自适应

        imgContainer.find('img').on('click', function (e) {
            e.preventDefault();
            imgNavAnimate.stop();
            console.log(globalVar.imgNavAnimInterval);
            var src = $(this).attr('src');
            var location = this.getBoundingClientRect();//返回对象的大小及其相对于视口的位置
            realTimeImage.show(src, location);
        });
    };
    //照片墙-自动切换图片
    var imgNavAnimate = {
        start: function (idx) {
            //找到当前显示的图片对应的导航
            var ii = idx ? idx : 0;//当前导航项
            var t = $('.img-nav li').length;   //导航项个数
            globalVar.imgNavAnimInterval = setInterval(function () {
                if (t == 0) t = $('.img-nav li').length;
                $('.img-nav li.current').removeClass('current');
                var curLi = $('.img-nav li').eq(ii > t - 1 ? ii = 0 : ii++).addClass('current');
                showImages(globalVar.images, curLi.text());
            }, 8000);
        }, stop: function () {
            clearInterval(globalVar.imgNavAnimInterval);
        }
    };
    //显示指定导航对应的图片，imgCategory是图片分类也是导航的text
    var showImages = function (images, imgCategory) {
        var baseSrc = 'resources/img/showcase/monitor/' + imgCategory + '/';
        if (images && images[imgCategory]) {
            var $imgs = $('.img-container img');
            $imgs.each(function (idx, item) {
                $(this).attr('src', baseSrc + images[imgCategory][idx]);
            });
        }
    };
    var realTimeImage = {
        _wrapper_sel: '.real-time-img-wrapper',
        interval: 0,
        isHidden: function () {
            //参考http://www.oschina.net/code/snippet_933023_24100
            var flag = false;
            var rect = document.getElementsByClassName('real-time-img-wrapper')[0].getBoundingClientRect();
            if (rect.bottom - rect.top == 0) {
                flag = true;
            }
            return flag;
        },
        show: function (src, location) {
            imgNavAnimate.stop();
            clearInterval(globalVar.imgRefreshInterval);
            var ip = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.jpg'));
            var $wrapper = $(this._wrapper_sel), wrapperH = $wrapper.height(), wrapperW = $wrapper.width();
            //将当前图片到到实时图片框
            $wrapper.find('img').attr({
                'src': src,
                'data-ip': ip
            });
            //显示实时图片框
            if (realTimeImage.isHidden()) {
                $wrapper.show().css({
                    left: location.left + location.width / 2 - wrapperW / 2,
                    top: location.top + location.height / 2 - wrapperH / 2
                }).addClass('scaleAndCenter');
            }
            //设置ip
            $wrapper.find('.ip').text(ip.replace('_9989', ''));
            //播放按钮改为暂停并监听
            $wrapper.find('.playContainer').addClass('playing');
            //获取设备信息
            $wrapper.find('textarea').text("\n开始执行漏洞攻击......");
            //实时刷新图片
            this.refresh();
        }, hide: function () {
            //$(this._wrapper_sel).hide('slow');
            clearInterval(globalVar.imgRefreshInterval);
            $(realTimeImage._wrapper_sel).hide('slow');
        }, refresh: function () {
            clearInterval(globalVar.imgRefreshInterval);
            var wrapper = $(realTimeImage._wrapper_sel);
            globalVar.imgRefreshInterval = setInterval(function () {
                var img = wrapper.find('img');
                var ip = img.attr('data-ip');
                var url = 'http://' + img.attr('data-ip') + '/onvif/snapshot?' + Math.random() * 100;
                if (ip.indexOf('_9989') >= 0) {
                    url = 'http://' + ip.replace('_', ':') + '/?' + Math.random() * 100;
                }
                img.attr('src', url);
            }, 2000);
        }
    };

    //全屏滚动设置
    var sysImg = $('#sysImg');
    $('#pagewrapper').fullpage({
        resize: true,
        anchors: ['system', 'barchart', 'mapchart', 'piechart', 'picture', 'achievement'],
        navigation: false,
        navigationPosition: 'right',
        //navigationTooltips: ['系统', '扫描', '图表', '视频', '成就'],
        scrollOverflow: true,
        animateAnchor: false,
        //autoScrolling: false,
        recordHistory: true,
        verticalCentered: false,
        //normalScrollElements:'#page2',
        onLeave: function (index, nextIndex, direction) {
            switch (index) {
                case  1:
                    //sysImg.removeClass('rotate');
                    break;
                case 2:
                    //$('#scrollcombidy2d').removeClass('appear').removeClass('appear-animated');
                    break;
                case 3:
                    //$('#map').removeClass('appear').removeClass('appear-animated');
                    break;
                case 4:
                    //$('#pie3Ds').removeClass('appear').removeClass('appear-animated');
                    break;
                case 5:
                    imgNavAnimate.stop();
                    clearInterval(globalVar.imgRefreshInterval);
                    //$('.img-container img').removeClass('scale');
                    //$('#page4 .inner').addClass('transparent');
                    break;
                default :
                    break;
            }
        },
        afterLoad: function (anchorLink, index) {
            switch (index) {
                case  1:
                    //sysImg.addClass('rotate');
                    break;
                case 2:
                    //$('#scrollcombidy2d').addClass('appear').addClass('appear-animated');
                    break;
                case 3:
                    //$('#map').addClass('appear').addClass('appear-animated');
                    break;
                case 4:
                    //$('#pie3Ds').addClass('appear').addClass('appear-animated');
                    break;
                case 5:
                    //$('#page4 .inner').removeClass('transparent');
                    //var imgs = $('.img-container img').addClass('scale');
                    var imgs = $('.img-container img');
                    setTimeout(function () {
                        imgs.addClass('border');
                    }, 1000);
                    imgNavAnimate.start(0);
                    break;
                case 6:
                    //$('.section-inner').addClass('appear').addClass('appear-animated');
                    $('#page5 .section-inner').show();
                    $('#dg-container').gallery({
                        autoplay: true
                    });
                    break;
                default :
                    break;
            }
        },
        afterRender: function () {
            genCharts();
            $.ajax({
                url: 'showcase/getImageNames',
                type: 'get',
                contentType: "application/json",
                dataType: "json",
                success: initImages
            });
            $.fn.fullpage.reBuild();
        },
        afterResize: function () {
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
        }
    });

    //启动监听器
    //点击除实时图片/已列出的图片之外的地方, 隐藏实时图片
    $('#page4').on('click', function (e) {
        if ($(e.target).parents(".real-time-img-wrapper").length == 0 && $(e.target).parents('.img-container').length == 0) {
            realTimeImage.hide();
        }
    });
    $('.playContainer').on('click', function () {
        if ($(this).hasClass('playing')) {
            clearInterval(globalVar.imgRefreshInterval);
        } else {
            realTimeImage.refresh();
        }
        $(this).toggleClass('playing');
    });
    var text = $('.attack-text textarea');
    $(realTimeImage._wrapper_sel).find('img').error(function (data, status, error) {
        clearInterval(globalVar.imgRefreshInterval);
        text.append('\n!!!获取视频画面失败，该漏洞已修复!!!').scrollTop(text[0].scrollHeight);
    }).load(function (data) {
        if (text[0].scrollHeight > 1000) {
            text.text('\n......\n......');
        }
        text.append('\n\n正在获取视频画面......' + (new Date()).pattern("yyyy-MM-dd hh:mm:ss"))
            .scrollTop(text[0].scrollHeight)
            //.append('\n获取成功...' + (new Date()).pattern("yyyy-MM-dd hh:mm:ss"))
            .scrollTop(text[0].scrollHeight);
    });
});

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};